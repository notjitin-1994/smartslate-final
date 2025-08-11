import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  company: z.string().optional(),
  email: z.string().email().optional(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;



