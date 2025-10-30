import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'
import { render } from '@react-email/render'
import parse from 'html-react-parser'
import { TicketerTemplate } from './email-template'

const beforeEmail: BeforeEmail = (emailsToSend, _beforeChangeParams) => {
  return Promise.all(
    emailsToSend.map(async (email) => ({
      ...email,
      html: await render(<TicketerTemplate heading={email.subject} content={parse(email.html)} />),
    }))
  )
}

export default beforeEmail
