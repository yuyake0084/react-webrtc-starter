import io from 'socket.io-client'
import * as types from '@client/utils/connectionTypes'

class Socket {
  private socket: any | null

  public constructor() {
    this.socket = null
  }

  public join = (roomId: string) => {
    this.socket.emit(types.JOIN, { roomId })
  }

  public call = (roomId: string) => {
    this.socket.emit(types.CALL, { roomId })
  }

  private listenEvent = (): void => {
    console.log(this.socket)
  }
}

export const socket = new Socket()
