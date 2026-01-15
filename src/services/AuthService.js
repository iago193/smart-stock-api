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
      name: user.first_name,
      email: user.email,
      role: user.role.name,
    });

    return token;
  }
}

export default new AuthService();
