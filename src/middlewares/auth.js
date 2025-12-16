import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(ApiError.unauthorized('Token não fornecido.'));
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(ApiError.unauthorized('Formato de token inválido. Use: Bearer <token>'));
  }

  const token = parts[1];

  if (!token) {
    return next(ApiError.unauthorized('Token não fornecido.'));
  }

  if (!process.env.JWT_SECRET) {
    return next(ApiError.internal('JWT_SECRET não configurado.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    return next(ApiError.unauthorized('Token inválido ou expirado.'));
  }
};

export default authMiddleware;
