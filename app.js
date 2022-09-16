const express = require('express')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT || 3000
const router = require('./routers')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors : {origin : "*"}})
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure:false , maxAge: 60000000000000000000000 },
}))

app.use(router)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

server.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})


io.on('connection', (socket) => {
  console.log("User Connected : ", socket.id);

  socket.on("message" , (data) => {
    socket.broadcast.emit('message',data)
  })
})
