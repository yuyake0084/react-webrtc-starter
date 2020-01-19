import * as React from 'react'
import styled from 'styled-components'

type Props = {
  message: Error['message']
}

const errorColor = '#ff8080'

const Container = styled.div`
  border: 2px solid ${errorColor};
  padding: 20px;
  color: ${errorColor};
  background-color: #fff2f2;
  border-radius: 10px;
}
`

export const Error: React.FC<Props> = ({ message }) => <Container>{message}</Container>
