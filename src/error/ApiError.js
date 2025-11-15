export default class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(msg, details) {
    return new ApiError(400, msg, details);
  }

  static internal(msg, details) {
    return new ApiError(500, msg, details);
  }

  static unauthorized(msg = 'Não autorizado.') {
    return new ApiError(401, msg);
  }

  static notFound(msg = 'Não encontrado.') {
    return new ApiError(404, msg);
  }
}
