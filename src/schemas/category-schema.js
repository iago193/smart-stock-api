import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'nome é obrigatório'),
  description: z.string().trim().min(1, 'descrição é obrigatório'),
});
