import cloudinary from '../lib/cloudinary.js';

class UploadService {
  async uploadImage(file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'produtos' }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        })
        .end(file.buffer);
    });
  }
}

export default new UploadService();
