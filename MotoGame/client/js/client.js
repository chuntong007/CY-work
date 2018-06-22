var socket = new WebSocket('ws://127.0.0.1:8090');//实例化websocket协议连接服务器

socket.onopen = function() {
	this.onmessage = function(msg) {
		console.log(msg.data);
	}
}