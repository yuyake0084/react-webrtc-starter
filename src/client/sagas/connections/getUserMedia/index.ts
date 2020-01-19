import { call, put } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'

// Can not work getUserMedia in yield call
async function callGetUserMedia(constraints: MediaStreamConstraints): Promise<Error | MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    return stream
  } catch (e) {
    throw new Error(e)
  }
}

export function* getUserMedia(
  action: ReturnType<typeof connectionsAction.getUserMedia>,
): Generator {
  try {
    const { constraints } = action.payload

    const stream = yield call(callGetUserMedia, constraints)

    yield put(connectionsAction.getUserMediaSuccess(stream as MediaStream))
  } catch (e) {
    yield put(connectionsAction.getUserMediaFailure(e))
  }
}
