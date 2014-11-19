(function () {
    'use strict';

    angular.module('yodel.dashboard')
        .controller('dashboard-controller', ['$scope', 'session-model', function ($scope, Session) {
            $scope.sessions = Session.getAll();

            $scope.$watch(function () {
                return Session.lastModified();
            }, function () {
                $scope.sessions = Session.getAll();
            });
        }]);
})();