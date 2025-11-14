import { prisma } from '../lib/prismaClient.js';
import { formatCategoryData } from '../utils/formatCategoryData.js';
import { categorySchema } from '../schemas/category-schema.js';
import { ZodError } from 'zod';

class Category {
  async read() {
    try {
      const categories = await prisma.categories.findMany({
        orderBy: { id: 'desc' },
      });

      return categories;
    } catch (error) {
      throw {
        type: 'internal',
        message: 'Erro ao buscar categorias',
        details: error.message || error,
      };
    }
  }

  async create(data) {
    console.log('estamos aqui category create');
    try {
      const formatted = formatCategoryData(data);
      const validated = categorySchema.parse(formatted);
      const categoryCreate = await prisma.categories.create({ data: validated });
      return {
        id: categoryCreate.id,
        name: categoryCreate.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw {
          type: 'validation',
          message: 'Erro de validação nos dados do produto',
          details: error.errors,
        };
      }
      throw {
        type: 'internal',
        message: 'Erro interno ao criar produto.',
        details: error,
      };
    }
  }

  async update(id, data) {
    const formatted = formatCategoryData(data);
    const validated = categorySchema.parse(formatted);
    try {
      const existing = await prisma.categories.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw {
          type: 'not_found',
          message: 'Categoria não encontrada para atualização.',
        };
      }

      const updateCategory = await prisma.categories.update({
        where: { id: Number(id) },
        data: validated,
      });

      return {
        id: updateCategory.id,
        name: updateCategory.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw {
          type: 'validation',
          message: 'Erro de validação nos dados da Categoria.',
          details: error.errors,
        };
      }

      throw {
        type: 'internal',
        message: 'Erro interno ao atualizar Categoria.',
        details: error.message || error,
      };
    }
  }

  async delete(id) {
    try {
      const existing = await prisma.categories.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw {
          type: 'not_found',
          message: 'Produto não encontrado.',
        };
      }

      const categoryDeleted = prisma.categories.delete({
        where: { id: Number(id) },
      });

      return {
        id: categoryDeleted.id,
        name: categoryDeleted.name,
      };
    } catch (error) {
      if (error.type === 'not_found') {
        throw error;
      }

      throw {
        type: 'internal',
        message: 'Erro interno ao deletar produto.',
        details: error.message || error,
      };
    }
  }
}

export default new Category();
