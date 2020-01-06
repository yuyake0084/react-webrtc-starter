import * as React from 'react'
import styled from 'styled-components'

export const HeaderCoponent = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #fff;
  background-color: #5cd7da;
`

export const Img = styled.img`
  width: 40px;
`

export const Heading = styled.h1`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`

export const Header = () => (
  <HeaderCoponent>
    <Img src="https://cloud.soba-project.com/images/webrtclogo.png" alt="WebRTC" />
    <Heading>React with WebRTC</Heading>
  </HeaderCoponent>
)
