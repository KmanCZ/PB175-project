import { z } from "zod"

export const createTodoSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  deadline: z.date().optional(),
  assignees: z.array(z.string().uuid()).nonempty({message: "At least one assignee is required"}),
})

export type createTodoType = z.infer<typeof createTodoSchema>;