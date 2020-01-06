import * as React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { connectionsSelector } from '@client/selectors'
import { Head, Main } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

export const Room: React.FC = () => {
  const { roomId } = useParams()
  const [isEnded, setIsEnded] = React.useState(false)
  const { stream, streams } = useSelector(connectionsSelector)

  React.useEffect(() => {
    if (!stream && !streams.length) {
      setIsEnded(true)
    }
  }, [stream, streams])

  return (
    <>
      {isEnded ? (
        <Redirect to="/" />
      ) : (
        <>
          <Head title={`${roomId}'s room`} />
          <Main>
            <SelfVideo />
          </Main>
        </>
      )}
    </>
  )
}
