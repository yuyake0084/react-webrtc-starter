import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as connectionsAction from '@client/actions/connections'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: 0 0 12px 12px;
  background-color: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  z-index: 10;
`

const Circle = styled.button`
  display: block;
  padding: 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  outline: none;
  transition: all 0.3s;

  ${({ color }: { color: string }) => `
    background-color: ${color};
  
    &:hover {
      color: ${color};
      background-color: #fff;
    }
  `}
`

export const VideoMenu: React.FC = () => {
  const dispatch = useDispatch()
  const handleClickExit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    dispatch(connectionsAction.exitRoom())
  }

  return (
    <Container>
      <Circle color="#ff6865" onClick={handleClickExit}>
        <FontAwesomeIcon icon="phone-slash" />
      </Circle>
    </Container>
  )
}
