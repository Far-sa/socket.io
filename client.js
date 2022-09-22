function initializeChatBox () {
  const messages = JSON.parse(localStorage.getItem('messages'))

  messages.forEach(item => {
    const paraElement = document.createElement('p')
    paraElement.innerText = item
    const chatBox = document.querySelector('.chatBox')
    chatBox.appendChild(paraElement)
  })
}
initializeChatBox()

const Socket = io('http://localhost:3000')

Socket.on('connect', data => {
  const sendBtn = document.getElementById('sendBtn')
  sendBtn.addEventListener('click', e => {
    const textBox = document.getElementById('text')
    const message = textBox.value
    if (!message) return alert('textbox can not be empty')
    Socket.emit('clientMessage', message)
    textBox.value = ''
  })
})

Socket.on('serverMessage', message => {
  const messages = JSON.parse(localStorage.getItem('messages'))
  messages.push(message)
  localStorage.setItem('messages', messages)
  const paraElement = document.createElement('p')
  paraElement.innerText = message
  const chatBox = document.querySelector('.chatBox')
  chatBox.appendChild(paraElement)
})
