require('./lib/channel') 

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const routes = require('./routes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// res middleware
app.use(require('./middlewares/res'))

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.error(err, 404)
  next() 
})

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//   res.error(err.status || 500)
// })

module.exports = app
