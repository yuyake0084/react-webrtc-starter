import * as React from 'react'
import { Head } from '@client/components/atoms'
import { VideoWrapper } from '@client/components/organisms/VideoWrapper'

export const Home: React.FC = () => {
  return (
    <>
      <Head title="Home" />
      <VideoWrapper />
    </>
  )
}
