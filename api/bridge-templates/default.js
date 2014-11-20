(function () {
    var serverIp = '{{serverIp}}',
        port = parseInt('{{port}}'),
        sessionId = '{{sessionId}}',
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

    console.log = function () {
        bridge.emit('client_message', {clientId: clientId, data: arguments, level: 'LOG'});
    };

    console.warn = function () {
        bridge.emit('client_message', {clientId: clientId, data: arguments, level: 'WARN'});
    };

    console.error = function () {
        bridge.emit('client_message', {clientId: clientId, data: arguments, level: 'ERROR'});
    };

    window.onerror = function (e) {
        bridge.emit('client_message', {clientId: clientId, data: { message: e.message, foo: e.stack }, level: 'ERROR'});
    };
})();