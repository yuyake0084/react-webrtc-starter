import { Server } from 'http'
import socketIO from 'socket.io'
import redisAdapter from 'socket.io-redis'
import * as types from '@client/utils/connectionTypes'

type SocketType = typeof types[keyof typeof types]

type Custom = {
  roomId: string
  from?: string
}

export const connectSocket = (server: Server): void => {
  const { NODE_ENV, REDIS_URL } = process.env
  const io = socketIO()

  if (NODE_ENV === 'production' && typeof REDIS_URL === 'string') {
    io.adapter(redisAdapter(REDIS_URL))
  }

  io.attach(server, {
    transports: ['websocket'],
  })

  io.on('connection', (socket: socketIO.Socket & Custom) => {
    console.log('====> connect', socket.id)
    let id: string | null = null

    socket.on(types.JOIN, ({ roomId }) => {
      console.log(`====> [${types.JOIN}]: create room "${roomId}"`)

      id = roomId
      socket.join(roomId)
    })

    socket.on(types.CALL, ({ roomId }) => {
      const rooms = Object.keys(io.sockets.adapter.rooms)
      console.log(`====> [${types.CALL}]: roomId is "${roomId}"`, rooms)

      if (!rooms.includes(roomId)) {
        console.log(`====> [${types.ROOM_NOT_FOUND}]: roomId is "${roomId}"`)
        socket.to(socket.id).emit(types.ROOM_NOT_FOUND)
        return
      }

      const data = {
        roomId,
        fromId: socket.id,
      }

      socket.broadcast.to(roomId).emit(types.CALL, data)
    })

    socket.on(types.EXIT, ({ roomId }) => {
      console.log(`====> [${types.EXIT}]: clientId id ${socket.id}`)
      const data = {
        fromId: socket.id,
      }

      socket.broadcast.to(roomId).emit(types.EXIT, data)
    })

    socket.on(types.LEAVE, ({ roomId }) => {
      console.log(`====> [${types.LEAVE}]: roomId is ${roomId}`)
      socket.leave(roomId)
    })

    socket.on('disconnect', () => {
      console.log(`====> [disconnect]: roomId is ${id}`)

      if (id) {
        socket.broadcast.to(id).emit(types.EXIT, { fromId: socket.id })
      }
    })

    const transferArray: Array<SocketType> = [types.OFFER, types.ANSWER, types.CANDIDATE]

    transferArray.forEach((type: SocketType) => {
      socket.on(type, ({ toId, roomId, sdp }) => {
        const data = {
          fromId: socket.id,
          sdp,
        }

        console.log(
          `====> [${type}]: roomId is "${roomId}". send to ${toId || 'everyone'} from "${
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
