import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import authMiddlewares from '../middlewares/auth-middlewares.js';

const router = Router();

router.get('/', authMiddlewares, UserController.index);
router.post('/', authMiddlewares, UserController.create);
router.put('/:id', authMiddlewares, UserController.update);
router.delete('/:id', authMiddlewares, UserController.delete);

export default router;
