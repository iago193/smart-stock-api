import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, UserController.index);
router.post('/create', auth, UserController.create);
router.put('/update/:id', auth, UserController.update);
router.delete('/delete/:id', auth, UserController.delete);

export default router;
