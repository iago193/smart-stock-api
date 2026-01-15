import ApiError from '../errors/ApiError.js';
import cloudinary from '../lib/cloudinary.js';
import { prisma } from '../config/prismaClient.js';

class UploadService {
  async uploadImage(file, id, userRole) {
    const productId = Number(id);

    if (Number.isNaN(productId) && productId <= 0) {
      throw ApiError.badRequest('ID do produto inválido.');
    }

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      throw ApiError.notFound('Produto não encontrado');
    }

    if (userRole !== 'owner' && userRole !== 'manager' && userRole !== 'stock') {
      throw ApiError.unauthorized('Você não tem permissão para fazer upload de imagens.');
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
    } catch {
      throw ApiError.internal('Erro ao enviar imagem para o Cloudinary.');
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
