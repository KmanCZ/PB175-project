import { z } from 'zod';

export const createProfileSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  organization: z.string().min(3).max(100),
  role: z.enum(['manager', 'employee']),
});

export type createProfileType = z.infer<typeof createProfileSchema>;
