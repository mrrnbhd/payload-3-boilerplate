import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { sendAdapter } from '@rubixstudios/payload-usesend'

export function getEmailAdapter() {
  const isLocal = process.env.NEXT_PUBLIC_SERVER_URL?.includes('localhost')

  if (isLocal) {
    return nodemailerAdapter({
      defaultFromAddress: 'contact@ticketer.com',
      defaultFromName: 'Ticketer',
      transportOptions: {
        host: 'localhost',
        port: 2500,
        secure: false, // Inbucket doesn't use SSL in local dev
        auth: {
          user: 'test', // Inbucket doesn't require real auth
          pass: 'test',
        },
        // Disable TLS for local development
        tls: {
          rejectUnauthorized: false,
        },
      },
    })
  }

  // Use Resend for production
  return sendAdapter({
    apiKey: process.env.USESEND_API_KEY || '',
    useSendUrl: process.env.USESEND_URL || '',
    defaultFromName: 'Ticketer',
    defaultFromAddress: 'ticketer@email.com',
  })
}
