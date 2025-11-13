import { Router } from 'express';
import CategoryController from '../controller/CategoryController.js';

const router = Router();

router.get('/', CategoryController.index);
router.post('/create', CategoryController.create);
router.put('/update/:id', CategoryController.update);
router.delete('/delete/:id', CategoryController.delete);

export default router;
