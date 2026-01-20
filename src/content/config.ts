import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  updated: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  guides: z.array(z.string()).optional(),
  glossary: z.array(z.string()).optional(),
});

export const collections = {
  guides: defineCollection({
    type: "content",
    schema: baseSchema,
  }),
  glossary: defineCollection({
    type: "content",
    schema: baseSchema,
  }),
};

