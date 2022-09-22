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

//? broadcast a connection
io.on('connection', () => {
  io.emit('broadcast', 'Hello Everyone')
})

io.of('/teachers').on('connection', socket => {
  socket.on('teachersClient', data => {
    console.log(data)
  })
  socket.emit('welcome-teachers', 'Hello Teachers')
})

io.of('/students').on('connection', socket => {
  socket.on('studentsClient', data => {
    console.log(data)
  })
  socket.emit('welcome-students', 'Hello Students')
})

server.listen(3000, () => console.log('Server is running on port 3000'))
