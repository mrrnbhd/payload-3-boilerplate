import type { CollectionAfterChangeHook } from 'payload'
import puppeteer from 'puppeteer-core'
import Steel from 'steel-sdk'

export const getBrowserSession: CollectionAfterChangeHook = async ({ data }) => {
  if (
    !data.sessionURL &&
    !['Purchased', 'Fulfilled', 'Error'].includes(data.status) &&
    data.orderNumber
  ) {
    const STEEL_API_KEY = process.env.STEEL_API_KEY
    const STEEL_URL = process.env.STEEL_URL

    if (!STEEL_API_KEY || !STEEL_URL) {
      console.error(
        'STEEL_API_KEY or STEEL_URL env variables are missing. Skipping session creation.'
      )
      return data
    }

    try {
      console.log(`\nCreating Steel session for Order: ${data.orderNumber}...`)

      const client: Steel = new Steel({
        steelAPIKey: STEEL_API_KEY,
        baseURL: `https://${STEEL_URL}`,
      })

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
        `\x1b[1;93mSteel Session created for Order: ${data.orderNumber}!\x1b[0m\n` +
          `View session at \x1b[1;37m${session.sessionViewerUrl}\x1b[0m`
      )

      if (data.purchaseLink) {
        const browser = await puppeteer.connect({
          browserWSEndpoint: `wss://connect.steel.dev?apiKey=${process.env.STEEL_API_KEY}&sessionId=${session.id}`,
        })

        const page = await browser.newPage()
        await page.goto(data.purchaseLink)
      }

      data.sessionURL = session.sessionViewerUrl
    } catch (error) {
      console.error(
        `An error occurred creating Steel session for Order ${data.orderNumber}:`,
        error
      )
    }
  }

  return data
}
