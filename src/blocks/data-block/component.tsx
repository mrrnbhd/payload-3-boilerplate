import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import type { DataBlock as DataBlockProps } from '@/payload-types'

type Props = DataBlockProps & HTMLAttributes<HTMLSpanElement>

/**
 * A simple block that displays a legal disclaimer upto the current year.
 */
export const DataBlock: React.FC<Props> = ({}: Props) => {
  return <></>
}
