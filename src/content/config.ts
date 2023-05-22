import { defineCollection, z } from 'astro:content';

const newsletterCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      cover: image(),
    }),
});

export const collections = {
  newsletter: newsletterCollection,
};
