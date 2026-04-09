import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    SANITY_STUDIO_DATASET: z.enum(['production', 'development']),
    SANITY_STUDIO_PROJECT_ID: z
      .string()
      .min(1, 'Sanity Project ID must have at least 1 character'),
    SANITY_READ_WRITE_TOKEN: z
      .string()
      .min(1, 'Sanity Token must have at least 1 character')
      .startsWith('sk'),
  },
  experimental__runtimeEnv: process.env,
});
