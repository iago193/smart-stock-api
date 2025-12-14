import ApiError from '../errors/ApiError.js';

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

export function formatCategoryData(data = {}) {
  const name = cleanString(data.name);
  const desc = cleanString(data.description);

  // --- VALIDAÇÕES ---

  // NAME obrigatório: 3 a 80 chars
  if (!name) {
    throw ApiError.badRequest('name é obrigatório.', {
      field: 'name',
      value: name,
    });
  }
  expectRange(name, 3, 80, 'name');

  // DESCRIPTION opcional, mas se vier vazia → erro
  if (data.description !== undefined && desc === '') {
    throw ApiError.badRequest('description não pode ser uma string vazia.', {
      field: 'description',
      value: data.description,
    });
  }

  return {
    name,
    description: desc || null,
  };
}
