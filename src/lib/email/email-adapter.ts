import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

export function getEmailAdapter() {
  const isLocal = process.env.NEXT_PUBLIC_SERVER_URL?.includes('localhost')

  if (isLocal) {
    return nodemailerAdapter({
      defaultFromAddress: 'contact@ticketer.com',
      defaultFromName: 'Ticketer',
      transportOptions: {
        host: 'localhost',
        port: 2500,
        secure: false,
        auth: {
          user: 'test',
          pass: 'test',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    })
  }

  return resendAdapter({
    defaultFromAddress: 'mail@recursive.blue',
    defaultFromName: 'Ticketer',
    apiKey: process.env.RESEND_API_KEY,
  })
}
