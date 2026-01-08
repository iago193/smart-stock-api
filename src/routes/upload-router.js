import { Router } from 'express';
import UploadController from '../controllers/UploadController.js';
import { upload } from '../middlewares/multer-middlewares.js';
import authMiddlewares from '../middlewares/auth-middlewares.js';

const router = Router();

router.post('/:id', authMiddlewares, upload.single('image'), UploadController.upload);

export default router;
