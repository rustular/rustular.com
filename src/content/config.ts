import { defineCollection, z } from 'astro:content';

const newsletterCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  newsletter: newsletterCollection,
};
