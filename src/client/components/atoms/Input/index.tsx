import * as React from 'react'
import styled from 'styled-components'

const InputComponent = styled.input`
  color: #fff;
  font-size: 14px;
  width: 250px;
  padding: 16px 24px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #37b782;
  outline: none;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 2px;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
    letter-spacing: 2px;
  }
`

type Props = {
  name: HTMLInputElement['name']
  value: HTMLInputElement['value']
  placeholder: HTMLInputElement['placeholder']
  required: HTMLInputElement['required']
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Props> = props => {
  return <InputComponent {...props} />
}
