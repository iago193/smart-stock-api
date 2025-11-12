import { prisma } from '../lib/prismaClient.js';
import { formatProductData } from '../utils/formatData.js';
import { productSchema } from '../schemas/product-schema.js';
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
      return {
        id: productCreate.id,
        name: productCreate.name,
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
    const formatted = formatProductData(data);
    const validated = productSchema.partial().parse(formatted);

    const existing = await prisma.products.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      throw {
        type: 'not_found',
        message: 'Produto não encontrado para atualização.',
      };
    }

    try {
      const updateProduct = await prisma.products.update({
        where: { id: Number(id) },
        data: validated,
      });

      return {
        id: updateProduct.id,
        name: updateProduct.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw {
          type: 'validation',
          message: 'Erro de validação nos dados do produto.',
          details: error.errors,
        };
      }

      throw {
        type: 'internal',
        message: 'Erro interno ao atualizar produto.',
        details: error.message || error,
      };
    }
  }

  async delete(id) {
    try {
      const productExisting = await prisma.products.findUnique({
        where: { id: Number(id) },
      });

      if (!productExisting) {
        throw {
          type: 'not_found',
          message: 'Produto não encontrado.',
        };
      }

      const producTeleted = await prisma.products.delete({
        where: { id: Number(id) },
      });

      return {
        id: producTeleted.id,
        name: producTeleted.name,
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

export default new Product();
