'use strict';

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').Server(app),
    sessionRouter = require('./api/routes/session'),
    clientRouter = require('./api/routes/client'),
    partialRouter = require('./api/routes/partial'),
    SocketFactory = require('./api/factories/socket-factory'),
    BridgeFactory = require('./api/factories/bridge-factory'),
    DefaultBridge = require('./api/models/bridge'),
    AngularBridge = require('./api/models/angular-bridge');

SocketFactory.init(server);
BridgeFactory.register(0, DefaultBridge);
BridgeFactory.register(1, AngularBridge);

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