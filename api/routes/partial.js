'use strict';

var express = require('express'),
    router = express.Router();

router.get('/partials/:moduleName/:name', function (req, res) {
    var name = req.params.name;
    res.sendFile(name, { root: './public/partials/' + req.params.moduleName });
});

module.exports = router;