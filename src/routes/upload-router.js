import { Router } from 'express';
import UploadController from '../controllers/UploadController.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post('/', upload.single('image'), UploadController.upload);

export default router;
