import { put, select } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { peerConnection } from '@client/utils/peerConnection'

export function* connectSocket(
  action: ReturnType<typeof connectionsAction.connectSocket>,
): Generator {
  try {
    const { roomId } = action.payload
    const state: any = yield select(connectionsSelector)

    if (state.stream) {
      peerConnection.connectSocket(state.stream, roomId, !!(!state.roomId && roomId))
    } else {
      throw new Error('Cound not find Stream')
    }

    yield put(connectionsAction.connectSocketSuccess(roomId))
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
