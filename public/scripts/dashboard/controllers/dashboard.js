(function () {
    'use strict';

    angular.module('yodel.dashboard')
        .controller('dashboard-controller', ['$scope', 'session-model', function ($scope, Session) {
            Session.bindAll($scope, 'sessions');
        }]);
})();