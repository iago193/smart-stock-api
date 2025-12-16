import ApiError from '../errors/ApiError.js';
import cloudinary from '../lib/cloudinary.js';
import { prisma } from '../lib/prismaClient.js';

class UploadService {
  async uploadImage(file, id, userRole) {
    const productId = Number(id);

    // Valida se o ID é um número válido
    if (Number.isNaN(productId) || productId <= 0) {
      throw ApiError.badRequest('ID do produto inválido.');
    }

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      throw ApiError.notFound('Produto não encontrado');
    }

    // Apenas admin pode fazer upload (ou você pode remover isso se qualquer usuário autenticado pode)
    if (userRole !== 'admin') {
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
