import tokenService from '../services/tokenService.js';

class TokenController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await tokenService.login(email, password);

      // const isProd = process.env.NODE_ENV === 'production';

      // res.cookie('token', response, {
      //   httpOnly: true,
      //   secure: isProd,
      //   sameSite: isProd ? 'none' : 'lax',
      //   maxAge: 60 * 60 * 1000,
      //   path: '/',
      //   domain: isProd ? 'meu.dominio.com' : 'localhost',
      // });

      res.status(200).json({
        token: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TokenController();
