import { put, call, select } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
import { peerConnection } from '@client/utils/peerConnection'

export function* connectSocket(
  action: ReturnType<typeof connectionsAction.connectSocket>,
): Generator {
  try {
    const state: any = yield select(connectionsSelector)

    if (!state.stream) {
      throw new Error('Cound not find Stream')
    }

    const roomId = yield call(peerConnection.connectSocket, state.stream, action.payload.roomId)

    if (!roomId) {
      throw new Error('Cannot create roomId')
    }

    yield put(connectionsAction.connectSocketSuccess(roomId as string))
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
