import { z } from "zod"

export const createTodoSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  deadline: z.date().optional(),
  assignees: z.object({
    user_id: z.string()
  })
})

export type createTodoType = z.infer<typeof createTodoSchema>;