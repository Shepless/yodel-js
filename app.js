'use strict';

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').Server(app),
    sessionRouter = require('./routes/session'),
    clientRouter = require('./routes/client'),
    partialRouter = require('./routes/partial'),
    SocketFactory = require('./api/factories/socket-factory'),
    BridgeFactory = require('./api/factories/bridge-factory');

SocketFactory.init(server);
BridgeFactory.register(0, 'default.js');
BridgeFactory.register(1, 'angular.js');
BridgeFactory.register(2, 'backbone.js');

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