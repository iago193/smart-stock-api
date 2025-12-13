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
  if (v === undefined || v === null || v === '') return null;
  return cleanNumber(v, fieldName);
}

function cleanBoolean(v, fieldName) {
  if (v === true || v === 'true') return true;
  if (v === false || v === 'false') return false;

  throw ApiError.badRequest(`${fieldName} deve ser boolean (true/false).`, {
    field: fieldName,
    value: v,
  });
}

export function formatProductData(data = {}) {
  // strings
  const name = cleanString(data.name);
  const description = cleanString(data.description);
  const sku = cleanString(data.sku);
  const barcode = cleanString(data.barcode);
  const brand = cleanString(data.brand);

  // validações obrigatórias
  expectRange(name, 3, 150, 'name');

  // opcionais (só valida se vierem)
  if (description) expectRange(description, 1, 1000, 'description');
  if (sku) expectRange(sku, 3, 50, 'sku');
  if (barcode) expectRange(barcode, 3, 50, 'barcode');
  if (brand) expectRange(brand, 2, 50, 'brand');

  // números
  const price = cleanNumber(data.price, 'price');
  const stock = cleanOptionalNumber(data.stock, 'stock') ?? 0;

  const discount_price = cleanOptionalNumber(data.discount_price, 'discount_price');
  const category_id = cleanOptionalNumber(data.category_id, 'category_id');

  const weight = cleanOptionalNumber(data.weight, 'weight');
  const width = cleanOptionalNumber(data.width, 'width');
  const height = cleanOptionalNumber(data.height, 'height');
  const length = cleanOptionalNumber(data.length, 'length');

  const is_active = data.is_active === undefined ? true : cleanBoolean(data.is_active, 'is_active');

  return {
    name,
    description: description || null,
    sku: sku || null,
    barcode: barcode || null,
    category_id,
    brand: brand || null,
    price,
    discount_price,
    stock,
    weight,
    width,
    height,
    length,
    is_active,
  };
}
