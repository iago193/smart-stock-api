import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().min(1).optional(),
  sku: z.string().min(3).max(50).optional(),
  barcode: z.string().min(3).max(50).optional(),
  category_id: z.number().int().positive().nullable().optional(),
  brand: z.string().min(2).max(50).optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().default(0),

  image_url: z.string().url().nullable().optional(),

  is_active: z.boolean().default(true),
});

export const productEditSchema = z.object({
  id: z.number().int().positive(),

  name: z.string().min(3).max(150).optional(),
  description: z.string().min(1).optional().nullable(),

  sku: z.string().min(3).max(50).optional().nullable(),
  barcode: z.string().min(3).max(50).optional().nullable(),

  brand: z.string().min(2).max(50).optional().nullable(),

  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),

  category_id: z.number().int().positive().optional().nullable(),

  image_url: z.string().url().optional().nullable(),

  is_active: z.boolean().optional(),
});
