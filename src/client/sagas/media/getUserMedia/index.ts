import { call, put } from 'redux-saga/effects'
import * as actions from '../../../actions/media'

export function* getUserMedia(action: ReturnType<typeof actions.getUserMedia>) {
  try {
    const { constraints } = action.payload

    console.log(constraints)
    // const stream = yield call(navigator.mediaDevices.getUserMedia(constraints))
  } catch (error) {
    yield put(actions.getUserMediaFailure(error))
  }
}
