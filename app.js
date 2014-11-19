'use strict';

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').Server(app),
    sessionRouter = require('./routes/session'),
    clientRouter = require('./routes/client'),
    partialRouter = require('./routes/partial'),
    SocketFactory = require('./api/factories/socket-factory');

SocketFactory.init(server);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(sessionRouter);
app.use(clientRouter);
app.use(partialRouter);

app.get('/', function(req, res) {
    res.render('index');
});

server.listen(3000, function () {
    console.log('node-console listening on *:3000');
});