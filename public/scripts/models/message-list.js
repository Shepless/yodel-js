(function () {
    'use strict';

    angular.module('node-console')
        .factory('message-list', [function () {
            var MessageList = function () {};

            MessageList.prototype = Array.prototype;

            MessageList.prototype.groupByIp = function () {
                console.log(this.map(function (m) {
                    return m.remoteIp;
                }));
            };

            return MessageList;
        }]);
})();