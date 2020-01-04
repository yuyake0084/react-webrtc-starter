import { put, call, select } from 'redux-saga/effects'
import { State } from '@client/reducers'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'

export function* connectSocket() {
  try {
    const { stream }: State['connections'] = yield select(connectionsSelector)

    if (process.env.IS_BROWSER && stream) {
      const { peerConnection } = require('@client/utils/peerConnection')
      const pc = peerConnection.connect(true)

      peerConnection.addTrack(stream)
      yield put(connectionsAction.connectSocketSuccess(pc))
    }
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
