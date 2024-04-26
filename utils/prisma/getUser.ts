import { cache } from 'react'
import prisma from './client'

export const getUser = cache(async (id: string) => {
    try {
        const user = await prisma.user_profile.findUnique({
            where: {
                user_id: id
            }
        })
        return user
    } catch (error) {
        return null
    }
})