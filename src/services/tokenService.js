import ApiError from '../errors/ApiError.js';
import { prisma } from '../lib/prismaClient.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt';

class TokenService {
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    const passwordIsValid = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsValid) {
      console.log('inválido!');
      throw ApiError.unauthorized('Credenciais inválidas.');
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    if (!user) {
      throw ApiError.notFound('Usuário não encontrad.');
    }

    return token;
  }
}

export default new TokenService();
