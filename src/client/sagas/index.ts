import { all, fork } from 'redux-saga/effects'
import { connectionsProcess } from './connections'

export function* rootSaga(): Generator {
  yield all([fork(connectionsProcess)])
}
