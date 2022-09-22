const socket = io('http://localhost:3000')

socket.on('connect', data => {
  socket.emit('welcome', 'Hey Server')
  socket.on('welcome-Client', data => {
    console.log(data)
  })
})
