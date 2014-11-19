(function () {
    'use strict';

    angular.module('yodel.clients')
        .controller('client-info-controller', ['$scope', 'client', function ($scope, client) {
            $scope.client = client;

            $scope.logs = client.messages.filter(function (message) {
                return (message.level == 'LOG');
            });

            $scope.warnings = client.messages.filter(function (message) {
                return (message.level == 'WARN');
            });

            $scope.errors = client.messages.filter(function (message) {
                return (message.level == 'ERROR');
            });
        }]);
})();