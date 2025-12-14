import ApiError from '../errors/ApiError.js';
import { prisma } from '../lib/prismaClient.js';

class TokenService {
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw ApiError.notFound('Usuário não encontrad.');
    }

    return user;
  }
}

export default new TokenService();
