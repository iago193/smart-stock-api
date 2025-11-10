export function formatProductData(data) {
  return {
    name: data.name?.trim() || '',
    description: data.description?.trim() || null,
    sku: data.sku?.trim() || null,
    barcode: data.barcode?.trim() || null,
    category_id: data.category_id ? parseInt(data.category_id) : null,
    brand: data.brand?.trim() || null,

    // Números decimais
    price: data.price ? parseFloat(data.price) : 0,
    discount_price: data.discount_price ? parseFloat(data.discount_price) : null,

    // Inteiro
    stock: data.stock ? parseInt(data.stock) : 0,

    // Decimais opcionais
    weight: data.weight ? parseFloat(data.weight) : null,
    width: data.width ? parseFloat(data.width) : null,
    height: data.height ? parseFloat(data.height) : null,
    length: data.length ? parseFloat(data.length) : null,

    image_url: data.image_url?.trim() || null,

    // Booleano
    is_active:
      data.is_active === 'false'
        ? false
        : data.is_active === 'true'
          ? true
          : (data.is_active ?? true),
  };
}
