import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(120).optional(),
  company: z.string().max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(40).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(120).optional(),
  website: z.string().url().optional().or(z.literal('')).optional(),
  twitter: z.string().max(120).optional(),
  linkedin: z.string().max(120).optional(),
  github: z.string().max(120).optional(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;



