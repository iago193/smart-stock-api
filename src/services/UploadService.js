import ApiError from '../errors/ApiError.js';
import cloudinary from '../lib/cloudinary.js';
import { prisma } from '../lib/prismaClient.js';

class UploadService {
  async uploadImage(file, id) {
    const productId = Number(id);

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      throw ApiError.notFound('Produto não encontrado');
    }

    let uploadResult;

    try {
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'produtos' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(file.buffer);
      });
    } catch (error) {
      throw ApiError.internal('Erro ao enviar imagem para o Cloudinary.', error);
    }

    const createdImage = await prisma.productImage.create({
      data: {
        product_id: productId,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    return createdImage;
  }
}

export default new UploadService();
