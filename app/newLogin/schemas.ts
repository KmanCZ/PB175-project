import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type loginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordAgain: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: 'Passwords do not match',
    path: ['passwordAgain'],
  });

export type registerType = z.infer<typeof registerSchema>;
