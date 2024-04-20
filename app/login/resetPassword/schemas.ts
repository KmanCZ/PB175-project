import { z } from 'zod';

export const resetEmailSchema = z.object({
  email: z.string().email(),
});

export type resetEmailType = z.infer<typeof resetEmailSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
