import { z } from 'zod';

export const userSchema = z.object({
  first_name: z.string().trim().min(1, 'first_name é obrigatório'),
  last_name: z.string().trim().min(1, 'last_name é obrigatório'),
  email: z.string().trim().min(1, 'email é obrigatório').email('Email inválido'),

  password: z.string().trim().min(6, 'Senha deve ter no mínimo 6 caracteres'),

  role_id: z
    .number({
      required_error: 'role_id é obrigatório',
      invalid_type_error: 'role_id deve ser um número',
    })
    .int()
    .positive(),
});
