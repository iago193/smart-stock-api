import category from '../model/Category.js';

class CategoryController {
  async index(req, res, next) {
    try {
      const response = await category.read();

      if (response.length === 0) {
        return res.status(404).json({
          message: 'Nenhum produto encontrado.',
        });
      }

      return res.status(200).json({
        message: 'Categorias encontradas com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await category.create(req.body);
      res.status(200).json({
        message: 'Categoria criada com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const response = await category.update(id, req.body);
      return res.status(200).json({
        message: 'Categoria editada com sucesso!.',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const response = await category.delete(id);
      return res.status(200).json({
        message: 'Categoria deletada com sucesso!.',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
