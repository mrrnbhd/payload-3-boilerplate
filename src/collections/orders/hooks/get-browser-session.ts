import type { CollectionBeforeChangeHook } from 'payload'
import Steel from 'steel-sdk'

const STEEL_API_KEY = process.env.STEEL_API_KEY ?? 'No Steel Browser API key found'

const client: Steel = new Steel({
  steelAPIKey: STEEL_API_KEY,
  baseURL: `https://${process.env.STEEL_URL}`,
})
//
export const getBrowserSession: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if (operation === 'create' && !data.sessionURL) {
    try {
      console.log('\nCreating Steel session...')

      const session = await client.sessions.create({})

      console.log(
        `\x1b[1;93mSteel Session created!\x1b[0m\n` +
          `View session at \x1b[1;37m${session.sessionViewerUrl}\x1b[0m`
      )
      data.sessionURL = session.sessionViewerUrl
    } catch (error) {
      console.error('An error occurred creating Steel session:', error)
    }
  }
  return data
}
