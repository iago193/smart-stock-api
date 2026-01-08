import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';
import authMiddlewares from '../middlewares/auth-middlewares.js';

const router = Router();

router.get('/', ProductController.index);
router.post('/', authMiddlewares, ProductController.create);
router.put('/:id', authMiddlewares, ProductController.update);
router.delete('/:id', authMiddlewares, ProductController.delete);

export default router;
