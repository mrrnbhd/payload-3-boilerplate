import type { PayloadRequest } from 'payload'
import type { Page } from 'puppeteer-core'
import type { Account } from '@/collections/orders/hooks/create-browser-job'

export async function handleParkMobile(
  page: Page,
  account: Account,
  purchaseLink: string,
  req: PayloadRequest
) {
  req.payload.logger.info('ParkMobile automation not yet implemented.')
}
