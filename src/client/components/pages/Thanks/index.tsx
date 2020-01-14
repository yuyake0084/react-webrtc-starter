import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Button, Head, Main } from '@client/components/atoms'

const Container = styled.div`
  width: 500px;
  padding: 100px;
  background-color: #fff;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Heading = styled.h2`
  margin-bottom: 30px;
  color: #aaa;
  font-size: 30px;
  text-align: center;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`

export const Thanks: React.FC = () => {
  const dispatch = useDispatch()
  const { isEnded, stream } = useSelector(connectionsSelector)
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    stream?.getTracks().forEach(track => track.stop())
    dispatch(connectionsAction.resetState())
  }

  return (
    <>
      {!isEnded ? (
        <Redirect to="/" />
      ) : (
        <>
          <Head title="Thank you!" />
          <Main>
            <Container>
              <Heading>Thank you!</Heading>
              <ButtonBox>
                <Button value="Top" onClick={handleClickButton} />
              </ButtonBox>
            </Container>
          </Main>
        </>
      )}
    </>
  )
}

export default Thanks
