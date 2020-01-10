import { Server } from 'http'
import socketIO from 'socket.io'
import * as types from '@client/utils/connectionTypes'

type SocketType = typeof types[keyof typeof types]

type Custom = {
  from?: string
}

export const connectSocket = (server: Server): void => {
  const io = socketIO(server)

  io.on('connection', (socket: socketIO.Socket & Custom) => {
    console.log('====> connect')

    socket.on(types.JOIN, ({ roomId }) => {
      console.log('====> join')

      socket.join(roomId)
    })

    socket.on(types.CALL, ({ roomId }) => {
      console.log(`====> ${types.CALL}`, roomId)

      const rooms = Object.keys(io.sockets.adapter.rooms)

      if (!rooms.includes(roomId)) {
        console.log(`====> ${types.ROOM_NOT_FOUND}`)
        socket.to(socket.id).emit(types.ROOM_NOT_FOUND)
        return
      }

      const data = {
        roomId,
        from: socket.id,
      }

      socket.broadcast.to(roomId).emit(types.CALL, data)
    })

    const transferArray: SocketType[] = [types.OFFER, types.ANSWER, types.CANDIDATE]

    transferArray.forEach((type: SocketType) => {
      socket.on(type, data => {
        const { roomId, sdp } = data

        console.log(type, data)
        socket.broadcast.to(roomId).emit(type, sdp)
      })
    })
  })
}
