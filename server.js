const http = require('http')
const socketIO = require('socket.io')
const express = require('express')

const app = express()
app.use(express.static('./'))
const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  console.log(socket.handshake.query)
  console.log(socket.handshake.headers)
})

server.listen(3000, () => console.log('Server is running on port 3000'))
