(function () {
    'use strict';

    angular.module('yodel')
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('dashboard', {
                    url: '/',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'dashboard-controller',
                    resolve: {
                        sessions: ['session-service', function(sessionService) {
                            return sessionService.getAll();
                        }]
                    }
                })
                .state('session-info', {
                    url: '/session/:id',
                    templateUrl: 'partials/session-info.html',
                    controller: 'session-info-controller',
                    resolve: {
                        session: ['session-service', '$stateParams', function (sessionService, $stateParams) {
                            return sessionService.get($stateParams.id);
                        }]
                    }
                })
        }]);
})();