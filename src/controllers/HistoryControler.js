import HistoryService from '../services/HistoryService.js';

class HistoryController {
  index(req, res) {
    res.status(200).json('Histórico criado');
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
