import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const countries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/countries' }),
  schema: z.object({
    country: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    timezones: z.array(z.string()),
    utcOffsets: z.array(z.string()),
    hasDST: z.boolean(),
    capital: z.string(),
    continent: z.string(),
    lastUpdated: z.string(),
  }),
});

const timezones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timezones' }),
  schema: z.object({
    timezone: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    iana: z.array(z.string()),
    utcOffset: z.string(),
    dstVariant: z.string().optional(),
    dstOffset: z.string().optional(),
    countries: z.array(z.string()),
    lastUpdated: z.string(),
  }),
});

export const collections = { countries, timezones };
