import * as React from 'react'
import styled from 'styled-components'

const ButtonComponent = styled.button`
  display: block;
  padding: 16px 40px;
  color: #fff
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s;

  ${({ color }) => `
    background-color: ${color};
  `}

  &:hover {
    opacity: 0.7;
  }
`

type Props = {
  value: HTMLButtonElement['value']
  color?: string
  style?: Object
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<Props> = ({ value, color = '#6ed696', ...rest }) => {
  return (
    <ButtonComponent color={color} {...rest}>
      {value}
    </ButtonComponent>
  )
}
