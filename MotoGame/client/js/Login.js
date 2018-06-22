//------------------------ 登陆注册模块 ------------------------

// 注册模块跳转
var oDirect = new Director();//实例化导演管理功能

$('.turnRegs').on('click', function() {
	oDirect.turnScene('#Login', '#Register');
});

$('#Sign-Up').on('click', function() {
	oDirect.turnScene('#Register', '#Login');
});