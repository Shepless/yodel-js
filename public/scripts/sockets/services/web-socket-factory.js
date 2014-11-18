(function () {
    'use strict';

    angular.module('yodel.sockets')
        .factory('web-socket-factory', ['socketFactory', function (socketFactory) {
            return {
                create: function (sessionId) {
                    var socket = io.connect('http://localhost:3000/' + sessionId);

                    return socketFactory({
                        ioSocket: socket
                    });
                }
            }
        }]);
})();