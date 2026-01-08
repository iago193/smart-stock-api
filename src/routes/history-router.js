import { Router } from 'express';
import HistoryControler from '../controllers/HistoryControler.js';
import authMiddlewares from '../middlewares/auth-middlewares.js';

const router = Router();

router.get('/', HistoryControler.index);
router.post('/', authMiddlewares, HistoryControler.create);

export default router;
