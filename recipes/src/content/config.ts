import { defineCollection, z } from 'astro:content';

const recetaCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      idMeal: z.string(),
      category: z.string(),
      area: z.string(),
      thumb: z.string().url(),
      ingredients: z.array(z.object({
        name: z.string(),
        measure: z.string()
      }))
    }),
});

export const collections = {
  recetas: recetaCollection,
};