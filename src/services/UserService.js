import { prisma } from '../lib/prismaClient.js';
import { formatUserData } from '../formatters/formatUserData.js';
import { userSchema } from '../schemas/user-schema.js';
import ApiError from '../error/ApiError.js';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';

class User {
  read() {
    console.log('estamos aqui product read');
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
          password_hash,
        },
      });
      return userCreate;
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados do usuário.', error.errors);
      }

      throw ApiError.internal('Erro interno ao criar usuário.', error);
    }
  }
  update() {
    console.log('estamos aqui product update');
  }
  delete() {
    console.log('estamos aqui product delete');
  }
}

export default new User();
