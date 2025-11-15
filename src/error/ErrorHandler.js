import ApiError from './ApiError.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details || null,
    });
  }

  return res.status(500).json({
    error: 'Erro interno no servidor.',
    details: err.message || null,
  });
}
