import { Router } from 'express';
import UploadController from '../controllers/UploadController.js';
import { upload } from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/:id', auth, upload.single('image'), UploadController.upload);

export default router;
