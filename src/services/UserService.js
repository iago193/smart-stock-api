import { prisma } from '../lib/prismaClient.js';
import { formatUserData } from '../formatters/formatUserData.js';
import { formatUserUpdateData } from '../formatters/formatUserData.js';
import { userSchema } from '../schemas/user-schema.js';
import { userUpdateSchema } from '../schemas/user-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';

class UserService {
  async read(id) {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw ApiError.notFound('Usuário não encontrado.');
    }
    return user;
  }
  async create(data) {
    try {
      const formatted = formatUserData(data);
      const validated = userSchema.parse(formatted);

      const password_hash = await bcrypt.hash(validated.password, 10);

      const userCreate = await prisma.user.create({
        data: {
          first_name: validated.first_name,
          last_name: validated.last_name,
          email: validated.email,
          role_id: validated.role_id,
          password_hash,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          role_id: true,
          created_at: true,
          updated_at: true,
        },
      });
      return userCreate;
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados do usuário.', error.errors);
      }

      throw ApiError.internal('Erro interno ao criar usuário.');
    }
  }
  async update(data, id, role) {
    try {
      if (role !== 'admin')
        throw ApiError.unauthorized('Você não tem autorização para fazer isso!.');

      const userExisting = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!userExisting) throw ApiError.notFound('Usuário não encontrado.');

      const formatted = formatUserUpdateData(data);
      const validated = userUpdateSchema.parse(formatted);

      // Prepara os dados para atualização (apenas os campos fornecidos)
      const updateData = {};

      if (validated.first_name !== undefined) {
        updateData.first_name = validated.first_name;
      }

      if (validated.last_name !== undefined) {
        updateData.last_name = validated.last_name;
      }

      if (validated.email !== undefined) {
        updateData.email = validated.email;
      }

      if (validated.role_id !== undefined) {
        updateData.role_id = validated.role_id;
      }

      // Se password foi fornecido, hash ele
      if (validated.password !== undefined) {
        updateData.password_hash = await bcrypt.hash(validated.password, 10);
      }

      const userUpdated = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          role_id: true,
          created_at: true,
          updated_at: true,
        },
      });
      return userUpdated;
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados do usuário.', error.errors);
      }

      throw ApiError.internal('Erro interno ao atualizar usuário.');
    }
  }
  async delete(id, role) {
    try {
      if (role !== 'admin') {
        throw ApiError.unauthorized('Você não tem autorização para deletar usuários.');
      }

      const userExisting = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!userExisting) {
        throw ApiError.notFound('Usuário não encontrado.');
      }

      await prisma.user.delete({
        where: { id: Number(id) },
      });

      return {
        message: 'Usuário deletado com sucesso.',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao deletar usuário.');
    }
  }
}

export default new UserService();
