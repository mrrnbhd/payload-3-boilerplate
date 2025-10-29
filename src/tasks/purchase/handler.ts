import type { TaskHandler, TaskHandlerResult } from 'payload'
import Steel from 'steel-sdk'

const STEEL_API_KEY = process.env.STEEL_API_KEY
const STEEL_URL = process.env.STEEL_URL

const client: Steel = new Steel({
  steelAPIKey: STEEL_API_KEY,
  baseURL: `https://${STEEL_URL}`,
})

export const purchaseHandler: TaskHandler<'purchase-task'> = async ({ input }) => {
  const purchaseResult: TaskHandlerResult<'purchase-task'> = {
    output: {
      orderNotes: '',
      orderNumber: '',
      purchasePdf: '',
      purchasePrice: 2,
    },
    state: 'succeeded',
  }
  return purchaseResult
}
