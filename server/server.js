'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    sessionFactory = require('./session-factory'),
    bridgeFactory = require('./bridge-factory'),
    socketFactory = require('./socket-factory');

socketFactory.init(server);

app.use(express.static(path.join(process.cwd(), 'client')));
app.use('/client/partials/', express.static(path.join(process.cwd(), 'client/partials')));

app.get('/sessions/:id', function (req, res) {
    res.send(sessionFactory.get(req.params.id));
});

app.get('/session/:id', function (req, res) {
    res.send(sessionFactory.get(req.params.id));
});

app.get('/session', function (req, res) {
    res.send(sessionFactory.getAll());
});

app.post('/session', function (req, res) {
    var session = sessionFactory.create(req.get('user-agent'), req.ip);
    bridgeFactory.create(session);
    res.send(session);
});

module.exports = server;