import { z } from 'zod';

export const CreateModuleSchema = z.object({
  courseId: z.string().cuid().or(z.string().min(1)),
  title: z.string().min(1),
  description: z.string().optional(),
});

export const UpdateModuleSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const ReorderModulesSchema = z.object({
  moduleIdsInOrder: z.array(z.string().min(1)).min(1),
});

export type CreateModuleInput = z.infer<typeof CreateModuleSchema>;
export type UpdateModuleInput = z.infer<typeof UpdateModuleSchema>;
export type ReorderModulesInput = z.infer<typeof ReorderModulesSchema>;



