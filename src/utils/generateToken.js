import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

export default function generateToken(payload) {
  if (!process.env.JWT_SECRET) {
    throw ApiError.internal(
      'JWT_SECRET não configurado. Configure a variável de ambiente JWT_SECRET.'
    );
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}
