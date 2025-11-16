import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

router.get('/', ProductController.index);
router.post('/create', ProductController.create);
router.put('/update/:id', ProductController.update);
router.delete('/delete/:id', ProductController.delete);

export default router;
