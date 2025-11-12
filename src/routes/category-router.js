import { Router } from 'express';
import CategoryController from '../controller/CategoryController.js';

const router = Router();

router.get('/', CategoryController.index);
router.get('/create', CategoryController.create);
router.get('/update/:id', CategoryController.update);
router.get('/delete/:id', CategoryController.delete);

export default router;
