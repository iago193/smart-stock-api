import { prisma } from '../lib/prismaClient.js';
import { formatCategoryData } from '../formatters/formatCategoryData.js';
import { categorySchema } from '../schemas/category-schema.js';
import ApiError from '../error/ApiError.js';
import { ZodError } from 'zod';

class Category {
  async read() {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { id: 'desc' },
      });
      return categories;
    } catch (error) {
      throw ApiError.internal('Erro ao buscar categorias', error);
    }
  }

  async create(data) {
    try {
      const formatted = formatCategoryData(data);
      const validated = categorySchema.parse(formatted);

      const categoryCreate = await prisma.category.create({ data: validated });

      return {
        id: categoryCreate.id,
        name: categoryCreate.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados da categoria', error.errors);
      }
      throw ApiError.internal('Erro interno ao criar categoria.', error);
    }
  }

  async update(id, data) {
    try {
      const formatted = formatCategoryData(data);
      const validated = categorySchema.parse(formatted);

      const existing = await prisma.category.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw ApiError.notFound('Categoria não encontrada para atualização.');
      }

      const updated = await prisma.category.update({
        where: { id: Number(id) },
        data: validated,
      });

      return {
        id: updated.id,
        name: updated.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados da categoria.', error.errors);
      }
      throw ApiError.internal('Erro interno ao atualizar categoria.', error);
    }
  }

  async delete(id) {
    try {
      const existing = await prisma.category.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw ApiError.notFound('Categoria não encontrada para deletar.');
      }

      const deleted = await prisma.category.delete({
        where: { id: Number(id) },
      });

      return {
        id: deleted.id,
        name: deleted.name,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.internal('Erro interno ao deletar categoria.', error);
    }
  }
}

export default new Category();
