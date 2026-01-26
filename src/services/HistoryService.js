import { prisma } from '../config/prismaClient.js';
import ApiError from '../errors/ApiError.js';

class HistoryService {
  async index() {
    const response = await prisma.history.findMany({
      orderBy: { id: 'desc' },
    });

    return response;
  }

  async create(body) {
    if (!body?.operator || !Array.isArray(body.items) || body.items.length === 0) {
      throw ApiError.internal('Erro interno ao criar histórico.');
    }

    const items = body.items.map(item => ({
      productId: item.id ?? null,
      productName: item.name,
      productSku: item.sku,
      categoryName: item.category?.name ?? null,
      unitPrice: Number(item.price),
      quantity: Number(item.quantity),
      total: Number(item.price) * Number(item.quantity),
    }));

    return prisma.history.create({
      data: {
        operator: body.operator,
        total: Number(body.total),
        items,
      },
    });
  }
}

export default new HistoryService();
