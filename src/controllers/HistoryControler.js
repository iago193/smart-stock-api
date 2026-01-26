import HistoryService from '../services/HistoryService.js';

class HistoryController {
  async index(req, res, next) {
    try {
      const response = await HistoryService.index();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await HistoryService.create(req.body);
      res.status(201).json({
        data: {
          message: 'Histórico criado',
          response,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new HistoryController();
