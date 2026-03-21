import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const articles = defineCollection({
  // Load Markdown files in the `content/articles/` directory.
  loader: glob({
    base: "./content/articles",
    pattern: "**/*.md",
    generateId: ({ entry, data }) => {
      const parts = entry.replace(/^\/|\/$/g, "").split("/")
      parts.pop() // Remove index.md suffix
      return `${parts.pop()}`
    },
  }),
  // Type-check frontmatter using a schema
  schema: () => z.object({
    title: z.string(),
    short_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date(),
    llm: z.string().optional(),
  }),
})

export const collections = { articles }
