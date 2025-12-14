import { Router } from 'express';
import TokenController from '../controllers/TokenController.js';

const router = Router();

router.post('/', TokenController.login);

export default router;
