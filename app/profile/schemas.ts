import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type changePasswordType = z.infer<typeof changePasswordSchema>;

export const editProfileSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
});

export type editProfileType = z.infer<typeof editProfileSchema>;
