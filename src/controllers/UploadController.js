import UploadService from '../services/UploadService.js';

class UploadController {
  async upload(req, res, next) {
    try {
      const file = req.file;
      const { id } = req.user.id;

      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const response = await UploadService.uploadImage(file, id);

      res.json({
        message: 'Upload concluído!',
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UploadController();
