import * as React from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// selectors
import { connectionsSelector } from '@client/selectors'

// components
import { Error, Head, Main } from '@client/components/atoms'
import { CreateRoomForm } from '@client/components/organisms'

const Box = styled.div`
  width: 500px;
  padding: 50px 100px;
  background-color: #fff;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

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
            <Box>{error ? <Error message={error.message} /> : <CreateRoomForm />}</Box>
          </Main>
        </>
      )}
    </>
  )
}

export default Home
