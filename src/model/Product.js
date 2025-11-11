import { prisma } from '../lib/prismaClient.js';
import { formatProductData } from '../utils/formatData.js';
import { productSchema } from '../schemas/productSchema.js';
import { ZodError } from 'zod';

class Product {
  async read() {
    try {
      const products = await prisma.products.findMany({
        orderBy: { id: 'desc' },
      });

      return products;
    } catch (error) {
      throw {
        type: 'internal',
        message: 'Erro ao buscar produtos.',
        details: error.message || error,
      };
    }
  }

  async create(data) {
    try {
      const formatted = formatProductData(data);
      const validated = productSchema.parse(formatted);
      const productCreate = await prisma.products.create({ data: validated });
      return productCreate;
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
    console.log('estamos aqui product update');
  }

  delete() {
    console.log('estamos aqui product delete');
  }
}

export default new Product();
