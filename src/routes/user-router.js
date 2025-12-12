import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.get('/', UserController.index);
router.post('/create', UserController.create);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);

export default router;
