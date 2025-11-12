import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2).max(150),
  description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  category_id: z.number().int().nullable(),
  brand: z.string().optional(),
  price: z.number().nonnegative(),
  discount_price: z.number().nullable().optional(),
  stock: z.number().int().nonnegative(),
  weight: z.number().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  length: z.number().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  is_active: z.boolean().default(true),
});
