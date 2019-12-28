import * as React from 'react'
import Helmet from 'react-helmet'

type Props = {
  title: string
  color?: string
}

export const Head: React.FC<Props> = ({ title, color = '#20aee5' }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="theme-color" content={color} />
  </Helmet>
)
