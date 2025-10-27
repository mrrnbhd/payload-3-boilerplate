// ./hooks/create-browser-session.ts

import Steel from 'steel-sdk'

const STEEL_API_KEY = process.env.STEEL_API_KEY ?? 'No Steel Browser API key found'

const client: Steel = new Steel({
  steelAPIKey: STEEL_API_KEY,
  baseURL: process.env.STEEL_PRIVATE_URL,
})

export const createBrowserSession = async () => {
  let session: Steel.Session | null = null
  try {
    console.log('\nCreating Steel session...')

    session = await client.sessions.create({})

    console.log(
      `\x1b[1;93mSteel Session created!\x1b[0m\n` +
        `View session at \x1b[1;37m${session.sessionViewerUrl}\x1b[0m`
    )

    const sessionURL = session.sessionViewerUrl

    return sessionURL
  } catch (error) {
    console.error('An error occurred:', error)

    throw error
  }
}
