import category from '../model/Category.js';

class CategoryController {
  async index(req, res) {
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
      res.status(500).json({
        message: error.message,
        details: error.details,
      });
    }
  }

  async create(req, res) {
    try {
      const response = await category.create(req.body);
      res.status(200).json({
        message: 'Categoria criada com sucesso!',
        data: response,
      });
    } catch (error) {
      if (error.type === 'validation') {
        return res.status(400).json({
          message: error.message,
          details: error.details,
        });
      }

      return res.status(500).json({
        message: error.message,
        details: error.details,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const response = await category.update(id, req.body);
      return res.status(200).json({
        message: 'Categoria editada com sucesso!.',
        data: response,
      });
    } catch (error) {
      if (error.type === 'validation') {
        return res.status(400).json({
          message: error.message,
          details: error.details,
        });
      }

      if (error.type === 'not_found') {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: error.message || 'Erro interno no servidor.',
        details: error.details,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const response = await category.delete(id);
      return res.status(200).json({
        message: 'Categoria deletada com sucesso!.',
        data: response,
      });
    } catch (error) {
      if (error.type === 'not_found') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({
        message: error.message || 'Erro interno no servidor.',
        details: error.details,
      });
    }
  }
}

export default new CategoryController();
