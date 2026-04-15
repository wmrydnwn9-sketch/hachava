import { z } from 'zod';

const urlOrEmpty = z.string().trim().optional().transform((v) => v ?? '');

export const orderSchema = z.object({
  customer_name: z.string().min(2, 'יש להזין שם מלא'),
  phone: z.string().min(8, 'יש להזין מספר טלפון תקין'),
  address: z.string().optional(),
  notes: z.string().optional(),
  order_type: z.enum(['delivery', 'pickup']),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, 'יש לבחור לפחות מוצר אחד'),
});

export const promotionSchema = z.object({
  title_he: z.string().min(2),
  description_he: z.string().min(2),
  image_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().default(true),
  starts_at: z.string().nullable().optional(),
  ends_at: z.string().nullable().optional(),
});

export const categorySchema = z.object({
  slug: z.string().min(2),
  name_he: z.string().min(2),
  sort_order: z.number().int().optional().default(0),
  image_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().optional().default(true),
});

export const productSchema = z.object({
  category_id: z.string().uuid(),
  name_he: z.string().min(2),
  description_he: z.string().optional().default(''),
  image_url: z.string().url().optional().or(z.literal('')),
  sort_order: z.number().int().optional().default(0),
  is_active: z.boolean().optional().default(true),
});

export const contentSchema = z.object({
  id: z.string().uuid(),
  business_name: z.string().min(2),
  slogan: z.string().min(2),
  phone: z.string().min(5),
  whatsapp_url: z.string().url(),
  email: z.string().email(),
  instagram_url: z.string().url(),
  address: z.string().min(2),
  map_embed_url: z.string().url(),
  hero_title: z.string().min(2),
  hero_subtitle: z.string().min(2),
  about_title: z.string().min(2),
  about_body: z.string().min(2),
  logo_url: z.string().optional().default(''),
  kosher_label: z.string().optional().default('כשר'),
});

export const orderStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'completed', 'canceled']),
});
