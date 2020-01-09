import { put, select } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { peerConnection } from '@client/utils/peerConnection'

export function* connectRoom(action: ReturnType<typeof connectionsAction.connectRoom>): Generator {
  try {
    const { roomId } = action.payload
    const { stream }: any = yield select(connectionsSelector)

    if (stream) {
      const pc = peerConnection.connect(stream, roomId)

      yield put(connectionsAction.connectRoomSuccess(pc))
    }
  } catch (e) {
    yield put(connectionsAction.connectRoomFailure(e))
  }
}
