import type { TaskHandler, TaskHandlerResult } from 'payload'
import puppeteer from 'puppeteer-core'
import Steel from 'steel-sdk'
import { names, uniqueNamesGenerator } from 'unique-names-generator'
import type { VendorHostName } from './vendors'

export const purchaseHandler: TaskHandler<'purchase-task'> = async ({ input, req }) => {
  const {
    orderNumber,
    purchaseLink,
    location,
    projectedCost,
    email,
    password,
    cardNumber,
    cardExpirationDate,
    cardCvcNumber,
  } = input

  const hostname = new URL(purchaseLink).hostname as VendorHostName

  const accountName = uniqueNamesGenerator({ dictionaries: [names], length: 2 })
  const client = new Steel({
    steelAPIKey: process.env.STEEL_API_KEY,
  })

  try {
    const session = await client.sessions.create()
    console.log('Session created:', session.id)
    console.log(`View live session at: ${session.sessionViewerUrl}`)

    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://ticketer-browser.up.railway.app?apiKey=${process.env.STEEL_API_KEY}&sessionId=${session.id}`,
    })

    const page = await browser.newPage()
    console.log(`Running purchase automation for ${hostname}`)

    switch (hostname) {
      case 'parkwhiz.com':
        await page.goto('https://www.parkwhiz.com/account/signup/', {
          waitUntil: 'networkidle0',
        })
        await page.locator('#firstName').fill(accountName[0])
        await page.locator('#lastName').fill(accountName[1])
        await page.locator('#email').fill(email)
        await page.locator('#password').fill(password)
        await page.screenshot()
        await page.locator('div ::-p-text(SIGN UP)').click()
        await page.goto(purchaseLink, {
          waitUntil: 'networkidle0',
        })
        await page.locator('div ::-p-text(BOOK NOW)').click()
        break
      case 'spothero.com':
        break
      case 'app.parkmobile.io':
        break
      case 'space.aceparking.com':
        break
    }

    await client.sessions.release(session.id)
    console.log('Session released')

    const purchaseResult: TaskHandlerResult<'purchase-task'> = {
      output: {},
      state: 'succeeded',
    }
    return purchaseResult
  } catch (error) {
    const purchaseResult: TaskHandlerResult<'purchase-task'> = {
      state: 'failed',
    }
    console.log(error)
    return purchaseResult
  }
}
