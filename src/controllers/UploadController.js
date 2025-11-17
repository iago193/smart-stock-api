import UploadService from '../services/UploadService.js';

class UploadController {
  async upload(req, res, next) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const imageUrl = await UploadService.uploadImage(file);

      res.json({
        message: 'Upload concluído!',
        image_url: imageUrl,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UploadController();
