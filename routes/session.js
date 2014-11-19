'use strict';

var path = require('path'),
    express = require('express'),
    router = express.Router(),
    SessionFactory = require('../api/factories/session-factory'),
    BridgeFactory = require('../api/factories/bridge-factory');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/sessions/:id', function (req, res) {
    res.sendFile(req.params.id, { root: './.sessions/' });
});

router.get('/session/:id', function (req, res) {
    res.send(SessionFactory.get(req.params.id));
});

router.get('/session', function (req, res) {
    res.send(SessionFactory.getAll());
});

router.post('/session', function (req, res) {
    var session = SessionFactory.create(req.get('user-agent'), req.ip);
    BridgeFactory.create(session);
    res.send(session);
});

module.exports = router;
