import authService from '../services/AuthService.js';

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);

      const isProd = process.env.NODE_ENV === 'production';

      res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? 'none' : 'lax',
          maxAge: 60 * 60 * 1000 * 24,
          path: '/',
          domain: isProd ? 'meudominio.com' : 'localhost',
        })
        .json({
          success: true,
          message: 'Login realizado com sucesso',
        });
    } catch (error) {
      next(error);
    }
  }

  me(req, res) {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  }

  logout(req, res) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  }
}

export default new AuthController();
