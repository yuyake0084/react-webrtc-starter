import { Server } from 'http'
import socketIO from 'socket.io'
import * as types from '@client/utils/connectionTypes'

type Custom = {
  roomId: string
  from?: string
}

export const connectSocket = (server: Server) => {
  const io = socketIO(server)

  io.on('connection', (socket: socketIO.Socket & Custom) => {
    console.log('====> connect')

    socket.on(types.JOIN, ({ roomId }) => {
      console.log('===> join')
      socket.join(roomId)
    })

    socket.on(types.CALL, ({ roomId }) => {
      console.log('====> call')
      const data = {
        roomId,
        from: socket.id,
      }

      socket.broadcast.to(roomId).emit(types.CALL, data)
    })

    // Object.values(types).forEach(type => {
    //   socket.on(type, data => {
    //     io.clients((err: Error, clients: string[]) => {
    //       if (err) err

    //       clients
    //         .filter(client => client !== socket.id)
    //         .forEach(client => {
    //           io.to(client).emit(type, data)
    //         })
    //     })
    //   })
    // })
  })
}
