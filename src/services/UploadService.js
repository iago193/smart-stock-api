import ApiError from '../errors/ApiError.js';
import cloudinary from '../lib/cloudinary.js';
import { prisma } from '../config/prismaClient.js';

class UploadService {
  async uploadUserAvatar(file, currentUserId) {
    const id = Number(currentUserId);

    if (!file) {
      throw ApiError.badRequest('Arquivo de imagem não enviado.');
    }

    if (Number.isNaN(id) || id <= 0) {
      throw ApiError.badRequest('ID do usuário inválido.');
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!user) {
      throw ApiError.notFound('Usuário não encontrado.');
    }

    if (user.images.length > 0) {
      await Promise.all(user.images.map(img => cloudinary.uploader.destroy(img.public_id)));

      await prisma.userImage.deleteMany({
        where: { user_id: id },
      });
    }

    let uploadResult;

    try {
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'users' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(file.buffer);
      });
    } catch {
      throw ApiError.internal('Erro ao enviar imagem para o Cloudinary.');
    }

    // 💾 Cria nova imagem relacionada ao usuário
    const createdImage = await prisma.userImage.create({
      data: {
        user_id: id,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });

    return createdImage;
  }
}

export default new UploadService();
