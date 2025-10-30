import type { TaskConfig } from 'payload'
import { fullfillmentTask } from './fulfillment/task'
import { purchaseTask } from './purchase'

export const taskConfigs: TaskConfig[] = [purchaseTask, fullfillmentTask]
