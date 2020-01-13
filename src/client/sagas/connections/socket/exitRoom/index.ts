import { put, select } from 'redux-saga/effects'
import { connectionsSelector } from '@client/selectors'
import * as connectionsAction from '@client/actions/connections'
import { peerConnection } from '@client/utils/peerConnection'
import { State } from '@client/reducers/connections'

export function* exitRoom(): Generator {
  try {
    const { stream }: any = yield select(connectionsSelector)

    stream.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop()
    })

    peerConnection.exit()
    yield put(connectionsAction.exitRoomSuccess())
  } catch (e) {
    yield put(connectionsAction.exitRoomFailure(e))
  }
}
