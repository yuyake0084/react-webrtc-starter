import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { Button, Card, Head, Main } from '@client/components/atoms'
import { media } from '@client/utils/theme/media'

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
            <Card>
              <Heading>Thank you!</Heading>
              <ButtonBox>
                <Button value="Top" onClick={handleClickButton} />
              </ButtonBox>
            </Card>
          </Main>
        </>
      )}
    </>
  )
}

export default Thanks
