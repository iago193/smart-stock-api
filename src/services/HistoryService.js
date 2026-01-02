import { prisma } from '../lib/prismaClient.js';
import ApiError from '../errors/ApiError.js';

class HistoryService {
  async create(body) {
    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      throw ApiError.internal('Erro interno ao criar Histórico.');
    }

    const historyCriated = await prisma.history.create({ data: body });
    return historyCriated;
  }
}

export default new HistoryService();
