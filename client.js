function initializeChatBox () {
  const localStValue = localStorage.getItem('messages')
  const messages = (localStValue ? localStValue.split('#') : []).map(item => {
    if (item) return item
  })
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

  //? volatile
  // let count = 0
  // setInterval(() => {
  //   Socket.volatile.emit('ping', ++count)
  // }, 1000)
})

Socket.on('serverMessage', message => {
  const localStValue = localStorage.getItem('messages')
    ? localStorage.getItem('messages') + '#' + message
    : message
  localStorage.setItem('messages', localStValue)
  const paraElement = document.createElement('p')
  paraElement.innerText = message
  const chatBox = document.querySelector('.chatBox')
  chatBox.appendChild(paraElement)
})
