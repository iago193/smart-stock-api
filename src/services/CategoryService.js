import { prisma } from '../lib/prismaClient.js';
import { formatCategoryData } from '../formatters/formatCategoryData.js';
import { categorySchema } from '../schemas/category-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';

class CategoryService {
  async read() {
    return prisma.category.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async create(data) {
    try {
      const formatted = formatCategoryData(data);
      const validated = categorySchema.parse(formatted);

      const category = await prisma.category.create({
        data: validated,
      });

      return {
        id: category.id,
        name: category.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados da categoria.', error.errors);
      }

      throw error;
    }
  }

  async update(id, data) {
    try {
      const formatted = formatCategoryData(data);
      const validated = categorySchema.partial().parse(formatted);

      const existing = await prisma.category.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw ApiError.notFound('Categoria não encontrada para atualização.');
      }

      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: validated,
      });

      return {
        id: category.id,
        name: category.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados da categoria.', error.errors);
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw error;
    }
  }

  async delete(id) {
    const existing = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      throw ApiError.notFound('Categoria não encontrada para deletar.');
    }

    const category = await prisma.category.delete({
      where: { id: Number(id) },
    });

    return {
      id: category.id,
      name: category.name,
    };
  }
}

export default new CategoryService();
