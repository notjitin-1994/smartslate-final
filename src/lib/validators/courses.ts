import { z } from 'zod';

export const CreateCourseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

export const UpdateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  published: z.boolean().optional(),
});

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;



