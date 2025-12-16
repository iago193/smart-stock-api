import rateLimit from 'express-rate-limit';
import ApiError from '../errors/ApiError.js';

// Rate limiter para login - previne brute force attacks
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas por IP a cada 15 minutos
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(ApiError.tooManyRequests('Muitas tentativas de login. Tente novamente em 15 minutos.'));
  },
});

// Rate limiter geral para APIs
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requisições por IP a cada 15 minutos
  standardHeaders: true,
  legacyHeaders: false,
});
