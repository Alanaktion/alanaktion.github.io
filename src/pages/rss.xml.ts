import rss from "@astrojs/rss";
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  return rss({
    title: "Alan Hardman",
    description: 'Discover a diverse range of software engineering projects from Alan’s portfolio. Explore open-source contributions & see how he applies adaptability and collaboration to solve complex challenges.',
    site: context.site,
    items: articles.map(({ id, data }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/article/${id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
