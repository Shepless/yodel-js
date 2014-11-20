'use strict';

var path = require('path'),
    express = require('express'),
    router = express.Router(),
    SessionFactory = require('../factories/session-factory');

router.get('/session/:sessionId/client/:clientId', function (req, res) {
    var session = SessionFactory.get(req.params.sessionId);

    res.send(session.findClient(req.params.clientId));
});

module.exports = router;
