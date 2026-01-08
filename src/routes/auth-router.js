import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import authMiddlewares from '../middlewares/auth-middlewares.js';
import { loginRateLimiter } from '../middlewares/rateLimiter-middlewares.js';

const router = Router();

router.post('/', loginRateLimiter, AuthController.login);
router.get('/me', authMiddlewares, AuthController.me);
router.post('/logout', authMiddlewares, AuthController.logout);

export default router;
