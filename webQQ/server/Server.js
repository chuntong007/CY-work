var UserDAO = require('./UserDAO.js');//声明调用数据操作封装对象
var ws = require('ws').Server;//创建websocket服务器对象
var websocket = new ws({ip:'127.0.0.1', port:8090});//实例化服务器对象设置IP地址与端口

websocket.on('connection', function(client) {
	console.log('on line....');
	client.send('登录成功');
});