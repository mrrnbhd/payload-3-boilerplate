// import parse from "html-react-parser";

import type { ReactNode } from 'react'

import type { LayoutClassNames } from './components/layout'
import Layout from './components/layout'

export interface TicketerTemplateProps {
  heading: string
  subtitle?: string
  content: ReactNode
  classNames?: LayoutClassNames
  action?: string
  url?: string
  baseUrl?: string
  preview?: string
}

export const TicketerTemplate = ({
  heading,
  subtitle = undefined,
  content = '',
  classNames,
  action,
  url,
  baseUrl,
  preview,
}: TicketerTemplateProps) => {
  return (
    <Layout
      heading={heading}
      subTitle={subtitle}
      preview={preview}
      classNames={classNames}
      action={action}
      url={url}
      baseUrl={baseUrl}
    >
      {content}
    </Layout>
  )
}

export default TicketerTemplate
