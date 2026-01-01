import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, UserController.index);
router.post('/', auth, UserController.create);
router.put('/:id', auth, UserController.update);
router.delete('/:id', auth, UserController.delete);

export default router;
