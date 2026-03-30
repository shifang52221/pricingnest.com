import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.string().optional(),
  updated: z.string().optional(),
  author: z.string().optional(),
  reviewedBy: z.string().optional(),
  reviewed: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  guides: z.array(z.string()).optional(),
  glossary: z.array(z.string()).optional(),
});

const guideSourceKindSchema = z.enum(["internal-input", "supporting-page", "external-reference"]);

const guideSourceSchema = z.object({
  label: z.string(),
  kind: guideSourceKindSchema,
  href: z.string().optional(),
  note: z.string().optional(),
});

const guideSchema = baseSchema.extend({
  sources: z.array(guideSourceSchema).optional(),
});

const glossarySchema = baseSchema.extend({
  sources: z.array(z.string()).optional(),
});

export const collections = {
  guides: defineCollection({
    type: "content",
    schema: guideSchema,
  }),
  glossary: defineCollection({
    type: "content",
    schema: glossarySchema,
  }),
};
