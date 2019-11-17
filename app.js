var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./controllers/user.controller');
var toDoRouter = require('./controllers/todo.controller');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(express.static('../dist/fe'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'fe/dist/fe')));

app.use(cors({
  origin: '*',
  withCredentials: false,
  allowedHeaders: ['Content-Type', 'userid', "email", 'token', 'Authorization', 'X- Requested - With', 'X- Content - Type - Options', 'X- Frame - Options', 'Accept', 'Origin']
}));



/**
 * mongo Connect config
 */
mongoose.Promise = global.Promise

const uri = "mongodb+srv://hafeez_khan:hafeez_khan@democluster-tnrcz.mongodb.net/SwitchOnDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log({ err });
  } else {

    console.log('Connected');
  }
  // const collection = client.db('SwitchOnDB');
});

app.use(session({
  secret: 'expresssecret',
  resave: true,
  httpOnly: true,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 80 * 80 * 800 }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', toDoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
