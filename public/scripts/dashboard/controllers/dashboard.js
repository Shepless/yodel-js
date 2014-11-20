(function () {
    'use strict';

    angular.module('yodel.dashboard')
        .controller('dashboard-controller', ['$scope', 'session-model', 'DS', function ($scope, Session, DS) {
            Session.bindAll($scope, 'sessions');

//            $scope.$watch(function () {
//                return Session.lastModified() + DS.lastModified('client');
//            }, function () {
//                $scope.sessions = Session.getAll();
//            });
        }]);
})();