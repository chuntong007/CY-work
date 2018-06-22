var ws = require('ws').Server;//创建websocket协议服务器对象
var socket = new ws({ip: '127.0.0.1', port: '8090'});//实例化设置服务器地址参数
var UserDAO = require('./UserDAO.js');

socket.on('connection', function(client) {
	console.log('Success..........');

	client.send('OK');

	client.onclose = function() {
		console.log('outting...');
	}
});