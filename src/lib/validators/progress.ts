import { z } from 'zod';

export const EnrollSchema = z.object({
  courseId: z.string().min(1),
});

export const CompleteLessonSchema = z.object({
  lessonId: z.string().min(1),
});

export type EnrollInput = z.infer<typeof EnrollSchema>;
export type CompleteLessonInput = z.infer<typeof CompleteLessonSchema>;



