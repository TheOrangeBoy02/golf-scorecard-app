// src/lib/user-utils.ts
import { auth } from '@clerk/nextjs'
import prisma from './prisma'

export async function getOrCreateUser() {
  const { userId } = auth()
  if (!userId) throw new Error('Not authenticated')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    // If user doesn't exist in our database, create them
    const response = await fetch(
      `https://api.clerk.dev/v1/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    )

    const clerkUser = await response.json()
    
    return await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.email_addresses[0].email_address,
        name: `${clerkUser.first_name} ${clerkUser.last_name}`.trim(),
      },
    })
  }

  return user
}