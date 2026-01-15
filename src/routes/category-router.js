import { Router } from 'express';
import CategoryController from '../controllers/CategoryController.js';
import authMiddlewares from '../middlewares/auth-middlewares.js';

const router = Router();

router.get('/', CategoryController.index);
router.post('/', authMiddlewares, CategoryController.create);
router.put('/:id', authMiddlewares, CategoryController.update);
router.delete('/:id', authMiddlewares, CategoryController.delete);

export default router;
