import { END } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

import * as types from '../../types/media'
import { getUserMedia } from './getUserMedia'

export function* stopSaga() {
  yield put(END)
}

export function* mediaProcess() {
  yield takeLatest(types.GET_USER_MEDIA, getUserMedia)
}
