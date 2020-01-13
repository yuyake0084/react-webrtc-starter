import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

// actions
import * as connectionsAction from '@client/actions/connections'

// selectors
import { connectionsSelector } from '@client/selectors'

// components
import { Button, Input } from '@client/components/atoms'

const Container = styled.div``

const Form = styled.form``

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const CreateRoomForm: React.FC = () => {
  const [value, setValue] = React.useState('')
  const dispatch = useDispatch()
  const { stream } = useSelector(connectionsSelector)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget

    e.preventDefault()
    setValue(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(
      connectionsAction.getUserMedia({
        video: true,
        audio: true,
      }),
    )
  }

  React.useEffect(() => {
    if (stream) {
      dispatch(connectionsAction.connectSocket(value))
    }
  }, [stream])

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          name="roomId"
          type="text"
          value={value}
          placeholder="Please input room name"
          required
          autocomplete="none"
          onChange={handleChange}
        />
        <ButtonBox>
          <Button value="Create!" />
        </ButtonBox>
      </Form>
    </Container>
  )
}
