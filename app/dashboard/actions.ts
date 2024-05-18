'use server';

import prisma from "@/utils/prisma/client";
import { todo, user_profile } from "@prisma/client";

export async function getTodos(profile: user_profile): Promise<string | todo[]> {
  var result: todo[] = []
  try {
    await prisma.$transaction(async () => {
      var connecting = await prisma.todo_assignee_user.findMany({
        where: {
          user_id: profile.user_id
        }
      })

      var connecting_ids = []
      for (var i = 0; i < connecting.length; i++) {
        connecting_ids.push(connecting[i].todo_id)
      }

      result = await prisma.todo.findMany({
        where: {
          id: {
            in: connecting_ids
          }
        }
      })
    })
  } catch (e) {
    return 'Unexpected error';
  }

  return result
}