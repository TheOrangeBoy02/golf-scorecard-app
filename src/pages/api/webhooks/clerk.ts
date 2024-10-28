// src/pages/api/webhooks/clerk.ts
import { WebhookEvent } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const evt = req.body as WebhookEvent

    switch (evt.type) {
      case 'user.created':
        await prisma.user.create({
          data: {
            clerkId: evt.data.id,
            email: evt.data.email_addresses[0]?.email_address ?? '',
            name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim(),
          },
        })
        break

      case 'user.updated':
        await prisma.user.update({
          where: { clerkId: evt.data.id },
          data: {
            email: evt.data.email_addresses[0]?.email_address,
            name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim(),
          },
        })
        break

      case 'user.deleted':
        await prisma.user.delete({
          where: { clerkId: evt.data.id },
        })
        break
    }

    res.status(200).json({ message: 'Webhook processed' })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(400).json({ message: 'Webhook error' })
  }
}