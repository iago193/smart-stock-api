import { Router } from 'express';
import HistoryControler from '../controllers/HistoryControler.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', HistoryControler.index);
router.post('/', auth, HistoryControler.create);

export default router;
