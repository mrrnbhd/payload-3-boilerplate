import type {
  TaskCallbackArgs,
  TaskCallbackFn,
} from 'node_modules/payload/dist/queues/config/types/taskTypes'

export const purchaseSuccess: TaskCallbackFn = async (
  args: Pick<TaskCallbackArgs, 'req'>
): Promise<void> => {
  await args.req.payload.update({
    collection: 'orders',
    limit: 1,
    where: {
      fulfillmentStatus: {
        equals: 'Running',
      },
    },
    data: {
      fulfillmentStatus: 'Purchased',
    },
  })
}
