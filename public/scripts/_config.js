(function () {
    'use strict';

    angular.module('yodel')
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('dashboard', {
                    url: '',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'dashboard-controller',
                    resolve: {
                        sessions: ['session-service', function(sessionService) {
                            return sessionService.getAll();
                        }]
                    }
                })
        }]);
})();