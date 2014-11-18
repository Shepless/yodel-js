'use strict';

var server = require('./server/server');

server.listen(3000, function () {
    console.log('node-console listening on *:3000');
});