import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    position: z.string(),
    company: z.string(),
    start: z.string(),
    end: z.string().optional(),
  })
});

export const collections = {
  experience,
};