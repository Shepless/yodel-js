(function () {
    'use strict';

    angular.module('node-console')
        .controller('home-controller', ['$scope', 'session', 'sessions', function ($scope, session, sessions) {
            $scope.sessions = sessions;

            $scope.createSession = function () {
                session.create().then(function (newSession) {
                    $scope.sessions.push(newSession);
                });
            }
        }]);
})();