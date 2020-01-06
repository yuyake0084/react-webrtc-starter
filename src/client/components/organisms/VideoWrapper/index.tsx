import * as React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { SelfVideo } from '@client/components/molecules'

const Wrapper = styled.div`
  position: relative;
  padding: 50px 0;
`

export const VideoWrapper: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <SelfVideo />
    </Wrapper>
  )
}
