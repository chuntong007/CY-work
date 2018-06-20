var UserDAO = require('./UserDAO.js');//声明调用数据操作封装对象
var ws = require('ws').Server;//创建websocket服务器对象
var websocket = new ws({ip:'127.0.0.1', port:8090});//实例化服务器对象设置IP地址与端口

websocket.on('connection', function(client) {
	console.log('on line....');
	client.send('登录成功');

	client.on('message', function(msg) {//为客户端安装信息收发事件
		var message = JSON.parse(msg);//通过JSON解析数据包

		if (message.type == 'Login') {//处理登陆请求包数据
			var user = message.user;
			var pwd = message.pwd;
			console.log(message);

			UserDAO.login(user, pwd, function(result, obj) {
				if (result == 'success') {
					//登陆成功

					var loginRespBag = {//回调函数判断登陆请求成功创建结果数据包
						type: 'Login',
						result: 1,
						obj: obj
					}

					client.send(JSON.stringify(loginRespBag));//将登陆成功数据包发给客户端
				}
				else {
					var loginRespBag = {
						type: 'Login',
						result: 0
					}

					client.send(JSON.stringify(loginRespBag));
				}
			});
		}
	});
});