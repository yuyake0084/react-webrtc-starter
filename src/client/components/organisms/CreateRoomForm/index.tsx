import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

// actions
import * as connectionsAction from '@client/actions/connections'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    e.preventDefault()
    setValue(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(connectionsAction.connectSocket(value))
  }

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
