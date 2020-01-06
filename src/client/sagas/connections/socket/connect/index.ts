import io from 'socket.io-client'
import { put } from 'redux-saga/effects'
import * as connectionsAction from '@client/actions/connections'
import * as connectionTypes from '@client/utils/connectionTypes'

export function* connectSocket(action: ReturnType<typeof connectionsAction.connectSocket>) {
  try {
    const { roomId } = action.payload
    const socket = io(process.env.DOMAIN as any)

    socket.on('connect', (e: any) => {
      socket.emit(connectionTypes.JOIN, { roomId })
    })

    socket.on('message', () => {
      socket.on(connectionTypes.JOIN, ({ roomId }: any) => {
        console.log(roomId)
      })
    })

    yield put(connectionsAction.connectSocketSuccess(roomId))
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}
