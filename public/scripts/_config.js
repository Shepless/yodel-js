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
                        sessions: ['session-model', function(Session) {
                            return Session.findAll();
                        }]
                    }
                })
                .state('session-info', {
                    url: '/session/:id',
                    templateUrl: 'partials/session-info.html',
                    controller: 'session-info-controller',
                    resolve: {
                        session: ['session-model', '$stateParams', function (Session, $stateParams) {
                            return Session.find($stateParams.id);
                        }]
                    }
                })
                .state('client-info', {
                    url: '/session/:sessionId/client/:clientId',
                    templateUrl: 'partials/client-info.html',
                    controller: 'client-info-controller',
                    resolve: {
                        client: ['client-service', '$stateParams', function (clientService, $stateParams) {
                            return clientService.get($stateParams.sessionId, $stateParams.clientId);
                        }]
                    }
                })
        }]);
})();