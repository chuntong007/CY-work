// --------------------登录注册--------------------
var aUser = [
	{username: "ln", phonenum: 110, password: "123", QQid: "165857894"}
];
var aUser = JSON.parse(window.localStorage.getItem('hx180310QQuser')) == null ? aUser : JSON.parse(window.localStorage.getItem('hx180310QQuser'));

// 注册功能
$('#Register').click()
// --------------------End 登录注册--------------------