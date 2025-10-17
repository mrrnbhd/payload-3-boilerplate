import {
  Bot,
  ClipboardCheckIcon,
  EllipsisVertical,
  ListTodo,
  SquareArrowOutUpRight,
} from 'lucide-react'
import { notFound } from 'next/navigation'

import { StepsTable } from '@/components/steps-table'
import { TasksTable } from '@/components/tasks-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Slider } from '@/components/ui/slider'

import { cn } from '@/lib/utils'

import { RefreshRouteOnSave } from '@/hooks/refresh-route-on-save'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { Order, PayloadUpload, Pool, Profile, Proxy, Task, User } from '@/payload-types'

interface TaskParams {
  params: Promise<{
    id?: string
  }>
}

interface ParkingPass {
  vendor?: 'SpotHero' | 'ParkWhiz' | 'ACE Parking'
  linkedOrder?: string | Order
  purchaseURL?: string
  taskAssignee?: string | User
  taskProfile?: string | Profile
  taskProxy?: string | Proxy | Pool
  purchaseAmount?: number
  passPDF?: string | PayloadUpload
}

export default async function Tasks({ params: paramsPromise }: TaskParams) {
  const { id = 'index' } = await paramsPromise

  const payload = await getPayload({ config })

  const task = await payload.find({
    collection: 'tasks',
    draft: true,
    trash: true,
    depth: 3,
    limit: 1,
    where: {
      id: {
        equals: id,
      },
    },
  })

  const data = task?.docs?.[0] as null | Task

  if (data === null) {
    return notFound()
  }

  const parkingPass: ParkingPass = {
    vendor: data.ticketVendor ?? undefined,
    purchaseURL: '',
    taskAssignee: data.taskAssignee || undefined,
    taskProfile: data.taskProfile || undefined,
    taskProxy: data.taskProxy?.value || undefined,
    linkedOrder: data.linkedOrder || undefined,
    purchaseAmount: data.purchasePrice || undefined,
    passPDF: data.passPDF || undefined,
  }

  return (
    <div className="my-9 mx-6">
      <RefreshRouteOnSave />
      <div className="mx-6"></div>
      <div className="flex w-full">
        <div className="mx-6 my-9 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center w-full">
                  <div className="flex align-middle gap-3 items-center">
                    <div>
                      <ClipboardCheckIcon size={26} className="self-center align-middle" />
                    </div>
                    <div>
                      <h2>Task 1/7</h2>
                    </div>
                  </div>

                  <div className="flex align-middle justify-end">
                    <EllipsisVertical
                      className="self-center border-2 ml-5 rounded-md p-1 hover:bg-primary-foreground/80 hover:cursor-pointer"
                      size={26}
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Slider defaultValue={[16]} max={100} className={cn('bg-amber-500')} step={15} />

              <h2 className="mt-7">
                Get the purchase price of the parking pass from the vendor portal.
              </h2>
            </CardContent>
            <CardFooter className="flex justify-between gap-5">
              <RainbowButton variant={'outline'} size={'sm'} className="rounded-md">
                Run Automations
                <Bot />
              </RainbowButton>
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button variant="outline" size={'sm'}>
                      View All
                      <SquareArrowOutUpRight />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-h-[85%] sm:max-w-[90%] sm:h-[85%] sm:w-[90%] overflow-scroll">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="flex justify-between align-center">
                          <h3>All Tasks</h3>
                        </div>
                      </DialogTitle>
                      <DialogDescription>View all pending tasks assigned to you.</DialogDescription>
                    </DialogHeader>
                    <TasksTable />
                  </DialogContent>
                </form>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        <div className="mx-6 my-9 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center justify-items-center align-middle gap-3">
                    <ListTodo size={26} />
                    <h2>Step 1/3</h2>
                  </div>
                  <div className="flex align-middle justify-end">
                    <EllipsisVertical
                      className="self-center border-2 ml-5 rounded-md p-1 hover:bg-primary-foreground/80 hover:cursor-pointer"
                      size={26}
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Slider defaultValue={[34]} max={100} className={cn('bg-amber-500')} step={33} />
              <div className="mt-7">
                Get the purchase price of the parking pass from the vendor portal.
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-5">
              <RainbowButton variant={'outline'} size={'sm'} className="rounded-md">
                Run Automations
                <Bot />
              </RainbowButton>
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button variant="outline" size={'sm'}>
                      View All
                      <SquareArrowOutUpRight />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-h-[85%] sm:max-w-[90%] sm:h-[85%] sm:w-[90%] overflow-scroll">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="flex justify-between align-center">
                          <h3>Task Steps</h3>
                        </div>
                      </DialogTitle>
                      <DialogDescription>View all steps for the current task.</DialogDescription>
                    </DialogHeader>
                    <StepsTable />
                  </DialogContent>
                </form>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Card className="my-9 mx-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <h1>Step 1</h1>

              <div className="flex justify-end">
                <div>
                  <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full p-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 self-center" /> Pending
                  </Badge>
                  <Badge
                    hidden={true}
                    className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" /> Blocked
                  </Badge>
                  <Badge
                    hidden={true}
                    className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" /> Done
                  </Badge>
                </div>
                <div className="flex align-middle justify-end">
                  <EllipsisVertical
                    className="self-center border-2 ml-5 rounded-md p-1 hover:bg-primary-foreground/80 hover:cursor-pointer"
                    size={26}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
          <CardDescription>Get Parking Pass Purchase Price</CardDescription>
        </CardHeader>
        <CardContent>
          Get the purchase price of the parking pass from the vendor portal.
        </CardContent>
        <CardFooter className="flex justify-between gap-5">
          <RainbowButton variant={'outline'} size={'sm'} className="rounded-md">
            Run Automation
            <Bot />
          </RainbowButton>
          <Button variant={'outline'} size={'sm'}>
            Manual Purchase
            <SquareArrowOutUpRight />
          </Button>
        </CardFooter>
      </Card>
      <Card className="my-9 mx-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              Step 2
              <div className={'align-center justify-end items-center'}>
                <div className="flex justify-end">
                  <div>
                    <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full p-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500 self-center" /> Pending
                    </Badge>
                    <Badge
                      hidden={true}
                      className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2" /> Blocked
                    </Badge>
                    <Badge
                      hidden={true}
                      className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" /> Done
                    </Badge>
                  </div>
                  <div className="flex align-middle justify-end">
                    <EllipsisVertical
                      className="self-center border-2 ml-5 rounded-md p-1 hover:bg-primary-foreground/80 hover:cursor-pointer"
                      size={26}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
          <CardDescription>Upload Parking Pass Page as PDF</CardDescription>
        </CardHeader>
        <CardContent>Upload the parking pass PDF from the ticket vendor web page.</CardContent>
        <CardFooter className="flex justify-between gap-5">
          <RainbowButton variant={'outline'} size={'sm'} className="rounded-md">
            Run Automation
            <Bot />
          </RainbowButton>
          <Button variant={'outline'} size={'sm'}>
            Manual Download
            <SquareArrowOutUpRight />
          </Button>
        </CardFooter>
      </Card>
      <Card className="my-9 mx-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              Step 3
              <div className={'align-center justify-end items-center'}>
                <div className="flex justify-end">
                  <div>
                    <Badge
                      className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full p-2"
                      hidden={true}
                    >
                      <div className="h-2 w-2 rounded-full bg-amber-500 self-center" /> Pending
                    </Badge>
                    <Badge
                      className="bg-amber-600/10 dark:bg-gray-600/20 hover:bg-amber-600/10 text-gray-300 shadow-none rounded-full p-2"
                      hidden={false}
                    >
                      <div className="h-2 w-2 rounded-full bg-gray-300 self-center" /> Waiting
                    </Badge>
                    <Badge
                      hidden={true}
                      className="bg-gray-600/10 dark:bg-gray-600/20 hover:bg-gray-600/10 text-gray-200 shadow-none rounded-full"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" /> Done
                    </Badge>
                  </div>
                  <div className="flex align-middle justify-end">
                    <EllipsisVertical
                      className="self-center border-2 ml-5 rounded-md p-1 hover:bg-primary-foreground/80 hover:cursor-pointer"
                      size={26}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
          <CardDescription>Complete Purchase Order in TradeDesk</CardDescription>
        </CardHeader>
        <CardContent>
          Send the purchase order for processing in TradeDesk to complete the task.
        </CardContent>
        <CardFooter className="flex justify-between gap-5">
          <RainbowButton disabled variant={'outline'} size={'sm'} className="rounded-md">
            Run Automation
            <Bot />
          </RainbowButton>
          <Button disabled variant={'outline'} size={'sm'}>
            Manual Fulfillment
            <SquareArrowOutUpRight />
          </Button>{' '}
        </CardFooter>
      </Card>
    </div>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const tasksRes = await payload.find({
    collection: 'tasks',
    depth: 0,
    draft: true,
    limit: 100,
  })

  const tasks = tasksRes?.docs

  return tasks.map(({ id }) =>
    id !== 'index'
      ? {
          id,
        }
      : {}
  )
}
