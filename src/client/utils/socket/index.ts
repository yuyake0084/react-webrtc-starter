import io from 'socket.io-client'
import * as types from '@client/utils/connectionTypes'

class Socket {
  private socket: any | null

  public constructor() {
    this.socket = null
  }

  public connect = (): void => {
    this.socket = io(process.env.DOMAIN as any)
    this.listenEvent()

    return this.socket
  }

  public join = (roomId: string) => {
    this.socket.emit(types.JOIN, { roomId })
  }

  public call = (roomId: string) => {
    this.socket.emit(types.CALL, { roomId })
  }

  private listenEvent = (): void => {
    console.log(this.socket)
    this.socket.on(types.CALL, (data: Record<string, any>) => {
      console.log(data)
    })

    this.socket.on(types.ROOM_NOT_FOUND, () => {
      console.log('部屋ないよーーーーー')
    })
  }

  public listenCall = (cb: Function) => {
    this.socket.on(types.OFFER, cb)
  }
}

export const socket = new Socket()
