import type { PayloadRequest } from 'payload'
import type { Page } from 'puppeteer-core'
import type { Account } from '@/collections/orders/hooks/create-browser-job'

export async function handleAceParking(
  page: Page,
  account: Account,
  purchaseLink: string,
  req: PayloadRequest
) {
  req.payload.logger.info('ACEParking automation not yet implemented.')
}
