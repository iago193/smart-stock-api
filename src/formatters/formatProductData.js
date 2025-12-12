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

function cleanBoolean(v, fieldName) {
  if (v === true || v === 'true') return true;
  if (v === false || v === 'false') return false;

  throw ApiError.badRequest(`${fieldName} deve ser um boolean válido (true/false).`, {
    field: fieldName,
    value: v,
  });
}

export function formatProductData(data = {}) {
  const name = cleanString(data.name);
  const desc = cleanString(data.description);

  const sku = cleanString(data.sku);
  const barcode = cleanString(data.barcode);
  const brand = cleanString(data.brand);

  // --- VALIDAÇÕES COM ERRO ---

  // NAME: 3–100 chars
  expectRange(name, 3, 100, 'name');

  // DESCRIPTION: obrigatório
  if (desc === '') {
    throw ApiError.badRequest('description não pode ser vazia.', {
      field: 'description',
    });
  }

  // SKU: 3–50 chars
  expectRange(sku, 3, 50, 'sku');

  // BARCODE: 3–50 chars
  expectRange(barcode, 3, 50, 'barcode');

  // CATEGORY_ID: precisa ser número válido
  const category_id = cleanNumber(data.category_id, 'category_id');

  // brand 2–50 chars
  expectRange(brand, 2, 50, 'brand');

  // price
  const price = cleanNumber(data.price, 'price');

  // discount_price opcional — se vier vazio, não erro
  const discount_price =
    data.discount_price === undefined || data.discount_price === null || data.discount_price === ''
      ? null
      : cleanNumber(data.discount_price, 'discount_price');

  // stock
  const stock = cleanNumber(data.stock, 'stock');

  // medidas
  const weight = cleanNumber(data.weight, 'weight');
  const width = cleanNumber(data.width, 'width');
  const height = cleanNumber(data.height, 'height');
  const length = cleanNumber(data.length, 'length');

  // boolean
  const is_active = cleanBoolean(data.is_active, 'is_active');

  return {
    name,
    description: desc,
    sku,
    barcode,
    category_id,
    brand,
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
