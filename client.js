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
