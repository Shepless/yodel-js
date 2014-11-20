(function () {
    var serverIp = '{{serverIp}}',
        port = parseInt('{{port}}'),
        sessionId = '{{sessionId}}',
        moduleName = '{{moduleName}}',
        bridgeType = parseInt('{{bridgeType}}'),
        bridge,
        clientId = window.localStorage.getItem(sessionId);

    if (clientId) {
        bridge = io('http://' + serverIp + ':' + port + '/' + sessionId,
            { query: 'isClient=true&clientId=' + clientId });
    } else {
        bridge = io('http://' + serverIp + ':' + port + '/' + sessionId, { query: 'isClient=true' });
    }

    bridge.on('new_client', function (newClient) {
        bridge.off('new_client');
        clientId = newClient.id;
        window.localStorage.setItem(sessionId, clientId);
    });

    bridge.connect();

    function emit(level, actor, arguments) {
        bridge.emit('client_message', {
            clientId: clientId,
            level: level,
            actor: actor,
            arguments: arguments
        });
    }

    try {
        var angularModule = angular.module(moduleName);
    } catch (e) {
        bridge.disconnect();
    }

    if (angularModule) {
        angularModule.factory('YodelHttpInterceptor', [function () {
            return {
                request: function (config) {
                    emit('INFO', '$http.request', config);
                    return config;
                },
                response: function (config) {
                    emit('INFO', '$http.response', config);
                    return config;
                },
                requestError: function (config) {
                    emit('ERROR', '$http.requestError', config);
                    return config;
                },
                responseError: function (config) {
                    emit('ERROR', '$http.responseError', config);
                    return config;
                }
            };
        }]);

        angularModule.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
            $httpProvider.interceptors.push('YodelHttpInterceptor');

            $provide.decorator('$log', ['$delegate', function ($delegate) {
                var originalLog = $delegate.log,
                    originalInfo = $delegate.info,
                    originalWarn = $delegate.warn,
                    originalError = $delegate.error,
                    originalDebug = $delegate.debug;

                $delegate.log = function () {
                    emit('LOG', '$log.log', arguments);
                    originalLog.apply(originalLog, arguments);
                };

                $delegate.info = function () {
                    emit('INFO', '$log.info', arguments);
                    originalInfo.apply(originalInfo, arguments);
                };

                $delegate.warn = function () {
                    emit('WARN', '$log.warn', arguments);
                    originalWarn.apply(originalLog, arguments);
                };

                $delegate.error = function () {
                    emit('ERROR', '$log.error', arguments);
                    originalError.apply(originalError, arguments);
                };

                $delegate.debug = function () {
                    emit('DEBUG', '$log.debug', arguments);
                    originalDebug.apply(originalDebug, arguments);
                };

                return $delegate;
            }]);
        }]);
    }
})();