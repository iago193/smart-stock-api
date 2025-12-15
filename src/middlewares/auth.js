import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw ApiError.unauthorized('Token não fornecido.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.log(err);
    throw ApiError.unauthorized('Token inválido ou expirado.');
  }
};

export default authMiddleware();
