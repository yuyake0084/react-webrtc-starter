import { all, fork } from 'redux-saga/effects'
import { mediaProcess } from './media'

export function* rootSaga() {
  yield all([fork(mediaProcess)])
}
