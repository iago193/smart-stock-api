class ProductController {
  index(req, res) {
    console.log('estamos aqui index');
    res.json({
      res: 'tudo ok',
    });
  }

  create(req, res) {
    console.log('estamos aqui create');
    res.json({
      res: 'tudo ok',
    });
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
