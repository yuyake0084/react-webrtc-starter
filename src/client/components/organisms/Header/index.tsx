import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const HeaderCoponent = styled.header`
  padding: 10px 20px;
  background-color: #5cd7da;
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

export const Header = () => (
  <HeaderCoponent>
    <Link to="/">
      <Img src="https://cloud.soba-project.com/images/webrtclogo.png" alt="WebRTC" />
      <Heading>React with WebRTC</Heading>
    </Link>
  </HeaderCoponent>
)
