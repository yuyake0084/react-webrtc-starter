import * as React from 'react'
import Helmet from 'react-helmet'

type Props = {
  title: string
  color?: string
}

export const Head: React.FC<Props> = ({ title, color = '#20aee5' }) => (
  <Helmet titleTemplate="%s | React WebRTC Starter">
    <title>{title}</title>
    <meta name="theme-color" content={color} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@yuyake0084" />
    <meta property="og:url" content={process.env.DOMAIN} />
    <meta property="og:title" content="React WebRTC Starter" />
    <meta property="og:description" content={process.env.npm_package_description} />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/drw7v2tob/image/upload/v1579447888/react-webrtc-starter_gl8qjc.png"
    />
  </Helmet>
)
