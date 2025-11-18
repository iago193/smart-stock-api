import ApiError from '../error/ApiError.js';
import cloudinary from '../lib/cloudinary.js';
import { prisma } from '../lib/prismaClient.js';

class UploadService {
  async uploadImage(file, id) {
    try {
      const productId = Number(id);

      const existing = await prisma.products.findUnique({
        where: { id: productId },
      });

      if (!existing) {
        throw ApiError.notFound('Produto não encontrado');
      }

      const imageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'produtos' }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          })
          .end(file.buffer);
      });

      const updatedProduct = await prisma.products.update({
        where: { id: productId },
        data: { image_url: imageUrl },
        select: {
          id: true,
          name: true,
          image_url: true,
        },
      });

      return updatedProduct;
    } catch (error) {
      throw ApiError.internal('Erro ao fazer upload da imagem.', error);
    }
  }
}

export default new UploadService();
