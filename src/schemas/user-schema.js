import { z } from 'zod';

export const userSchema = z.object({
  first_name: z.string().trim().min(1, 'first_name é obrigatório'),
  last_name: z.string().trim().min(1, 'last_name é obrigatório'),
  email: z.string().trim().min(1, 'email é obrigatório').email('Email inválido'),
});
