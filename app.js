var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('express-error-handler'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = module.exports = express(),
    http = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io')(http);

app.set('port', process.env.PORT || 8888);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/api/name', api.name);

app.get('*', routes.index);

io.on('connection', function(socket){
  socket.on('chat messages', function(msg) {
    io.emit('message', msg);
    io.emit('ScrollUpdate', 'Scroll is bottom');
    console.log(msg);
  });
  console.log('User connected!');
});

http.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});