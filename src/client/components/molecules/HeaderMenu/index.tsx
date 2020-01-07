import * as React from 'react'
import styled from 'styled-components'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '@client/components/atoms'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Link = styled.a`
  display: block;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }
`

export const HeaderMenu: React.FC = () => {
  const icons = [
    {
      id: 1,
      icon: faGithub,
      color: '#24292e',
      to: 'https://github.com/yuyake0084/react-webrtc-starter',
    },
    {
      id: 2,
      icon: faTwitter,
      color: '#1da1f2',
      to: 'https://twitter.com/yuyake0084',
    },
  ]

  return (
    <Container>
      {icons.map(({ id, to, ...rest }) => (
        <Link key={id} href={to} target="_blank">
          <Icon {...rest} />
        </Link>
      ))}
    </Container>
  )
}
