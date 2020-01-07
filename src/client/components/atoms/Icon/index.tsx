import * as React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;

  ${({ color }: { color: string }) => `
    background-color: ${color};
  `}
`

type Props = {
  icon: FontAwesomeIconProps['icon']
  color?: string
}

export const Icon: React.FC<Props> = ({ icon, color = '#20aee5' }) => {
  return (
    <Container color={color}>
      <FontAwesomeIcon icon={icon} />
    </Container>
  )
}
