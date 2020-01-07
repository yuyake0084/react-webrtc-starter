import { put } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { socket } from '@client/utils/socket'

export function* callRoom(action: ReturnType<typeof connectionsAction.callRoom>) {
  try {
    const { roomId } = action.payload

    socket.call(roomId)
  } catch (e) {
    yield put(connectionsAction.callRoomFailure(e))
  }
}
