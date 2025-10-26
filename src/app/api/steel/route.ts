import dotenv from 'dotenv'
import puppeteer, { type Browser } from 'puppeteer-core'
import Steel from 'steel-sdk'

dotenv.config()

const STEEL_API_KEY = process.env.STEEL_API_KEY || 'your-steel-api-key-here'
const client: Steel = new Steel({
  steelAPIKey: STEEL_API_KEY,
  baseURL: 'https://steel-browser-production-8937.up.railway.app',
})

async function browser() {
  console.log('🚀 Steel + Puppeteer TypeScript Starter')
  console.log('='.repeat(60))

  if (STEEL_API_KEY === 'your-steel-api-key-here') {
    console.warn(
      "⚠️  WARNING: Please replace 'your-steel-api-key-here' with your actual Steel API key"
    )
    console.warn('   Get your API key at: https://app.steel.dev/settings/api-keys')
    throw new Error('Set STEEL_API_KEY')
  }

  let session: Steel.Session | null = null
  let browser: Browser | null = null

  try {
    console.log('\nCreating Steel session...')

    // Create a new Steel session with all available options
    session = await client.sessions.create({})

    console.log(
      `\x1b[1;93mSteel Session created!\x1b[0m\n` +
        `View session at \x1b[1;37m${session.sessionViewerUrl}\x1b[0m`
    )

    // Connect Puppeteer to the Steel session
    browser = await puppeteer.connect({
      browserWSEndpoint: `${session.websocketUrl}&apiKey=${STEEL_API_KEY}`,
      //   slowMo: 5000,
    })
    const purchaseUrl = 'https://www.parkwhiz.com/p/brooklyn-parking/12-harrison-pl'
    console.log('Connected to browser via Puppeteer')

    const page = await browser.newPage()

    // Navigate to ParkWhiz website
    console.log('Navigating to https://www.parkwhiz.com/p/brooklyn-parking/12-harrison-pl')
    await page.goto(`${purchaseUrl}`, { waitUntil: 'networkidle2' })

    const screenshotBuffer = await page.screenshot()
    console.log('Screenshot taken of search results')
    // Save the screenshot to a file
    const fs = await import('fs')
    fs.writeFileSync('parkwhiz-search-results.png', screenshotBuffer)
    console.log('Screenshot saved as parkwhiz-search-results.png')

    // ============================================================
    // End of Automations
    // ============================================================
  } catch (error) {
    console.error('An error occurred:', error)
    throw error
  } finally {
    if (session) {
      console.log('Releasing session...')
      await client.sessions.release(session.id)
      console.log('Session released')
    }

    console.log('Done!')
  }
}

browser()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Task execution failed:', error)
    process.exit(1)
  })
