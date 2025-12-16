import { prisma } from '../lib/prismaClient.js';
import { formatProductData } from '../formatters/formatProductData.js';
import { productSchema } from '../schemas/product-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';

class ProductService {
  async read() {
    return prisma.product.findMany({
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
  }

  async create(data, role) {
    try {
      if (role !== 'admin') {
        throw ApiError.unauthorized('Você não tem autorização para criar produtos.');
      }

      const formatted = formatProductData(data);
      const validated = productSchema.parse(formatted);

      const product = await prisma.product.create({
        data: validated,
      });

      return {
        id: product.id,
        name: product.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados do produto.', error.errors);
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao criar produto.');
    }
  }

  async update(id, data, role) {
    try {
      if (role !== 'admin') {
        throw ApiError.unauthorized('Você não tem autorização para atualizar produtos.');
      }

      const formatted = formatProductData(data);
      const validated = productSchema.partial().parse(formatted);

      const existing = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!existing) {
        throw ApiError.notFound('Produto não encontrado para atualização.');
      }

      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: validated,
      });

      return {
        id: product.id,
        name: product.name,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados do produto.', error.errors);
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao atualizar produto.');
    }
  }

  async delete(id, role) {
    if (role !== 'admin') {
      throw ApiError.unauthorized('Você não tem autorização para deletar produtos.');
    }

    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      throw ApiError.notFound('Produto não encontrado para deletar.');
    }

    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });

    return {
      id: product.id,
      name: product.name,
    };
  }
}

export default new ProductService();
