var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser')
var usersRouter = require('./routes/users');
var loaiRouter = require('./routes/loai');
var nuochoaRouter = require('./routes/nuochoa');
var thuonghieuRouter = require('./routes/thuonghieu');
var ctnuochoaRouter = require('./routes/ctnuochoa');
var cthoadonRouter = require('./routes/cthoadon');
var khachhangRouter = require('./routes/khachhang');
var hoadonRouter = require('./routes/hoadon');
var taikhoanadRouter = require('./routes/taikhoanad');
var tintucRouter = require('./routes/tintuc');


// var slideRouter = require('./routes/slide');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/loai', loaiRouter);
app.use('/nuochoa', nuochoaRouter);
app.use('/ctnuochoa', ctnuochoaRouter);
app.use('/cthoadon', cthoadonRouter);
app.use('/thuonghieu', thuonghieuRouter);
app.use('/khachhang', khachhangRouter);
app.use('/hoadon', hoadonRouter);
app.use('/taikhoanad', taikhoanadRouter);
app.use('/tintuc', tintucRouter);
app.use('/admin/tintuc', tintucRouter);

app.use(bodyparser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
