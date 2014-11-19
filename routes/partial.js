'use strict';

var express = require('express'),
    router = express.Router();

router.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.sendFile(name, { root: './public/partials/' });
});

module.exports = router;