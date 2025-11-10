import { prisma } from '../lib/prismaClient.js';
import { formatProductData } from '../utils/formatData.js';

class Product {
  read() {
    console.log('estamos aqui product read');
  }

  async create(data) {
    try {
      const formatted = formatProductData(data);
      const productCreate = await prisma.products.create({ data: formatted });
      return productCreate;
    } catch (error) {
      console.log('new error:', error.message);
      throw new Error('Erro ao criar produto no banco.');
    }
  }

  update() {
    console.log('estamos aqui product update');
  }

  delete() {
    console.log('estamos aqui product delete');
  }
}

export default new Product();
