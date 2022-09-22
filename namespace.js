//* Server side
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

//* Client side
const Socket = io('http://localhost:3000')

Socket.on('connect', data => {
  Socket.on('broadcast', data => {
    console.log(data)
  })
})

const teacherSocket = io('http://localhost:3000/teachers')

teacherSocket.on('connect', data => {
  teacherSocket.emit('teachersClient', 'Teachers Hi')
  teacherSocket.on('welcome-teachers', data => {
    console.log(data)
  })
})

const studentSocket = io('http://localhost:3000/students')

studentSocket.on('connect', data => {
  studentSocket.emit('studentsClient', 'Students Hi')
  studentSocket.on('welcome-students', data => {
    console.log(data)
  })
})
