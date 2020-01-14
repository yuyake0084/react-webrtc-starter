import * as React from 'react'
import styled from 'styled-components'

const InputComponent = styled.input`
  font-size: 14px;
  width: 250px;
  padding: 16px 24px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #37b782;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  border-radius: 4px;

  &::placeholder {
    color: #ccc;
    background-color: transparent;
    letter-spacing: 2px;
  }
`

type Props = {
  name: HTMLInputElement['name']
  type: HTMLInputElement['type']
  value: HTMLInputElement['value']
  placeholder: HTMLInputElement['placeholder']
  required: HTMLInputElement['required']
  autocomplete?: HTMLInputElement['autocomplete']
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Props> = props => {
  return <InputComponent {...props} />
}
