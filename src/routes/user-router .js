import { Router } from 'express';
import ProductController from '../controller/ProductController';

const router = Router();

router.get('/', ProductController.index);
router.get('/create', ProductController.create);
router.get('/update/:id', ProductController.update);
router.get('/delete/:id', ProductController.delete);

export default router;