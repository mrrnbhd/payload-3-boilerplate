/*
 * Web automation using Puppeteer with Steel's cloud browsers.
 * https://github.com/steel-dev/steel-cookbook/tree/main/examples/steel-puppeteer-starter
 */

import dotenv from 'dotenv'
import puppeteer from 'puppeteer-core'
import Steel from 'steel-sdk'

dotenv.config()

const STEEL_API_KEY = process.env.STEEL_API_KEY || 'your-steel-api-key-here'
// Initialize Steel client with the API key from environment variables
const client = new Steel({
  steelAPIKey: STEEL_API_KEY,
  baseURL: 'https://steel-browser-production-8937.up.railway.app',
})

async function main() {
  console.log('🚀 Steel + Puppeteer TypeScript Starter')
  console.log('='.repeat(60))

  if (STEEL_API_KEY === 'your-steel-api-key-here') {
    console.warn(
      "⚠️  WARNING: Please replace 'your-steel-api-key-here' with your actual Steel API key"
    )
    console.warn('   Get your API key at: https://app.steel.dev/settings/api-keys')
    throw new Error('Set STEEL_API_KEY')
  }

  let session
  let browser

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
      slowMo: 5000,
    })

    console.log('Connected to browser via Puppeteer')

    const page = await browser.newPage()

    console.log('Navigating to Hacker News...')
    await page.goto('https://news.ycombinator.com', {
      waitUntil: 'networkidle0',
    })

    const stories = await page.evaluate(() => {
      const items = []
      // Get all story items
      const storyRows = document.querySelectorAll('tr.athing')

      // Loop through first 5 stories
      for (let i = 0; i < 5; i++) {
        const row = storyRows[i]
        const titleElement = row.querySelector('.titleline > a')
        const subtext = row.nextElementSibling
        const score = subtext?.querySelector('.score')

        items.push({
          title: titleElement?.textContent || '',
          link: titleElement?.getAttribute('href') || '',
          points: score?.textContent?.split(' ')[0] || '0',
        })
      }
      return items
    })

    // Print the results
    console.log('\nTop 5 Hacker News Stories:')
    stories.forEach((story, index) => {
      console.log(`\n${index + 1}. ${story.title}`)
      console.log(`   Link: ${story.link}`)
      console.log(`   Points: ${story.points}`)
    })

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

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Task execution failed:', error)
    process.exit(1)
  })
