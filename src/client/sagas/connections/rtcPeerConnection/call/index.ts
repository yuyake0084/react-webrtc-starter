import io from 'socket.io-client'
import { put, select } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { peerConnection } from '@client/utils/peerConnection'
import * as types from '@client/utils/connectionTypes'

export function* callRoom(action: ReturnType<typeof connectionsAction.callRoom>) {
  try {
    const { roomId } = action.payload
    yield put(connectionsAction.connectRoom(roomId))
    const { pc } = yield select(connectionsSelector)

    if (pc) {
      const socket = io(process.env.DOMAIN as string)

      console.log(socket)
      socket.emit(types.CALL, { roomId })
    }
  } catch (e) {
    yield put(connectionsAction.callRoomFailure(e))
  }
}
