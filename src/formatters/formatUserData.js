import ApiError from '../error/ApiError.js';

function cleanString(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function expectRange(value, min, max, fieldName) {
  if (value.length < min || value.length > max) {
    throw ApiError.badRequest(`${fieldName} deve ter entre ${min} e ${max} caracteres.`, {
      field: fieldName,
      value,
    });
  }
  return value;
}

function validateEmailOrFail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    throw ApiError.badRequest(`email inválido.`, { field: 'email', value });
  }
  return value;
}

export function formatUserData(data = {}) {
  const first = cleanString(data.first_name);
  const last = cleanString(data.last_name);
  const email = cleanString(data.email);
  const pass = cleanString(data.password_hash);

  // --- VALIDAÇÕES COM THROW ---

  // first_name: 3–50 chars
  expectRange(first, 3, 50, 'first_name');

  // last_name: 3–50 chars
  expectRange(last, 3, 50, 'last_name');

  // email válido
  validateEmailOrFail(email);

  // password: mínimo 6 caracteres
  if (pass.length < 6) {
    throw ApiError.badRequest(`password_hash deve ter pelo menos 6 caracteres.`, {
      field: 'password_hash',
      value: pass,
    });
  }

  return {
    first_name: first,
    last_name: last,
    email,
    password_hash: pass,
  };
}
