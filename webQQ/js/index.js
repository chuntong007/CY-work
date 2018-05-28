// --------------------登录注册--------------------
var aUser = [
	{username: "ln", phonenum: 110, password: "123", QQid: "165857894"}
];
var aUser = JSON.parse(window.localStorage.getItem('hx180310QQuser')) == null ? aUser : JSON.parse(window.localStorage.getItem('hx180310QQuser'));

var phoneRex = /^[1][3-9]\d{9}$/;
var passRex = /\w{8,16}$/;
//注册信息正则验证

// 点击注册功能
$('#Register').click(function() {
	var uCount = $('#userNameR');
	var uPaswd = $('#passWordR');
	var uPhon = $('#phoneNum');
	var ary;
	// 获取注册信息输入对象
	if (uCount.val() && uPaswd.val().match(passRex) && uPhon.val().match(phoneRex)) {
		ary = new User(uCount, uPaswd, uPhon);//将注册信息导入对象
		ary.QQid = ary.QQid();//动态生成QQ号码
		
		aUser.push(ary);

		window.localStorage.setItem('hx180310QQuser', JSON.stringify(aUser));//将注册信息存入本地

		alert('注册成功' + ',您的QQ号为：' + ary.QQid + ' 请及时进行记录！');

		uCount.val('');
		uPaswd.val('');
		uPhon.val('');
		//清空输入框

		$('.register').css('display', 'none');
		$('.login').css('display', 'block');
		//跳转显示登录界面
	}

});

// 点击登录功能
$('#Login').click(function() {
	var uCount = $('#userNameL');
	var uPswd = $('#passWordL');
	// 获取登录信息对象

	if (uCount.val() && uPswd.val()) {
		$(aUser).each(function() {
			if ((uCount.val() == this.QQid || uCount.val() == this.phonenum) && this.password == uPswd.val()) {
				window.localStorage.setItem('hx180310QQnowuser', this.QQid);//向本地存储添加当前登录账户QQ号
				
				alert('登录成功');

				uCount.val('');
				uPswd.val('');
				//清空输入框

				return;
			}
		});
	}
});
// --------------------End 登录注册--------------------