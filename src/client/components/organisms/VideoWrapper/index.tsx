import * as React from 'react'
import { useDispatch } from 'react-redux'

// components
import { SelfVideo } from '@client/components/molecules'
import { Wrapper } from './styles'

export const VideoWrapper: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <SelfVideo />
    </Wrapper>
  )
}
