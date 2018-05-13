/*----------------------元素点击切换隐藏显示功能----------------------*/
/**
 * [turnDisp 切换隐藏显示]
 * @param  {[string]} iD [切换隐藏显示对象ID]
 * @return {[type]}    [description]
 */
function turnDisp(iD) {
	var obj = document.getElementById(iD);//声明变量获取通过传参获取ID值的元素对象

	if (obj.style.display == 'block') {
		return obj.style.display = 'none';
	}//点击事件触发后判断ID对象为显示状态时转变为隐藏
	if (obj.style.display == 'none') {
		return obj.style.display = 'block';
	}//点击事件触发后判断ID对象为隐藏状态时转变为显示
}
/*----------------------End 元素点击切换隐藏显示功能----------------------*/

/*----------------------登录注册功能----------------------*/
var aUser = [//声明存储用户信息数组
	{"username":"ln","phonenum":110,"password":123},
	{"username":"a123123","phonenum":"13123123123","password":"123123"}
	/*以上为测试用账户对象*/
];
var wUser = JSON.parse(window.localStorage.getItem('hx180310user')) == null ? aUser : JSON.parse(window.localStorage.getItem('hx180310user'));//获取当前本地存储的账户数据

function getVerify() {//声明刷新验证码函数
	var sNum = '1234567890qwertyuiopasdfghjklzxcvbnm';
	var result = '';

	while(true) {
		var index = Math.floor(Math.random() * sNum.length);

		if (result.indexOf(sNum[index]) == -1) {
			result += sNum[index];
			if (result.length == 4) {
				break;
			}
		}
	}

	document.getElementById('verify-code').innerHTML = result;
}

var phonRex = /^[1][3-9]\d{9}$/;
var countRex = /\w{6,30}$/;
var passRex = /\w{6,20}$/;
	// 声明变量获取注册信息、验证码、收集信息并置入的数组变量。

function getReg() {//声明注册功能
	var uCount = document.getElementById('Account').value;
	var uPhon = document.getElementById('PhoneNum').value;
	var uPswd = document.getElementById('Password').value;
	var uPswd2 = document.getElementById('Password2').value;
	var uVerf = document.getElementById('verify').value;
	var Verf = document.getElementById('verify-code').innerHTML;
	var ary;
	

	aUser = JSON.parse(window.localStorage.getItem('hx180310user')) == null ? aUser : JSON.parse(window.localStorage.getItem('hx180310user'));//赋值用户数组进行三目运算判断，当本地存储没有用户数据赋为原先值，否则赋值本地用户数组数据。



	if (uCount.match(countRex) && uPhon.match(phonRex) && uPswd.match(passRex) && uVerf) {//判断文本库已填入信息
		for (var i = 0; i < aUser.length; i++) {//循环遍历账户信息数组
			if (aUser[i].username == uCount) {//判断用户名已注册执行语句
				alert('用户名已注册。');
				return getVerify();
			}
			if (aUser[i].phonenum == uPhon) {//判断手机号已注册执行语句
				alert('手机号已注册。');
				return getVerify();
			}
			if (uVerf != Verf) {//判断验证码输入错误后弹出提示并调用函数重新生成验证码。
				alert('验证码输入错误');
				return getVerify();
			}
			if (uPswd != uPswd2) {//判断两次密码输入不一致执行语句。
				alert('密码输入不一致');
				return getVerify();
			}
		}

		ary = new User(uCount, uPhon, uPswd);//手机号账号名都未重复情况下将注册信息写入数组变量
		aUser.push(ary);//将账号数组写入第一维存储数组变量
		window.localStorage.setItem('hx180310user', JSON.stringify(aUser));//将存储用户信息的数组变量以数组形式存储于本地空间。

		alert('注册成功');
		console.log(aUser);
		disReg();
		getVerify();
	}
	else {
		alert('请将注册信息补全。');
		getVerify();
	}

}
// 注册功能结束

function getlogin() {//声明登录账户功能
	var uCount = document.getElementById('Account').value;
	var uPswd = document.getElementById('Password').value;
	var uVerf = document.getElementById('verify').value;
	var Verf = document.getElementById('verify-code').innerHTML;

	if (uCount && uPswd && uVerf.toLowerCase() == Verf.toLowerCase()) {
		for (var i = 0; i < wUser.length; i++) {//遍历账户数组是否有符合条件账户信息，找到后弹出提示并返回
			if (wUser[i].username == uCount && wUser[i].password == uPswd) {
				alert('登录成功!');
				// appOff('regsiterMask'), appOff('regsiter');//登录成功后调用隐藏遮罩层函数

				window.localStorage.setItem('hx180310nowUser', wUser[i].username);//向本定存储增加一个键名为nowUser值为uCount的数据
				window.location.href = 'my12306.html';//跳转页面到个人帐号界面
				return;

				// return document.getElementById('userName').innerHTML = aUser[i].username;//登录成功后登录按钮名称变为帐户名。
			}
		}
		alert('账号或密码输入错误！');
		getVerify();
	}
	else if (uVerf.toLowerCase() != Verf.toLowerCase() && uCount && uPswd) {//判断帐户密码已输入验证码输入错误提示下弹出提示
		alert('验证码输入错误');
		getVerify();
	}
	else {
		alert('请输入账号密码！');
		getVerify();
	}

}
/*----------------------End 登录注册功能----------------------*/

/*----------------------登录注册跳转显示功能----------------------*/
var uPhtext = document.getElementById('PhoneNum');
var uEmail = document.getElementById('Email');
var uPtrtext = document.getElementById('Password2');
var ulogBtn = document.getElementById('logNbtn');
var uRegbtn = document.getElementById('Regsbtn');
var uTubtn = document.getElementById('turnBtn');
var uMsg = document.getElementById('phonMsg');
var AMsg = document.getElementById('countMsg');
var PMsg = document.getElementById('passMsg');
// 提前声明好输入框对象获取变量

function disReg() {
	var oRegis = document.getElementById('register');
	/*获取登录注册框对象*/

	if (uPhtext.style.display == 'inline-block' && uEmail.style.display == 'inline-block'　&& uPtrtext.style.display == 'inline-block' && ulogBtn.style.display == 'none') {
		oRegis.children[1].children[0].onclick = '';
		oRegis.children[1].children[1].onclick = disReg;
		oRegis.children[2].style.textAlign = 'center';
		uPhtext.parentElement.style.display = 'none';
		uEmail.parentElement.style.display = 'none';
		uPtrtext.parentElement.style.display = 'none';
		ulogBtn.style.display = 'inline-block';
		uRegbtn.style.display = 'none';
		uMsg.style.display = 'none';
		AMsg.style.display = 'none';
		PMsg.style.display = 'none';
	}
	else {
		oRegis.children[1].children[0].onclick = disReg;
		oRegis.children[1].children[1].onclick = '';
		oRegis.children[2].style.textAlign = '';
		uPhtext.parentElement.style.display = 'inline-block';
		uEmail.parentElement.style.display = 'inline-block';
		uPtrtext.parentElement.style.display = 'inline-block';
		ulogBtn.style.display = 'none';
		uRegbtn.style.display = 'inline-block';
		uMsg.style.display = 'inline-block';
		AMsg.style.display = 'inline-block';
		PMsg.style.display = 'inline-block';
	}

	document.getElementById('Account').value = '';
	document.getElementById('PhoneNum').value = '';
	document.getElementById('Password').value = '';
	document.getElementById('Password2').value = '';
	document.getElementById('verify').value = '';
	// 点击跳转显示后自动清空输入框信息。
}
/*----------------------End 登录注册跳转显示功能----------------------*/

/*----------------------正则校验功能----------------------*/
/**
 * [rexTest 正则验证后提示信息功能]
 * @param  {[Id]} inputId [获取输入框Id]
 * @param  {[Id]} msgId   [验证提示框Id]
 * @param  {[字符串]} msg     [验证性信息名称，例如'手机号']
 * @param  {[正则表达式对象]} rex     [用以验证对应id输入框的验证规则]
 * @return {[type]}         [description]
 */
function rexTest(inputId, msgId, msg, rex) {//手机号校验信息提示功能
	var uPhon = document.getElementById(inputId).value;
	var uMsg = document.getElementById(msgId);

	if (uPhon.match(rex)) {//判断手机号格式正确显示样式
		uMsg.innerHTML = msg + '合法';
		uMsg.style.background = '';
		uMsg.style.color = '#0f0';
	}
	else {//当格式错误样式信息修改
		uMsg.innerHTML = '请输入正确的' + msg;
		uMsg.style.background = 'url(images/icon_wrong.png) no-repeat left';
		uMsg.style.color = '#f00';
	}
}

/**
 * [passTest 密码校验提示功能]
 * @param  {[Id]} inputId  [获取输入框id]
 * @param  {[Id]} msgId    [获取信息提示框id]
 * @param  {[Id]} inputId2 [获取对比输入框id]
 * @param  {[string]} msg      [正确提示信息]
 * @param  {[string]} msg2     [错误提示信息]
 * @return {[type]}          [description]
 */
function passTest(inputId, msgId, inputId2, msg, msg2) {//手机号校验信息提示功能
	var uPass = document.getElementById(inputId).value;
	var uPass2 = document.getElementById(inputId2).value;
	var uMsg = document.getElementById(msgId);

	if (uPass == uPass2) {//判断手机号格式正确显示样式
		if (!uPass && !uPass2) {//判断手机号格式正确显示样式
			uMsg.innerHTML = '密码不许为空';
			uMsg.style.background = '';
			uMsg.style.color = '#f00';
			return;
		}
		uMsg.innerHTML = msg;
		uMsg.style.background = '';
		uMsg.style.color = '#0f0';
	}
	else {//当格式错误样式信息修改
		uMsg.innerHTML = msg2;
		uMsg.style.background = 'url(img/icon_wrong.png) no-repeat left';
		uMsg.style.color = '#f00';
	}
}
/*----------------------End正则校验功能----------------------*/