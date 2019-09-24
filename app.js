// 引入第三方模块  sesstion;
var session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 后台路由
var adminRouter = require('./routes/admin');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 设置 cookie
app.use(cookieParser());

// 设置session
app.use(session({
	resave: true, 
	saveUninitialized: true, 
	// secret 加密用的密钥
	secret : 'suiji',
	cookie:{
		// cookie 生命周期   单位:毫秒
		maxAge:1000*60*30
	}
}))

// 登录设置信息
app.use(function(req,res,next){
	// res.locals 本地存储信息的对象
	// 设置默认信息 
	res.locals.user = '';
	res.locals.isAdmin = false;

	if(req.session.user){
		res.locals.user = req.session.user;
	}else if(req.session.isAdmin){
		res.locals.isAdmin = Boolean(req.body.isAdmin);
	}

	 next();
})



// 设置静态资源库
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// 后台路由
app.use('/admin', adminRouter);

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
