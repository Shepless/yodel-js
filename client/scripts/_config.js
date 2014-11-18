(function () {
    'use strict';

    angular.module('node-console')
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '',
                    templateUrl: 'client/partials/home.html',
                    controller: 'home-controller',
                    resolve: {
                        sessions: ['session', function(session) {
                            return session.getAll();
                        }]
                    }
                })
        }]);
})();