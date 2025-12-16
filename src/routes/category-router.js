import { Router } from 'express';
import CategoryController from '../controllers/CategoryController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', CategoryController.index);
router.post('/create', auth, CategoryController.create);
router.put('/update/:id', auth, CategoryController.update);
router.delete('/delete/:id', auth, CategoryController.delete);

export default router;
