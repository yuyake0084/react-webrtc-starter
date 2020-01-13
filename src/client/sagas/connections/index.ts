import { END } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import * as types from '@client/types/connections'
import { getUserMedia } from './getUserMedia'
import { connectSocket } from './socket/connect'
import { exitRoom } from './socket/exitRoom'

export function* stopSaga(): Generator {
  yield put(END)
}

export function* connectionsProcess(): Generator {
  yield takeLatest(types.GET_USER_MEDIA, getUserMedia)
  yield takeLatest(types.CONNECT_SOCKET, connectSocket)
  yield takeLatest(types.EXIT_ROOM, exitRoom)
}
