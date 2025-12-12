import { prisma } from '../lib/prismaClient.js';
import { formatProductData } from '../formatters/formatProductData.js';
import { productSchema } from '../schemas/product-schema.js';
import ApiError from '../error/ApiError.js';
import { ZodError } from 'zod';

class Product {
  async read() {
    try {
      const products = await prisma.products.findMany({
        orderBy: { id: 'desc' },
        include: {
          product_images: {
            select: {
              id: true,
              url: true,
              public_id: true,
            },
          },
        },
      });

      return products;
    } catch (error) {
      throw ApiError.internal('Erro ao buscar produtos.', error);
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
        throw ApiError.badRequest('Erro de validação nos dados do produto', error.errors);
      }

      throw ApiError.internal('Erro interno ao criar produto.', error);
    }
  }

  async update(id, data) {
    try {
      const formatted = formatProductData(data);
      const validated = productSchema.partial().parse(formatted);

      const existing = await prisma.products.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw ApiError.notFound('Produto não encontrado para atualização.');
      }

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
        throw ApiError.badRequest('Erro de validação nos dados do produto.', error.errors);
      }

      throw ApiError.internal('Erro interno ao atualizar produto.', error);
    }
  }

  async delete(id) {
    try {
      const productExisting = await prisma.products.findUnique({
        where: { id: Number(id) },
      });

      if (!productExisting) {
        throw ApiError.notFound('Produto não encontrado para deletar.');
      }

      const producTeleted = await prisma.products.delete({
        where: { id: Number(id) },
      });

      return {
        id: producTeleted.id,
        name: producTeleted.name,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao deletar produto.', error);
    }
  }
}

export default new Product();
