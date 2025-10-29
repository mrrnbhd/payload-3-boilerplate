import type { TaskHandler, TaskHandlerResult } from 'payload'

export const fulfillmentHandler: TaskHandler<'fulfillment-task'> = async ({ input }) => {
  const pdf = input.purchasePdf
  const price = input.purchasePrice
  const notes = input.orderNotes

  const fulfillmentResult: TaskHandlerResult<'fulfillment-task'> = {
    output: {
      orderStatus: 'Fulfilled',
    },
    state: 'succeeded',
  }
  return fulfillmentResult
}
