import { prisma } from '../config/prismaClient.js';
import { formatProductData } from '../formatters/formatProductData.js';
import { productSchema } from '../schemas/product-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';
import cloudinary from '../lib/cloudinary.js';

class ProductService {
  constructor() {
    this.allowedRoles = ['owner', 'manager'];
  }
  async read() {
    return prisma.product.findMany({
      orderBy: { id: 'desc' },
      include: {
        images: {
          select: {
            id: true,
            url: true,
            public_id: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(data, role) {
    try {
      if (!this.allowedRoles.includes(role) && role !== 'box') {
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
      if (!this.allowedRoles.includes(role) && role !== 'box') {
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
    try {
      if (!this.allowedRoles.includes(role)) {
        throw ApiError.unauthorized('Você não tem autorização para deletar produtos.');
      }

      const existing = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          product_images: {
            select: {
              id: true,
              public_id: true,
            },
          },
        },
      });

      if (!existing) {
        throw ApiError.notFound('Produto não encontrado para deletar.');
      }

      // Deleta as imagens do Cloudinary antes de deletar o produto
      if (existing.product_images && existing.product_images.length > 0) {
        const deletePromises = existing.product_images.map(image =>
          cloudinary.uploader.destroy(image.public_id).catch(error => {
            // Log do erro mas não impede a deleção do produto
            console.error(
              `Erro ao deletar imagem do Cloudinary (public_id: ${image.public_id}):`,
              error
            );
          })
        );

        await Promise.all(deletePromises);
      }

      const product = await prisma.product.delete({
        where: { id: Number(id) },
      });

      return {
        id: product.id,
        name: product.name,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao deletar produto.');
    }
  }
}

export default new ProductService();
