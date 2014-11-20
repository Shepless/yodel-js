(function () {
    'use strict';

    angular.module('yodel.clients')
        .controller('client-info-controller', ['$scope', '$stateParams', 'client-model', 'message-model',
            function ($scope, $stateParams, Client, Message) {
                Client.bindOne($scope, 'client', $stateParams.clientId);

                Message.bindAll($scope, 'logs', {
                    where: {
                        clientId: $stateParams.clientId,
                        level: 'LOG'
                    }
                });

                Message.bindAll($scope, 'warnings', {
                    where: {
                        clientId: $stateParams.clientId,
                        level: 'WARN'
                    }
                });

                Message.bindAll($scope, 'errors', {
                    where: {
                        clientId: $stateParams.clientId,
                        level: 'ERROR'
                    }
                });
            }]);
})();