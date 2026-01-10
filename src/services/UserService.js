import { prisma } from '../lib/prismaClient.js';
import { formatUserData } from '../formatters/formatUserData.js';
import { formatUserUpdateData } from '../formatters/formatUserData.js';
import { userSchema } from '../schemas/user-schema.js';
import { userUpdateSchema } from '../schemas/user-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import cloudinary from '../lib/cloudinary.js';

class UserService {
  async read(role) {
    if (role !== 'owner' && role !== 'manager')
      throw ApiError.unauthorized('Você não tem autorização para fazer isso!.');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role_id: true,
        created_at: true,
        updated_at: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!users) {
      throw ApiError.notFound('Usuário não encontrado.');
    }
    return users;
  }
  async create(data, role) {
    try {
      if (role !== 'owner' && role !== 'manager')
        throw ApiError.unauthorized('Você não tem autorização para fazer isso!.');

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
      if (role !== 'owner' && role !== 'manager')
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

      // Se password foi fornecido, hash
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
  async delete(id, role, currentUserId) {
    try {
      if (!['owner', 'manager'].includes(role)) {
        throw ApiError.unauthorized('Você não tem autorização para deletar usuários.');
      }

      const userId = Number(id);
      if (Number.isNaN(userId) || userId <= 0) {
        throw ApiError.badRequest('ID do usuário inválido.');
      }

      const userExisting = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          role: true,
          images: {
            select: {
              id: true,
              public_id: true,
            },
          },
        },
      });

      if (!userExisting) {
        throw ApiError.notFound('Usuário não encontrado.');
      }

      if (currentUserId && userExisting.id === Number(currentUserId)) {
        throw ApiError.unauthorized('Você não pode excluir seu próprio usuário.');
      }

      if (userExisting.role && userExisting.role.name === 'owner' && role !== 'owner') {
        throw ApiError.unauthorized('Você não tem autorização para deletar esse usuário.');
      }

      // Deleta as imagens do Cloudinary antes de deletar o usuário
      if (userExisting.images && userExisting.images.length > 0) {
        const deletePromises = userExisting.images.map(image =>
          cloudinary.uploader.destroy(image.public_id).catch(error => {
            // Log do erro mas não impede a deleção do usuário
            console.error(
              `Erro ao deletar imagem do Cloudinary (public_id: ${image.public_id}):`,
              error
            );
          })
        );

        await Promise.all(deletePromises);
      }

      await prisma.user.delete({
        where: { id: userId },
      });

      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw ApiError.internal('Erro interno ao deletar usuário.');
    }
  }
}

export default new UserService();
