'use strict';

var path = require('path'),
    express = require('express'),
    router = express.Router(),
    SessionFactory = require('../api/factories/session-factory'),
    BridgeFactory = require('../api/factories/bridge-factory');

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
    var session = SessionFactory.create(req.body.name, req.body.bridgeType);
    BridgeFactory.create(session, req.body.bridgeType);
    res.send(session);
});

module.exports = router;
