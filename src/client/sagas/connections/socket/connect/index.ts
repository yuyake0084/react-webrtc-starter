import io from 'socket.io-client'
import { put, select } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { peerConnection } from '@client/utils/peerConnection'
import * as types from '@client/utils/connectionTypes'

export function* connectSocket(
  action: ReturnType<typeof connectionsAction.connectSocket>,
): Generator {
  try {
    const { roomId } = action.payload
    const state: any = yield select(connectionsSelector)
    const socket = io(process.env.DOMAIN as string)

    peerConnection.setSocket(socket)
    yield put(connectionsAction.connectRoom(roomId))

    socket.on('connect', () => {
      if (!state.roomId && roomId) {
        socket.emit(types.JOIN, { roomId })
      }

      console.log('connect', socket)
    })

    socket.on(types.JOIN, ({ roomId }: Record<string, any>) => {
      console.log(roomId)
    })

    socket.on(types.CALL, (data: Record<string, any>) => {
      console.log(data)
    })

    socket.on(types.ROOM_NOT_FOUND, () => {
      console.log('部屋ないよーーーーー')
    })

    socket.on(types.OFFER, peerConnection.receivedOffer)
    socket.on(types.ANSWER, peerConnection.receivedAnswer)
    socket.on(types.CANDIDATE, peerConnection.receivedCandidate)

    yield put(connectionsAction.connectSocketSuccess(socket, roomId))
  } catch (e) {
    console.log(e)
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
