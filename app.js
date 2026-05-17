var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var session = require('express-session');
var passport = require('./config/passport');

var indexRouter = require('./routes/rotasIndex');
var seedRouter = require('./routes/rotasSeed');
var produtoRouter = require('./routes/rotasProduto');
var usuarioRouter = require('./routes/rotasUsuario');

require('./model/modelos');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerHelper('eq', (a, b) => a === b);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'electrostore_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.ehAdmin = req.user && req.user.perfil === 'admin';
  res.locals.ehLojista = req.user && req.user.perfil === 'lojista';
  next();
});

app.use('/', indexRouter);
app.use('/seed', seedRouter);
app.use('/produto', produtoRouter);
app.use('/usuario', usuarioRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
