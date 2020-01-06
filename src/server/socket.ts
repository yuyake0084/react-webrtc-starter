import { Server } from 'http'
import socketIO from 'socket.io'
import * as types from '@client/utils/connectionTypes'

export const connectSocket = (server: Server) => {
  const io = socketIO(server)

  io.on('connection', socket => {
    console.log('====> connect')

    socket.on(types.JOIN, ({ roomId }) => {
      console.log('===> join')
      socket.join(roomId)
    })

    Object.values(types).forEach(type => {
      socket.on(type, data => {
        io.clients((err: Error, clients: string[]) => {
          if (err) err

          clients
            .filter(client => client !== socket.id)
            .forEach(client => {
              io.to(client).emit(type, data)
            })
        })
      })
    })
  })
}
