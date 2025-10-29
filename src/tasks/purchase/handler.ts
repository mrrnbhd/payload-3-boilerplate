import type { TaskHandler } from 'payload'
import Steel from 'steel-sdk'

const STEEL_API_KEY = process.env.STEEL_API_KEY
const STEEL_URL = process.env.STEEL_URL

const client: Steel = new Steel({
  steelAPIKey: STEEL_API_KEY,
  baseURL: `https://${STEEL_URL}`,
})

export const purchaseHandler: TaskHandler<'purchase-task'> = async ({ input }) => {
  if (!STEEL_API_KEY || !STEEL_URL) {
    console.error(
      'STEEL_API_KEY or STEEL_URL env variables are missing. Skipping session creation.'
    )
    return input
  }

  try {
    console.log(`\nCreating Steel session at Order: ${input}...`)

    const session = await client.sessions.create({
      solveCaptcha: true,
      stealthConfig: {
        humanizeInteractions: true,
      },
      deviceConfig: {
        device: 'mobile',
      },
    })

    console.log(
      `\x1b[1;93mSteel Session created at Order: ${input}!\x1b[0m\n` +
        `View session at \x1b[1;37m${session.sessionViewerUrl}\x1b[0m`
    )
  } catch (error) {
    console.error(`An error occurred creating Steel session at Order ${input}:`, error)
  }
  return {
    output: {
      purchasePrice: 10,
      purchasePdf: '',
      orderStatus: 'Purchased',
      orderNotes: '',
    },
    state: 'succeeded',
  }
}
