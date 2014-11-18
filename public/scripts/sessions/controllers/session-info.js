(function () {
    'use strict';

    angular.module('yodel.sessions')
        .controller('session-info-controller', ['$scope', 'session', function ($scope, session) {
            $scope.session = session;
        }]);
})();