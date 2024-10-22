// src/pages/api/webhooks/clerk.ts
import { WebhookEvent } from "@clerk/nextjs/server"
import { NextApiRequest, NextApiResponse } from "next"
// import { Webhook } from 'svix'
import prisma from "../../../lib/prisma"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const headerPayload = req.headers;
    const svixId = headerPayload['svix-id'] as string;
    const svixTimestamp = headerPayload['svix-timestamp'] as string;
    const svixSignature = headerPayload['svix-signature'] as string;

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({ message: 'Missing svix headers' })
    }

    const payload = req.body
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

export const config = {
  api: {
    bodyParser: false,
  },
}