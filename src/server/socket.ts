import { Server } from 'http'
import uuid from 'uuid'
import socketIO from 'socket.io'
import redisAdapter from 'socket.io-redis'
import * as types from '@client/utils/connectionTypes'

type SocketType = typeof types[keyof typeof types]

type Data = {
  roomId: string
}

export const connectSocket = (server: Server): void => {
  const { NODE_ENV, REDIS_URL } = process.env
  const io = socketIO()

  if (NODE_ENV === 'production') {
    if (!REDIS_URL) {
      throw new Error('REDIS_URL is not defined.')
    }

    try {
      io.adapter(redisAdapter(REDIS_URL))
    } catch (e) {
      throw new Error(e)
    }
  }

  io.attach(server, {
    transports: ['websocket'],
  })

  io.on('connection', (socket: socketIO.Socket & Data) => {
    console.log('====> [connect]', socket.id)
    let id: string | null = null

    function createRoom(roomId: string): void {
      id = roomId
      socket.join(roomId)
      io.to(socket.id).emit(types.JOIN, roomId)

      console.log(`====> [${types.JOIN}]:`, {
        roomId,
        rooms: Object.keys(io.sockets.adapter.rooms),
      })
    }

    /**
     * JOIN
     */
    socket.on(types.JOIN, data => {
      const roomId = data.roomId ?? uuid.v4()

      createRoom(roomId)
    })

    /**
     * CALL
     */
    socket.on(types.CALL, ({ roomId }) => {
      const rooms = Object.keys(io.sockets.adapter.rooms)
      console.log(`====> [${types.CALL}]`, {
        roomId,
        rooms,
      })

      if (!rooms.includes(roomId)) {
        createRoom(roomId)
        return
      }

      const data = {
        roomId,
        fromId: socket.id,
      }

      id = roomId
      socket.join(roomId)
      socket.broadcast.to(roomId).emit(types.CALL, data)
    })

    /**
     * EXIT
     */
    socket.on(types.EXIT, ({ roomId }) => {
      console.log(`====> [${types.EXIT}]:`, {
        roomId,
        clientId: socket.id,
      })
      const data = {
        fromId: socket.id,
      }

      socket.broadcast.to(roomId).emit(types.EXIT, data)
    })

    /**
     * LEAVE
     */
    socket.on(types.LEAVE, ({ roomId }) => {
      console.log(`====> [${types.LEAVE}]:`, {
        roomId,
        clientId: socket.id,
      })

      socket.leave(roomId)
    })

    /**
     * DISCONNECT
     */
    socket.on('disconnect', () => {
      console.log(`====> [disconnect]`, {
        roomId: id,
        clientId: socket.id,
      })

      if (id) {
        socket.broadcast.to(id).emit(types.EXIT, { fromId: socket.id })
      }
    })

    /**
     * OTHER
     */
    ;([types.OFFER, types.ANSWER, types.CANDIDATE] as Array<SocketType>).forEach(type => {
      socket.on(type, ({ toId, roomId, sdp }) => {
        const data = {
          fromId: socket.id,
          sdp,
        }

        console.log(`====> [${type}]:`, {
          roomId,
          sendTo: toId || 'everyone',
          fromId: socket.id,
        })

        if (toId) {
          socket.to(toId).emit(type, data)
        } else {
          socket.broadcast.to(roomId).emit(type, data)
        }
      })
    })
  })
}
