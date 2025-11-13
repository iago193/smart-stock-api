import category from '../model/Category.js';

class CategoryController {
  index() {
    console.log('estamos aqui category index');
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

  update() {
    console.log('estamos aqui category update');
  }

  delete() {
    console.log('estamos aqui category delete');
  }
}

export default new CategoryController();
