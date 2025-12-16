import ApiError from '../errors/ApiError.js';

function cleanString(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function expectRange(value, min, max, fieldName) {
  if (!value) {
    throw ApiError.badRequest(`${fieldName} é obrigatório.`, {
      field: fieldName,
    });
  }

  if (value.length < min || value.length > max) {
    throw ApiError.badRequest(`${fieldName} deve ter entre ${min} e ${max} caracteres.`, {
      field: fieldName,
      value,
    });
  }

  return value;
}

function validateEmailOrFail(value) {
  if (!value) {
    throw ApiError.badRequest(`email é obrigatório.`, {
      field: 'email',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw ApiError.badRequest(`email inválido.`, {
      field: 'email',
      value,
    });
  }

  return value;
}

export function formatUserData(data = {}) {
  const first_name = cleanString(data.first_name);
  const last_name = cleanString(data.last_name);
  const email = cleanString(data.email);
  const password = cleanString(data.password);

  // role_id
  const role_id = data.role_id !== undefined ? Number(data.role_id) : undefined;

  // first_name
  expectRange(first_name, 3, 50, 'first_name');

  // last_name
  expectRange(last_name, 3, 50, 'last_name');

  // email
  validateEmailOrFail(email);

  // password
  if (!password || password.length < 6) {
    throw ApiError.badRequest(`password deve ter pelo menos 6 caracteres.`, {
      field: 'password',
    });
  }

  // role_id validation
  if (role_id !== undefined && (Number.isNaN(role_id) || role_id <= 0)) {
    throw ApiError.badRequest(`role_id inválido.`, {
      field: 'role_id',
      value: data.role_id,
    });
  }

  return {
    first_name,
    last_name,
    email,
    password,
    role_id,
  };
}

export function formatUserUpdateData(data = {}) {
  const formatted = {};

  // first_name (opcional)
  if (data.first_name !== undefined) {
    const first_name = cleanString(data.first_name);

    if (!first_name) {
      throw ApiError.badRequest(`first_name não pode ser vazio.`, {
        field: 'first_name',
      });
    }

    expectRange(first_name, 3, 50, 'first_name');
    formatted.first_name = first_name;
  }

  // last_name (opcional)
  if (data.last_name !== undefined) {
    const last_name = cleanString(data.last_name);

    if (!last_name) {
      throw ApiError.badRequest(`last_name não pode ser vazio.`, {
        field: 'last_name',
      });
    }

    expectRange(last_name, 3, 50, 'last_name');
    formatted.last_name = last_name;
  }

  // email (opcional)
  if (data.email !== undefined) {
    const email = cleanString(data.email);

    if (!email) {
      throw ApiError.badRequest(`email não pode ser vazio.`, {
        field: 'email',
      });
    }

    validateEmailOrFail(email);
    formatted.email = email;
  }

  // role_id (opcional)
  if (data.role_id !== undefined) {
    const role_id = Number(data.role_id);

    if (Number.isNaN(role_id) || role_id <= 0) {
      throw ApiError.badRequest(`role_id inválido.`, {
        field: 'role_id',
        value: data.role_id,
      });
    }

    formatted.role_id = role_id;
  }

  // Segurança extra: nada para atualizar
  if (Object.keys(formatted).length === 0) {
    throw ApiError.badRequest('Nenhum campo válido para atualização.');
  }

  return formatted;
}
