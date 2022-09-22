const http = require('http')
const webSocket = require('ws')

const server = http.createServer()
const ws = new webSocket.Server({ server })

ws.on('headers', (headers, req) => {
  console.log(headers)
})
ws.on('connection', (socket, req) => {
  socket.on('message', data => {
    console.log(data.toString())
  })
  socket.send('Hey client!')
})

server.listen(3000, () => console.log('server is running on port 3000'))
