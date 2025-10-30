import type { PayloadRequest } from 'payload'
import type { Page } from 'puppeteer-core'
import type { Account } from '@/collections/orders/hooks/create-browser-job'

export async function handleParkWhiz(
  page: Page,
  account: Account,
  purchaseLink: string,
  req: PayloadRequest
) {
  await page.goto('https://www.parkwhiz.com/account/signup/', {
    waitUntil: 'networkidle0',
  })
  await page.locator('#firstName').fill(account.first)
  await page.locator('#lastName').fill(account.last)
  await page.locator('#email').fill(account.email)
  await page.locator('#password').fill(account.pass)
  await page.screenshot()
  await page.locator('div ::-p-text(SIGN UP)').click()
  await page.goto(purchaseLink, {
    waitUntil: 'networkidle0',
  })
  await page.locator('div ::-p-text(BOOK NOW)').click()
}
