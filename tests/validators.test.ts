import { describe, expect, it } from 'vitest';
import { CreateCourseSchema } from '@/lib/validators/courses';
import { CreateModuleSchema, ReorderModulesSchema } from '@/lib/validators/modules';
import { CreateLessonSchema, LessonTypeEnum, ReorderLessonsSchema } from '@/lib/validators/lessons';

describe('Zod validators', () => {
  it('validates CreateCourse', () => {
    const data = { slug: 'demo', title: 'Demo' };
    expect(() => CreateCourseSchema.parse(data)).not.toThrow();
  });

  it('validates CreateModule', () => {
    expect(() => CreateModuleSchema.parse({ courseId: 'c1', title: 'Intro' })).not.toThrow();
  });

  it('validates lesson creation', () => {
    expect(() =>
      CreateLessonSchema.parse({ moduleId: 'm1', title: 'L1', type: LessonTypeEnum.enum.TEXT })
    ).not.toThrow();
  });

  it('validates reorder payloads', () => {
    expect(() => ReorderModulesSchema.parse({ moduleIdsInOrder: ['a', 'b'] })).not.toThrow();
    expect(() => ReorderLessonsSchema.parse({ moduleId: 'm1', lessonIdsInOrder: ['x', 'y'] })).not.toThrow();
  });
});



