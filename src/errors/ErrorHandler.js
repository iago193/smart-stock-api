import ApiError from './ApiError.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  // Erros controlados da aplicação
  if (err instanceof ApiError) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }

    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details ?? null,
    });
  }

  // Log de erro inesperado
  console.error(err);

  // Erro genérico
  return res.status(500).json({
    message: 'Erro interno no servidor.',
  });
}
