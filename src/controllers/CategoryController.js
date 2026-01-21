import CategoryService from '../services/CategoryService.js';

class CategoryController {
  async index(req, res, next) {
    try {
      const response = await CategoryService.index();
      return res.status(200).json({
        success: true,
        message: 'Listagem de categorias',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const currentUserId = req.user.id;
      const response = await CategoryService.create(req.body, currentUserId);
      return res.status(201).json({
        success: true,
        message: 'Categoria criada com sucesso',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const currentUserId = req.user.id;
      const { id } = req.params;
      const response = await CategoryService.update(id, req.body, currentUserId);
      return res.status(200).json({
        success: true,
        message: 'Categoria atualizada com sucesso',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const currentUserId = req.user.id;
      const { id } = req.params;
      await CategoryService.delete(id, currentUserId);
      return res.status(200).json({
        success: true,
        message: 'Categoria deletada com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
