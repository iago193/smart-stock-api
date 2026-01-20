import ApiError from '../errors/ApiError.js';
import { prisma } from '../config/prismaClient.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt';

class AuthService {
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    // Dummy hash para prevenir timing attacks
    const dummyHash = '$2b$10$dummyHashToPreventTimingAttack1234567890123456789012';
    const hashToCompare = user?.password_hash || dummyHash;

    const passwordIsValid = await bcrypt.compare(password, hashToCompare);

    if (!user || !passwordIsValid) {
      throw ApiError.unauthorized('Credenciais inválidas.');
    }

    if (!user.role) {
      throw ApiError.unauthorized('Usuário sem permissão configurada.');
    }

    const token = generateToken({
      id: user.id,
    });

    return token;
  }

  async me(id) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
          orderBy: {
            created_at: 'desc',
          },
          take: 1, // 👈 avatar atual
        },
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw ApiError.notFound('Usuário não encontrado.');
    }

    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role?.name,
      avatar: user.images[0]?.url ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

export default new AuthService();
