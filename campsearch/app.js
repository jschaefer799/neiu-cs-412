const express = require('express')
const path = require('path')
const logger = require('morgan')
const http = require('http')
const hbs = require('express-handlebars') //allows us to use handlebars
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const connectFlash = require('connect-flash')
const mongoose = require('mongoose')
const passport = require('passport')
const { User } = require('./models/user')

//code for importing campsite data to MongoDB
// const csvtojson = require("csvtojson")
// const mongodb = require("mongodb").MongoClient
//
// csvtojson()
//     .fromFile("michigan_state_park_campgrounds.csv")
//     .then(csvData =>{
//       console.log(csvData)
//
//
//       mongodb.connect(
//           process.env.DB_URL,
//           {useNewUrlParser: true, useUnifiedTopology: true},
//           (err, client) => {
//             if (err) throw err
//
//             client
//                 .db("camp-search")
//                 .collection("campsites")
//                 .insertMany(csvData, (err, res) =>{
//                   if(err) throw err
//
//                   console.log(`Inserted: ${res.insertedCount} rows`)
//                   client.close()
//                 })
//           }
//       )
//     })
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  }
).catch (err => {
  console.log(err)
})


const appsupport = require('./appsupport')
const indexRouter = require('./routes/index')
const reviewsRouter = require('./routes/reviews')
const usersRouter = require('./routes/users')

const app = express()
exports.app = app

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); //'hbs' signals to use handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}))

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: process.env.PASSCODE,
  cookie:{ maxAge: 86400000},
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
  resave: false,
  saveUninitialized: false

}))
app.use(connectFlash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
app.use('/assets/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')))
app.use('/assets/vendor/popper.js', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')))
app.use('/assets/vendor/feather-icons', express.static(path.join(__dirname, 'node_modules', 'feather-icons', 'dist')))
app.use('/assets/vendor/@advanced-rest-client', express.static(path.join(__dirname, 'node_modules', '@advanced-rest-client','star-rating')))

app.use((req,res,next)=>{
  res.locals.loggedIn = req.isAuthenticated()
  res.locals.currentUser = req.user ? req.user.toObject() : undefined
  res.locals.flashMessages = req.flash()
  next()
})

//Router function lists - these must be coded prior to Error Handlers
app.use('/', indexRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)

//Error handlers - these must come after Router function lists
app.use(appsupport.basicErrorHandler)
app.use(appsupport.handle404)


const port = appsupport.normalizePort(process.env.PORT || '3000')
exports.port = port
app.set('port', port)

const server = http.createServer(app);
exports.server = server

server.listen(port);
server.on('error', appsupport.onError);
server.on('listening', appsupport.onListening);
