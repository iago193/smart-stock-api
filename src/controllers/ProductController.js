import product from '../services/ProductService.js';

class ProductController {
  async index(req, res, next) {
    try {
      const response = await product.read();

      if (response.lenght === 0) {
        return res.status(404).json({
          message: 'Nenhum produto encontrado.',
        });
      }

      res.status(200).json({
        message: 'Produtos encontrados com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    console.log(req.body);
    try {
      const response = await product.create(req.body);
      res.status(201).json({
        message: 'Produto criado com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const response = await product.update(id, req.body);
      res.status(200).json({
        message: 'Produto editado com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const response = await product.delete(id);

      res.status(200).json({
        message: 'Produto deletado com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
