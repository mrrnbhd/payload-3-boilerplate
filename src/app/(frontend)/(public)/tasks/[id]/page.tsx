import { notFound } from 'next/navigation'

import { DataTable } from '@/components/data-table'
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
import { Progress } from '@/components/ui/progress'
import { RainbowButton } from '@/components/ui/rainbow-button'

import { RefreshRouteOnSave } from '@/hooks/refresh-route-on-save'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { Task } from '@/payload-types'

interface TaskParams {
  params: Promise<{
    id?: string
  }>
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

  return (
    <div className="my-9 mx-6">
      <RefreshRouteOnSave />
      <div className="flex justify-between mx-6 gap-5">
        <div>
          <Button disabled variant={'outline'} className="mr-6">
            Run Automations
          </Button>
          <Button disabled variant={'outline'}>
            View Screen Captures
          </Button>
        </div>
        <div>
          <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full p-2 px-3">
            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2 b-2" /> Pending Order Link
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
      </div>
      <div className="flex w-full">
        <div className="mx-6 my-9 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center w-full">
                  <h1>Task 1/7</h1>
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button variant="outline" size={'sm'}>
                          View All
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-h-[85%] sm:max-w-[90%] sm:h-[85%] sm:w-[90%] overflow-scroll">
                        <DialogHeader>
                          <DialogTitle>All Tasks</DialogTitle>
                          <DialogDescription>
                            View all pending tasks assigned to you.
                          </DialogDescription>
                        </DialogHeader>
                        <DataTable />
                      </DialogContent>
                    </form>
                  </Dialog>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={33} className="[&>*]:bg-green-700 mt-1 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="mx-6 my-9 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <h1>Step 1/3</h1>

                  <Button variant={'outline'} size={'sm'}>
                    Next Step
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {' '}
              <Progress value={33} className="[&>*]:bg-green-700 mt-1 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="my-9 mx-6">
        <CardHeader>
          <CardTitle>Step 1</CardTitle>
          <CardDescription>Link Incomplete Order Document</CardDescription>
        </CardHeader>
        <CardContent>Use the panel on the left to select an order document to process.</CardContent>
        <CardFooter className="flex justify-between">
          <RainbowButton variant={'outline'}>Waiting...</RainbowButton>
        </CardFooter>
      </Card>
      <Card className="my-9 mx-6">
        <CardHeader>
          <CardTitle>Step 2</CardTitle>
          <CardDescription>Get Parking Pass Purchase Price</CardDescription>
        </CardHeader>
        <CardContent>
          Get the purchase price of the parking pass from the vendor portal.
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={'outline'}>Pending</Button>
        </CardFooter>
      </Card>
      <Card className="my-9 mx-6">
        <CardHeader>
          <CardTitle>Step 3</CardTitle>
          <CardDescription>Upload Parking Pass Page as PDF</CardDescription>
        </CardHeader>
        <CardContent>Download the parking pass PDF from the web page.</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={'outline'}>Pending</Button>
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
