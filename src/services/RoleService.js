import { prisma } from '../config/prismaClient.js';
import ApiError from '../errors/ApiError.js';

class RoleService {
  async getByRoles(id) {
    const useRole = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { role: true },
    });

    if (!useRole) {
      throw ApiError.notFound('Usuário não encontrado.');
    }

    const roles = await prisma.role.findUnique({
      where: { id: Number(useRole.role.id) },
    });
    return roles.name;
  }
}
export default new RoleService();
