'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    sessionRouter = require('./routes/session'),
    partialRouter = require('./routes/partial'),
    SocketFactory = require('./api/factories/socket-factory');

SocketFactory.init(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/', sessionRouter);
app.use('/users', partialRouter);

server.listen(3000, function () {
    console.log('node-console listening on *:3000');
});