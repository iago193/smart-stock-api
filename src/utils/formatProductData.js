export function formatProductData(data) {
  return {
    name: data.name?.trim() || '',
    description: data.description?.trim() || null,

    sku: data.sku?.trim() || null,
    barcode: data.barcode?.trim() || null,

    category_id: data.category_id ? Number(data.category_id) : null,
    brand: data.brand?.trim() || null,

    price: data.price ? Number(data.price) : 0,
    discount_price: data.discount_price ? Number(data.discount_price) : null,

    stock: data.stock ? Number(data.stock) : 0,

    weight: data.weight ? Number(data.weight) : null,
    width: data.width ? Number(data.width) : null,
    height: data.height ? Number(data.height) : null,
    length: data.length ? Number(data.length) : null,

    is_active:
      data.is_active === 'false'
        ? false
        : data.is_active === 'true'
          ? true
          : (data.is_active ?? true),
  };
}
