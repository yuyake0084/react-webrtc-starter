import * as React from 'react'
import styled from 'styled-components'

const InputComponent = styled.input`
  color: #999;
  font-size: 14px;
  width: 250px;
  padding: 16px 24px;
  background-color: #f5f5f5;
  border: none;
  border-bottom: 2px solid #37b782;
  outline: none;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 2px;
  border-radius: 4px;
  box-sizing: border-box;

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
