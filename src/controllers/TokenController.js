import tokenService from '../services/tokenService.js';

class TokenController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await tokenService.login(email, password);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TokenController();
