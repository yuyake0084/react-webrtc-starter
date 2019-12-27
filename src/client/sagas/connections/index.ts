import { END } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import * as types from '@client/types/media'
import { getUserMedia } from './getUserMedia'

export function* stopSaga(): Generator {
  yield put(END)
}

export function* connectionsProcess(): Generator {
  yield takeLatest(types.GET_USER_MEDIA, getUserMedia)
}
