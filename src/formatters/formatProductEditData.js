import ApiError from '../errors/ApiError.js';

/* ===========================
   HELPERS
=========================== */

function cleanString(v) {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  return t === '' ? undefined : t;
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

function cleanNumber(v, fieldName) {
  const n = Number(v);
  if (!Number.isFinite(n)) {
    throw ApiError.badRequest(`${fieldName} deve ser um número válido.`, {
      field: fieldName,
      value: v,
    });
  }
  return n;
}

function cleanOptionalNumber(v, fieldName) {
  if (v === undefined || v === null || v === '') return undefined;
  return cleanNumber(v, fieldName);
}

function cleanBoolean(v, fieldName) {
  if (v === true || v === 'true' || v === 1 || v === '1') return true;
  if (v === false || v === 'false' || v === 0 || v === '0') return false;

  throw ApiError.badRequest(`${fieldName} deve ser boolean.`, { field: fieldName, value: v });
}

/* ===========================
   CREATE
=========================== */

export function formatProductCreateData(data = {}) {
  const name = cleanString(data.name);
  const description = cleanString(data.description);
  const sku = cleanString(data.sku);
  const barcode = cleanString(data.barcode);
  const brand = cleanString(data.brand);

  // obrigatórios
  if (!name) {
    throw ApiError.badRequest('name é obrigatório.', { field: 'name' });
  }
  expectRange(name, 3, 150, 'name');

  const price = cleanNumber(data.price, 'price');

  // opcionais
  if (description) expectRange(description, 1, 1000, 'description');
  if (sku) expectRange(sku, 3, 50, 'sku');
  if (barcode) expectRange(barcode, 3, 50, 'barcode');
  if (brand) expectRange(brand, 2, 50, 'brand');

  const stock = cleanOptionalNumber(data.stock, 'stock') ?? 0;
  const category_id = cleanOptionalNumber(data.category_id, 'category_id');
  const is_active = data.is_active === undefined ? true : cleanBoolean(data.is_active, 'is_active');

  return {
    name,
    description: description ?? null,
    sku: sku ?? null,
    barcode: barcode ?? null,
    brand: brand ?? null,
    price,
    stock,
    category_id,
    is_active,
  };
}

/* ===========================
   EDIT
=========================== */

export function formatProductEditData(data = {}) {
  const result = {};

  const name = cleanString(data.name);
  const description = cleanString(data.description);
  const sku = cleanString(data.sku);
  const barcode = cleanString(data.barcode);
  const brand = cleanString(data.brand);

  if (name) {
    expectRange(name, 3, 150, 'name');
    result.name = name;
  }

  if (description) {
    expectRange(description, 1, 1000, 'description');
    result.description = description;
  }

  if (sku) {
    expectRange(sku, 3, 50, 'sku');
    result.sku = sku;
  }

  if (barcode) {
    expectRange(barcode, 3, 50, 'barcode');
    result.barcode = barcode;
  }

  if (brand) {
    expectRange(brand, 2, 50, 'brand');
    result.brand = brand;
  }

  if (data.price !== undefined) {
    result.price = cleanNumber(data.price, 'price');
  }

  if (data.stock !== undefined) {
    result.stock = cleanNumber(data.stock, 'stock');
  }

  if (data.category_id !== undefined) {
    result.category_id = cleanOptionalNumber(data.category_id, 'category_id');
  }

  if (data.is_active !== undefined) {
    result.is_active = cleanBoolean(data.is_active, 'is_active');
  }

  if (Object.keys(result).length === 0) {
    throw ApiError.badRequest('Nenhum campo válido enviado para atualização.');
  }

  return result;
}
