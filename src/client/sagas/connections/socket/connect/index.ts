import io from 'socket.io-client'
import { put, call, select } from 'redux-saga/effects'
import { State } from '@client/reducers'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
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
