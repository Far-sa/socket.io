const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer()
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', socket => {
  socket.on('welcome', data => {
    console.log(data)
  })
  socket.emit('welcome-Client', 'Hello Client')
})

server.listen(3000, () => console.log('Server ran at port 3000'))
