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
		ary = new User(uCount.val(), uPaswd.val(), uPhon.val());//将注册信息导入对象
		ary.QQid = ary.QQid();//动态生成QQ号码
		
		aUser.push(ary);

		window.localStorage.setItem('hx180310QQuser', JSON.stringify(aUser));//将注册信息存入本地
		window.localStorage.setItem('hx180310QQnoWuser', ary.QQid);//将注册信息存入本地

		alert('注册成功' + ',您的QQ号为：' + ary.QQid + ' 请及时进行记录！');

		uCount.val('');
		uPaswd.val('');
		uPhon.val('');
		//清空输入框

		$('.login').fadeToggle(300);
		$('.register').fadeToggle(300);
		$('input:not("#PhType, #Register")').val('');
		$('#userNameL').val(window.localStorage.getItem('hx180310QQnoWuser'));

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
				window.localStorage.setItem('hx180310QQnoWuser', this.QQid);//向本地存储添加当前登录账户QQ号
				
				alert('登录成功');

				uCount.val('');
				uPswd.val('');
				//清空输入框

				return;
			}
		});
	}
});

// 注册按钮跳转显示
$('.turnRegis').click(function() {
	$('.login').fadeToggle(300);
	$('.register').fadeToggle(300);
	$('input:not("#PhType, #Register")').val('');
});

// 正则校验注册信息
$('#userNameR').bind('blur input propertychange', function() {//昵称校验
	aUser = window.localStorage.getItem('hx180310QQuser') ? JSON.parse(window.localStorage.getItem('hx180310QQuser')) : aUser;

	for (var i = 0; i < aUser.length; i++) {
		if ($(this).val() == aUser[i].username) {
			$(this).next().removeClass('ok').addClass('error').html('昵称重复');
			return
		}
	}

	if ($(this).val()){
		$(this).next().removeClass('error').addClass('ok').html('昵称可用');
	}
	else {
		$(this).next().removeClass('ok').addClass('error').html('昵称不可以为空');
	}
});

$('#passWordR').bind('blur input propertychange', function() {//密码校验
	aUser = window.localStorage.getItem('hx180310QQuser') ? JSON.parse(window.localStorage.getItem('hx180310QQuser')) : aUser;

	if (!$(this).val().match(passRex) && $(this).val()) {
		$(this).next().removeClass('ok').addClass('error');
	}
	else if ($(this).val().match(passRex)){
		$(this).next().removeClass('error').addClass('ok');
	}
	else {
		$(this).next().removeClass('ok').addClass('error').html('昵称不可以为空');
	}
})

$('#phoneNum').bind('blur input propertychange', function() {//手机号校验
	aUser = window.localStorage.getItem('hx180310QQuser') ? JSON.parse(window.localStorage.getItem('hx180310QQuser')) : aUser;

	$.each(aUser, function(index, item) {
		if ($('#phoneNum').val()) {
			if ($('#phoneNum').val() == item.phonenum) {
				$('.phonenum').removeClass('ok').addClass('error').text('手机号重复');
				return false;
			}
			if (!$('#phoneNum').val().match(phoneRex) && $('#phoneNum').val()) {
				$('.phonenum').removeClass('ok').addClass('error').text('手机号有误');
				return false;
			}
			if ($('#phoneNum').val().match(phoneRex)) {
				$('.phonenum').removeClass('error').addClass('ok').text('手机号可用');
			}
		}
		else {
				$('.phonenum').removeClass('ok').addClass('error').text('手机号不能为空');
			}
	})
});
// End 正则校验注册信息

// --------------------End 登录注册--------------------