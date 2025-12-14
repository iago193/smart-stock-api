export default class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;

    // garante stack trace correto
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Requisição inválida.', details = null) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = 'Não autorizado.') {
    return new ApiError(401, message);
  }

  static notFound(message = 'Não encontrado.') {
    return new ApiError(404, message);
  }

  static internal(message = 'Erro interno do servidor.', details = null) {
    return new ApiError(500, message, details);
  }
}
