import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', ProductController.index);
router.post('/', auth, ProductController.create);
router.put('/:id', auth, ProductController.update);
router.delete('/:id', auth, ProductController.delete);

export default router;
