const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const router = require('./routers')
console.log(session);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure:false , maxAge: 60000 },
}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})