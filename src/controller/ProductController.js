import { product } from '../model/Product.js';

class ProductController {
  index(req, res) {
    console.log('estamos aqui index');
    res.json({
      res: 'tudo ok',
    });
  }

  async create(req, res) {
    try {
      const response = await product.create({ data: req.body });
      res.status(201).json({
        message: 'Produto criado com sucesso!',
        data: response,
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({
        message: 'Erro ao criar produto.',
        error: error.message,
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
