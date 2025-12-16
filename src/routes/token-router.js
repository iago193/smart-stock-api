import { Router } from 'express';
import TokenController from '../controllers/TokenController.js';
import { loginRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/', loginRateLimiter, TokenController.login);

export default router;
