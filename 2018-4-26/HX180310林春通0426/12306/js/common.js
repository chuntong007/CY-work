/*公共区js脚本*/

/*----------------------div关闭功能----------------------*/
function appOff(obj) {//声明函数定义需要用来关闭的元素ID为参数obj
	document.getElementById(obj).style.display = 'none';
}
/*----------------------End div关闭功能----------------------*/

/*----------------------div显示功能----------------------*/
function appBlock(obj) {//声明函数定义需要用来显示的元素ID为参数obj
	document.getElementById(obj).style.display = 'block';
}
/*----------------------End div显示功能----------------------*/


/*----------------------登录注册功能----------------------*/
var aUser = [//声明存储用户信息数组
	{username: 'ln', phonenum: 110, password: 123},
	{username: 'ln2', phonenum: 1103, password: 123},
	{username: 'ln3', phonenum: 1102, password: 123},
	/*以上为测试用账户对象*/
];

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

getVerify();

function getReg() {//声明注册功能
	var uCount = document.getElementById('Account').value;
	var uPhon = document.getElementById('PhoneNum').value;
	var uPswd = document.getElementById('Password').value;
	var uPswd2 = document.getElementById('Password2').value;
	var uVerf = document.getElementById('verify').value;
	var Verf = document.getElementById('verify-code').innerHTML;
	var ary;
	// 声明变量获取注册信息、验证码、收集信息并置入的数组变量。



	if (uCount && uPhon && uPswd && uVerf) {//判断文本库已填入信息
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

		alert('注册成功');
		console.log(aUser);
		getVerify();
	}
	else {
		alert('请将注册信息补全。');
		getVerify();
	}

}

function getlogin() {//声明登录账户功能
	var uCount = document.getElementById('Account').value;
	var uPswd = document.getElementById('Password').value;

	if (uCount && uPswd) {
		for (var i = 0; i < aUser.length; i++) {//遍历账户数组是否有符合条件账户信息，找到后弹出提示并返回
			if (aUser[i].username == uCount && aUser[i].password == uPswd) {
				alert('登录成功!');
				appOff('regsiterMask'), appOff('regsiter');//登录成功后调用隐藏遮罩层函数
				return document.getElementById('userName').innerHTML = aUser[i].username;//登录成功后登录按钮名称变为帐户名。
			}
		}
		alert('账号或密码输入错误！');
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
var uPtrtext = document.getElementById('Password2');
var ulogBtn = document.getElementById('logNbtn');
var uRegbtn = document.getElementById('Regsbtn');
var uTubtn = document.getElementById('turnBtn');
// 提前声明好输入框对象获取变量

function disReg() {
	if (uPhtext.style.display == 'block' && uPtrtext.style.display == 'block' && ulogBtn.style.display == 'none') {
		uPhtext.style.display = 'none';
		uPtrtext.style.display = 'none';
		ulogBtn.style.display = 'block';
		uRegbtn.style.display = 'none';
		uTubtn.innerHTML = '没有账号请点击注册跳转';
	}
	else {
		uPhtext.style.display = 'block';
		uPtrtext.style.display = 'block';
		ulogBtn.style.display = 'none';
		uRegbtn.style.display = 'block';
		uTubtn.innerHTML = '已有账号请点击登录跳转';
	}
}
/*----------------------End 登录注册跳转显示功能----------------------*/
