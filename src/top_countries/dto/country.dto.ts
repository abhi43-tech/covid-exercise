
import { z } from 'zod';

export const countryDTO = z
  .object({
    top: z.number(),
  })
  .required();

export type countryDTO = z.infer<typeof countryDTO>;
