import * as React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Label = styled.label`
  width: 100%;
  max-width: 200px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  background-color: #5cd7da;
  box-sizing: border-box;

  @media screen and (max-width: 375px) {
    display: none;
  }
`

const Input = styled.input`
  padding: 14px 20px;
  font-size: 13px;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50px;
  height: 44px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  background-color: #6ed696;
`

export const RoomLinkInput: React.FC = () => {
  const inputRef = React.createRef<HTMLInputElement>()
  const handleClickInput = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault()
    e.currentTarget.select()
  }
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const input = inputRef.current

    e.preventDefault()

    if (input) {
      input.select()
      document.execCommand('copy')
    }
  }

  return (
    <Container>
      <Label>Share the room link</Label>
      <Input
        ref={inputRef}
        value={process.env.IS_BROWSER ? location.href : ''}
        type="text"
        onClick={handleClickInput}
        onChange={() => {}}
      />
      <Button onClick={handleClickButton}>
        <FontAwesomeIcon icon="link" />
      </Button>
    </Container>
  )
}
