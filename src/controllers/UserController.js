import User from '../services/UserService.js';

class UserController {
  index(req, res) {
    console.log('estamos aqui index');
    res.status(200).json('estamos aqui index');
  }

  async create(req, res, next) {
    try {
      const response = await User.create(req.body);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  update() {
    console.log('estamos aqui update');
  }

  delete() {
    console.log('estamos aqui delete');
  }
}

export default new UserController();
