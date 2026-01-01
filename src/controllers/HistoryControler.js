import HistoryService from '../services/HistoryService.js';

class HistoryController {
  index(req, res) {
    res.status(200).json('Histórico criado');
  }

  create(req, res) {
    const response = HistoryService.create(req.body);
    res.status(201).json({
      data: {
        message: 'Histórico criado',
        response,
      },
    });
  }
}

export default new HistoryController();
