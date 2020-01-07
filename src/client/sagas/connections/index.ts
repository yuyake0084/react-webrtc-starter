import { END } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import * as types from '@client/types/connections'
import { getUserMedia } from './getUserMedia'
import { connectRtcPeerConnection } from './rtcPeerConnection'
import { connectSocket } from './socket/connect'

export function* stopSaga(): Generator {
  yield put(END)
}

export function* connectionsProcess(): Generator {
  yield takeLatest(types.GET_USER_MEDIA, getUserMedia)
  yield takeLatest(types.CONNECT_RTC_PEER_CONNECTION, connectRtcPeerConnection)
  yield takeLatest(types.CONNECT_SOCKET, connectSocket)
}
