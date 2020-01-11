import { Server } from 'http'
import socketIO from 'socket.io'
import * as types from '@client/utils/connectionTypes'

type SocketType = typeof types[keyof typeof types]

type Custom = {
  roomId: string
  from?: string
}

export const connectSocket = (server: Server): void => {
  const io = socketIO(server)

  io.on('connection', (socket: socketIO.Socket & Custom) => {
    console.log('====> connect', socket.id)

    socket.on(types.JOIN, ({ roomId }) => {
      console.log(`====> join: create room "${roomId}"`)

      socket.roomId = roomId
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
        fromId: socket.id,
      }

      socket.broadcast.to(roomId).emit(types.CALL, data)
    })

    const transferArray: Array<SocketType> = [types.OFFER, types.ANSWER, types.CANDIDATE]

    transferArray.forEach((type: SocketType) => {
      socket.on(type, ({ toId, roomId, sdp }) => {
        const data = {
          fromId: socket.id,
          sdp,
        }
        // const clients = Object.keys(io.sockets.adapter.rooms[roomId].sockets)
        console.log(
          `====> ${type}: roomId is "${roomId}". send to ${toId || 'everyone'} from "${
            socket.id
          }".`,
        )

        if (toId) {
          socket.to(roomId).emit(type, data)
        } else {
          socket.broadcast.to(roomId).emit(type, data)
        }
      })
    })
  })
}
