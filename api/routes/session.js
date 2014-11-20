'use strict';

var path = require('path'),
    express = require('express'),
    router = express.Router(),
    SessionFactory = require('../factories/session-factory'),
    BridgeFactory = require('../factories/bridge-factory');

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
    var session = SessionFactory.create(req.body.name, req.body.bridgeType),
        bridge = BridgeFactory.create(session, req.body);

    bridge.createBridgeFile();

    res.send(session);
});

module.exports = router;
