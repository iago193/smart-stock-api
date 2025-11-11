import product from '../model/Product.js';

class ProductController {
  async index(req, res) {
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
      res.status(500).json({
        message: error.message,
        details: error.details,
      });
    }
  }

  async create(req, res) {
    try {
      const response = await product.create(req.body);
      res.status(201).json({
        message: 'Produto criado com sucesso!',
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

  update(req, res) {
    console.log('estamos aqui update');
    res.json({
      res: 'tudo ok',
    });
  }

  delete(req, res) {
    console.log('estamos aqui delete');
    res.json({
      res: 'tudo ok',
    });
  }
}

export default new ProductController();
