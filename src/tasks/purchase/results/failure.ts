import type {
  TaskCallbackArgs,
  TaskCallbackFn,
} from 'node_modules/payload/dist/queues/config/types/taskTypes'

export const purchaseFailure: TaskCallbackFn = async (
  args: Pick<TaskCallbackArgs, 'req'>
): Promise<void> => {
  args.req.payload.update({
    overrideAccess: true,
    collection: 'orders',
    limit: 1,
    where: {
      fulfillmentStatus: {
        equals: 'Running',
      },
    },
    data: {
      fulfillmentStatus: 'Error',
    },
  })
}
