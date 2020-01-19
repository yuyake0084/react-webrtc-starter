import * as React from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// selectors
import { connectionsSelector } from '@client/selectors'

// components
import { Card, Error, Head, Main } from '@client/components/atoms'
import { CreateRoomForm } from '@client/components/organisms'

export const Home: React.FC = () => {
  const { isConnecting, error, roomId, stream } = useSelector(connectionsSelector)

  return (
    <>
      {isConnecting && roomId && stream ? (
        <Redirect to={`/room/${roomId}`} />
      ) : (
        <>
          <Head title="Home" />
          <Main>
            <Card width={600}>
              {error ? <Error message={error.message} /> : <CreateRoomForm />}
            </Card>
          </Main>
        </>
      )}
    </>
  )
}

export default Home
