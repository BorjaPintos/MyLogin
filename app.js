
var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');
    i18n = require('i18n');




var app = express();

// minimal config
i18n.configure({
  locales: ['en','es'],
  cookie: 'locale',
  directory: __dirname + '/resources/locales'
});

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());
app.use(cookieParser());
// init i18n module for this loop
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport'),
	expressSession = require('express-session');

app.use(expressSession({secret: 'mySecretKeyMyLogin'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

var connections = require('./lib/connections')();
// Initialize Passport
var initPassport = require('./lib/external/passport/init')(passport);

//Routes aplication
var usersRoutes = require('./routes/users/usersRoutes')(app),
	routes = require('./routes/index')(app);



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    	'use strict';
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

var debug = require('debug')('myLogin');

var server = app.listen(app.get('port'), function() {
	'use strict';
	console.log('Express server listening on port ' + server.address().port);
});

