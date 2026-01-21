import { prisma } from '../config/prismaClient.js';
import { categorySchema } from '../schemas/category-schema.js';
import ApiError from '../errors/ApiError.js';
import { ZodError } from 'zod';
import { roles } from '../constants/roles.js';
import RoleService from './RoleService.js';

class CategoryService {
  async index() {
    return prisma.category.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async create(data, currentUserId) {
    try {
      const role = await RoleService.getByRoles(currentUserId);
      if (role !== roles.OWNER && role !== roles.MANAGER) {
        throw ApiError.unauthorized('Apenas administradores podem criar categorias.');
      }
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

  async update(id, data, currentUserId) {
    try {
      const role = await RoleService.getByRoles(currentUserId);
      if (role !== roles.OWNER && role !== roles.MANAGER) {
        throw ApiError.unauthorized('Apenas administradores podem criar categorias.');
      }
      const validated = categorySchema.parse(data);
      const editedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: validated,
      });
      return editedCategory;
    } catch (error) {
      if (error instanceof ZodError) {
        throw ApiError.badRequest('Erro de validação nos dados da categoria.', error.errors);
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw ApiError.internal('Erro interno ao atualizar categoria.');
    }
  }

  async delete(id, currentUserId) {
    const role = await RoleService.getByRoles(currentUserId);
    if (role !== roles.OWNER && role !== roles.MANAGER) {
      throw ApiError.unauthorized('Apenas administradores podem criar categorias.');
    }
    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return deletedCategory;
  }
}

export default new CategoryService();
