import type { TaskConfig } from 'payload'
import { purchaseHandler as handler } from './handlers'
import { purchaseFailure as onFail } from './handlers/failure'
import { purchaseSuccess as onSuccess } from './handlers/success'
import { purchaseInputSchema as inputSchema } from './schemas/input'
import { purchaseOutputSchema as outputSchema } from './schemas/output'

export const purchaseTask: TaskConfig<'purchase-task'> = {
  slug: 'purchase-task',
  inputSchema,
  outputSchema,
  handler,
  onSuccess,
  onFail,
}
