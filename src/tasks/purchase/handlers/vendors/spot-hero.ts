import type { PayloadRequest } from 'payload'
import type { Page } from 'puppeteer-core'
import type { Account } from '@/collections/orders/hooks/create-browser-job'

export async function handleSpotHero(
  page: Page,
  account: Account,
  purchaseLink: string,
  req: PayloadRequest
) {
  req.payload.logger.info('SpotHero automation not yet implemented.')
}
