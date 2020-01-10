import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// selectors
import { connectionsSelector } from '@client/selectors'

// components
import { Head, Main } from '@client/components/atoms'
import { CreateRoomForm } from '@client/components/organisms'

export const Home: React.FC = () => {
  const { roomId, stream } = useSelector(connectionsSelector)

  return (
    <>
      {roomId && stream ? (
        <Redirect to={`/${roomId}`} />
      ) : (
        <>
          <Head title="Home" />
          <Main>
            <CreateRoomForm />
          </Main>
        </>
      )}
    </>
  )
}
