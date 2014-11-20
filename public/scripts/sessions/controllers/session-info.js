(function () {
    'use strict';

    angular.module('yodel.sessions')
        .controller('session-info-controller', ['$scope', '$stateParams', 'session-model',
            function ($scope, $stateParams, Session) {
                Session.bindOne($scope, 'session', $stateParams.id);
            }]);
})();