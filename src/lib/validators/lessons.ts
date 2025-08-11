import { z } from 'zod';

export const LessonTypeEnum = z.enum(['VIDEO', 'TEXT', 'QUIZ', 'FILE', 'EMBED']);

export const CreateLessonSchema = z.object({
  moduleId: z.string().min(1),
  title: z.string().min(1),
  type: LessonTypeEnum,
  metadata: z.record(z.any()).optional(),
  textContent: z.string().optional(),
  videoUrl: z.string().url().optional(),
  fileUrl: z.string().url().optional(),
  quizSpec: z.any().optional(),
});

export const UpdateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  type: LessonTypeEnum.optional(),
  metadata: z.record(z.any()).optional(),
  textContent: z.string().nullable().optional(),
  videoUrl: z.string().url().nullable().optional(),
  fileUrl: z.string().url().nullable().optional(),
  quizSpec: z.any().nullable().optional(),
});

export const ReorderLessonsSchema = z.object({
  moduleId: z.string().min(1),
  lessonIdsInOrder: z.array(z.string().min(1)).min(1),
});

export type CreateLessonInput = z.infer<typeof CreateLessonSchema>;
export type UpdateLessonInput = z.infer<typeof UpdateLessonSchema>;
export type ReorderLessonsInput = z.infer<typeof ReorderLessonsSchema>;



