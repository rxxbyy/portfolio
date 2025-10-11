import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';


const experience = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/data/experience' }),
    schema: z.object({
        position: z.string(),
        company: z.string(),
        start: z.string(),
        end: z.string()
    }),
});

// Expose this content collection using
export const collections = { experience };