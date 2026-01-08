import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const authMiddleware = (req, res, next) => {
  // 🔐 Token vem do cookie
  const token = req.cookies?.token;

  if (!token) {
    return next(ApiError.unauthorized('Não autenticado.'));
  }

  if (!process.env.JWT_SECRET) {
    return next(ApiError.internal('JWT_SECRET não configurado.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    return next();
  } catch {
    return next(ApiError.unauthorized('Token inválido ou expirado.'));
  }
};

export default authMiddleware;
