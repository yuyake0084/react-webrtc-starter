import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as connectionsAction from '@client/actions/connections'
import { HeaderMenu } from '@client/components/molecules'

const HeaderComponent = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #5cd7da;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`

const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  color: #fff;
`

const Img = styled.img`
  width: 40px;
  height: 40px;
`

const Heading = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`

export const Header: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    dispatch(connectionsAction.exitRoom())
    dispatch(connectionsAction.resetState())
    history.push('/')
  }

  return (
    <HeaderComponent>
      <Link to="" onClick={handleClick}>
        <Img
          src="https://res.cloudinary.com/drw7v2tob/image/upload/v1579483556/webrtc_logo_i4exkk.png"
          alt="WebRTC"
        />
        <Heading>React WebRTC Starter</Heading>
      </Link>
      <HeaderMenu />
    </HeaderComponent>
  )
}
