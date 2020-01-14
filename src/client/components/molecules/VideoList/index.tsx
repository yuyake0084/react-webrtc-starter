import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { connectionsSelector } from '@client/selectors'
import { Video } from '@client/components/atoms'
import { SelfVideo } from '@client/components/molecules'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;

  @media screen and (max-width: 375px) {
    display: block;
  }
`

const VideoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 100%;
  min-height: 200px;
  margin: 0.5%;
  background-color: #000;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 375px) {
    width: 100%;
    margin: 0;
    margin-top: 10px;
  }
`

export const VideoList: React.FC = () => {
  const { streams } = useSelector(connectionsSelector)

  return (
    <Container>
      <VideoBox>
        <SelfVideo />
      </VideoBox>
      {streams.map(({ stream }) => (
        <VideoBox key={stream.id}>
          <Video srcObject={stream} />
        </VideoBox>
      ))}
    </Container>
  )
}
