(function () {
    'use strict';

    angular.module('yodel.sessions')
        .directive('newSession', ['session-model', function (Session) {
            return {
                restrict: 'E',
                scope: true,
                templateUrl: 'partials/new-session.html',
                link: function ($scope) {
                    $scope.visible = false;

                    $scope.showCreateSession = function () {
                        $scope.visible = true;
                        $scope.newSession = {
                            name: '',
                            bridgeType: 0
                        };
                    };

                    $scope.hideCreateSession = function () {
                        $scope.visible = false;
                        $scope.newSession = null;
                    };

                    $scope.setBridgeType = function (bridgeType) {
                        $scope.newSession.bridgeType = bridgeType;
                    };

                    $scope.createNewSession = function () {
                        Session.create($scope.newSession).then(function () {
                            $scope.visible = false;
                        });
                    };
                }
            }
        }]);
})();