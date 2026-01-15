import { prisma } from '../config/prismaClient.js';
import { categorySchema } from '../schemas/category-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';

class CategoryService {
  async index() {
    return prisma.category.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async create(data) {
    try {
      const validated = categorySchema.parse(data);
      const createdCategory = await prisma.category.create({
        data: validated,
      });
      return createdCategory;
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados da categoria.', error.errors);
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao criar categoria.');
    }
  }
}

export default new CategoryService();
