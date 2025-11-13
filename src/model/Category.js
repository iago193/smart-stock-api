import { prisma } from '../lib/prismaClient.js';
import { formatCategoryData } from '../utils/formatCategoryData.js';
import { categorySchema } from '../schemas/category-schema.js';
import { ZodError } from 'zod';

class Category {
  read() {
    console.log('estamos aqui category read');
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

  update() {
    console.log('estamos aqui category update');
  }

  delete() {
    console.log('estamos aqui category delete');
  }
}

export default new Category();
