import io from 'socket.io-client'
import { put } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { peerConnection } from '@client/utils/peerConnection'
import * as types from '@client/utils/connectionTypes'

export function* connectSocket(
  action: ReturnType<typeof connectionsAction.connectSocket>,
): Generator {
  try {
    const { roomId } = action.payload
    const socket = io(process.env.DOMAIN as any)

    socket.on('connect', (e: any) => {
      socket.emit(types.JOIN, { roomId })
    })

    socket.on(types.JOIN, ({ roomId }: any) => {
      console.log(roomId)
    })

    socket.on(types.CALL, (data: Record<string, any>) => {
      console.log(data)
    })

    socket.on(types.ROOM_NOT_FOUND, () => {
      console.log('部屋ないよーーーーー')
    })

    socket.on(types.OFFER, peerConnection.receivedOffer)

    yield put(connectionsAction.connectSocketSuccess(socket, roomId))
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
