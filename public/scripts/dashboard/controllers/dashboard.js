(function () {
    'use strict';

    angular.module('yodel.dashboard')
        .controller('dashboard-controller', ['$scope', 'session-service', 'sessions', function ($scope, sessionService, sessions) {
            $scope.sessions = sessions;

            var lastBridgeType;

            $scope.createSession = function () {
                if (lastBridgeType) {
                    lastBridgeType = 0;
                } else {
                    lastBridgeType = 1;
                }

                sessionService.create('Foo Session', lastBridgeType).then(function (newSession) {
                    $scope.sessions.push(newSession);
                });
            }
        }]);
})();