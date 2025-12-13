import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

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
  }),
})

export const collections = { articles }
