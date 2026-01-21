import User from '../services/UserService.js';

class UserController {
  async index(req, res, next) {
    try {
      const currentUserId = req.user.id;
      const response = await User.read(currentUserId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const currentUserId = req.user.id;
      const response = await User.create(req.body, currentUserId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;
      const response = await User.update(req.body, id, currentUserId);
      res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const currentUserId = req.user.id;
      const response = await User.delete(id, currentUserId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
