'use server';

import prisma from "@/utils/prisma/client";
import { todo, user_profile } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getTodosEmployee(profile: user_profile): Promise<string | todo[]> {
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

export async function getTodosManager(profile: user_profile): Promise<string | todo[]> {
  var result: todo[] = []
  try {
    result = await prisma.todo.findMany({
      where: {
        created_by: profile.user_id
      }
    })

  } catch (e) {
    return 'Unexpected error'
  }

  return result
}

export async function createTodo(profile: user_profile, name: string, description: string | undefined, deadline: Date | undefined, assignees: string[]): Promise<string | undefined> {
  try {
    await prisma.$transaction(async () => {
      var todo = await prisma.todo.create({
        data: {
          name: name,
          description: description,
          deadline: deadline,
          created_by: profile.user_id,
          assignees: undefined
        }
      })

      for (var i = 0; i < assignees.length; i++) {
        await prisma.todo_assignee_user.create({
          data: {
            todo_id: todo.id,
            user_id: assignees[i]
          }
        })
      }
    })
  } catch (e) {
    return 'Unexpected error'
  }

  revalidatePath("/", "layout")
  return undefined;
}

export async function getEmployees(organization: string): Promise<string | user_profile[]> {
  var result: user_profile[] = []
  try {
    await prisma.$transaction(async () => {
      result = await prisma.user_profile.findMany({
        where: {
          organization: organization,
          user_role: "employee"
        }
      })
    })
  } catch (e) {
    return 'Unexpected error'
  }

  return result
}

export async function deleteTodo(id: string): Promise<string | void> {
  try {
    await prisma.$transaction(async () => {
      await prisma.todo.delete({
        where: {
          id: id
        }
      })
    })
  } catch (e) {
    return 'Unexpected error'
  }

  return revalidatePath("/", "layout")
}