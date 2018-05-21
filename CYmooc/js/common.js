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
	{username: "ln",phonenum: 110,emailsrc: "1221421@qq.com", password: 123,userdate:"2018-05-19T15:22:55.256Z",ranknum:1,integral:0,allintergral:0,balance:0},
	{username:"a123123",phonenum:"13123123123",emailsrc: "1231421@qq.com", password:"123123",userdate:"2018-05-19T15:22:55.256Z",ranknum:1,integral:0,allintergral:0,balance:0}
	/*以上为测试用账户对象*/
];
var aUser = JSON.parse(window.localStorage.getItem('hx180310user')) == null ? aUser : JSON.parse(window.localStorage.getItem('hx180310user'));//获取当前本地存储的账户数据

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
var countRex = /^\w{6,8}$/;
var passRex = /\w{6,20}$/;
var emailRex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// 声明用户注册信息正则表达式

function getReg() {//声明注册功能
	var uCount = document.getElementById('Account').value;
	var uPhon = document.getElementById('PhoneNum').value;
	var vEmail = document.getElementById('Email').value;
	var uPswd = document.getElementById('Password').value;
	var uPswd2 = document.getElementById('Password2').value;
	var uVerf = document.getElementById('verify').value;
	var Verf = document.getElementById('verify-code').innerHTML;
	var uDate = new Date();
	var ary;
	/*获取注册信息输入对象*/

	if (vEmail.match(emailRex) && uCount.match(countRex) && uPhon.match(phonRex) && uPswd.match(passRex) && uVerf) {//判断文本库已填入信息
		for (var i = 0; i < aUser.length; i++) {//循环遍历账户信息数组
			if (aUser[i].username == uCount) {//判断用户名已注册执行语句
				alert('用户名已注册。');
				return getVerify();
			}
			if (aUser[i].phonenum == uPhon) {//判断手机号已注册执行语句
				alert('手机号已注册。');
				return getVerify();
			}
			if (aUser[i].emailsrc == vEmail) {//判断邮箱地址已注册执行语句
				alert('邮箱地址已注册');
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

		ary = new User(uCount, uPhon, uPswd, vEmail, 0, 0, 0, 1, uDate);//手机号账号名都未重复情况下将初始各项参数的注册信息写入数组变量
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
	/*获取登入信息对象*/

	if (uCount && uPswd && uVerf.toLowerCase() == Verf.toLowerCase()) {
		for (var i = 0; i < aUser.length; i++) {//遍历账户数组是否有符合条件账户信息，找到后弹出提示并返回
			if (aUser[i].username == uCount && aUser[i].password == uPswd) {
				alert('登录成功!');
				// appOff('regsiterMask'), appOff('regsiter');//登录成功后调用隐藏遮罩层函数

				window.localStorage.setItem('hx180310nowUser', aUser[i].username);//向本定存储增加一个键名为nowUser值为uCount的数据
				// window.location.href = 'my12306.html';//跳转页面到个人帐号界面
				window.location.reload();
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
		oRegis.children[1].children[0].style.borderBottom = '3px solid #57adfd';
		oRegis.children[1].children[1].onclick = disReg;
		oRegis.children[1].children[1].style.border = 'none';
		oRegis.children[2].style.textAlign = 'center';
		/*切换显示时修改登录注册框样式*/

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
		oRegis.children[1].children[0].style.border = 'none';
		oRegis.children[1].children[1].onclick = '';
		oRegis.children[1].children[1].style.borderBottom = '3px solid #57adfd';
		oRegis.children[2].style.textAlign = '';
		/*切换显示时修改登录注册框样式*/

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
	/*获取传参ID对象*/

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
		uMsg.style.background = 'url(images/icon_wrong.png) no-repeat left';
		uMsg.style.color = '#f00';
	}
}
/*----------------------End正则校验功能----------------------*/

/*----------------------显示登陆状态功能----------------------*/
var oLogin = document.getElementById('Login');
var oRegis = document.getElementById('Regis');
//获取登陆注册按钮对象

function onLogin() {
	oLogin.innerHTML = window.localStorage.getItem('hx180310nowUser') ? '你好！' + window.localStorage.getItem('hx180310nowUser') : oLogin.innerHTML;
	oLogin.style.backgroundImage = window.localStorage.getItem('hx180310nowUser') ? 'url(images/user.png)' : oLogin.style.backgroundImage;
	oLogin.href = window.localStorage.getItem('hx180310nowUser') ? 'personal.html' : oLogin.href;
	oRegis.innerHTML = window.localStorage.getItem('hx180310nowUser') ? '注销' : oRegis.innerHTML;
	/*判断本地存储已有登陆账户修改登陆注册按钮显示*/

	if (window.localStorage.getItem('hx180310nowUser')) {
		oLogin.onclick = '';//修改登陆注册状态后清空登陆按钮原有点击事件

		oRegis.onclick = function() {
			window.localStorage.removeItem('hx180310nowUser');
			window.location.reload();
			//在登陆状态下为注销按钮安装注销刷新页面功能
		}
	}
}

onLogin();//调用执行功能
/*----------------------End 显示登陆状态功能----------------------*/

/*----------------------分页按钮功能----------------------*/
/**
 * [addChild 对象节点追加功能封装]
 * @param {[Object]} obj     [被追加标签内容的节点对象]
 * @param {[string]} TagName [标签名称]
 * @param {[string]} provalue [标签属性值]
 * @param {[prototype]} proto [标签属性]
 * @param {[Object]} Data    [标签内容对象]
 */
function addChild(obj, TagName, Data, provalue, proto) {
	var ochild = document.createElement(TagName);
	ochild[proto] = provalue;
	ochild.innerHTML = Data;

	obj.appendChild(ochild);
}

/**
 * [showCourse 课程追加功能]
 * @param  {[Object]} obj             [被追加打印的对象]
 * @param  {[URL]} CourseImg       [课程封面图片地址]
 * @param  {[Object]} CourseName      [课程名称]
 * @param  {[Object]} CourseDpn       [课程简介]
 * @param  {[Object]} CourseScore     [课程评分]
 * @param  {[Object]} CourseAttention [课程关注度]
 * @return {[type]}                 [description]
 */
function showCourse(obj, CourseImg, CourseName, CourseDpn, CourseScore, CourseAttention) {
	var oLi = document.createElement('LI');
	var oDiv = document.createElement('DIV');
	var oSpan = document.createElement('SPAN');
	var oSpan2 = document.createElement('SPAN');
	//创建追加于课程展示区中的标签对象

	oSpan.innerHTML = '评分：' + CourseScore.toFixed(1);//评分取值保留一位小数进行显示
	oSpan.className = 'score';
	oSpan2.innerHTML = CourseAttention + '人关注';
	oSpan2.className = 'attention';
	//创建评分与关注度节点

	oDiv.className = 'course-Dp';
	addChild(oDiv, 'H4', CourseName);
	addChild(oDiv, 'P', CourseDpn);
	//课程信息简介与名称追加进弹出课程展示弹出div

	addChild(oLi, 'IMG', '', CourseImg, 'src');
	oLi.appendChild(oDiv);
	oLi.appendChild(oSpan);
	oLi.appendChild(oSpan2);
	//按顺序将创建好的对应标签节点追加至Li标签

	obj.appendChild(oLi);
	//将创建好的节点追加打印至页面展示区
}

/**
 * [printCourse 课程打印功能]
 * @param  {[Array]} Ary  [打印数组]
 * @param  {[number]} Star [打印起始下标]
 * @param  {[number]} End  [打印结束下标]
 * @return {[type]}      [description]
 */
function printCourse(Ary, Star, End) {
	for (var i = Star; i < End; i++) {//遍历课程数组
		if (Ary[i]) {//判断遍历下标存在的清空下执行语句
			showCourse(oCoShow.children[0], Ary[i].img, Ary[i].course, Ary[i].description, Ary[i].score, Ary[i].attention);//调用课程打印功能打印课程信息
		}
	}
}


/**
 * [PageFun 分页化打印输出功能]
 * @param {[Array]} ary      [打印数组]
 * @param {[Number]} Size     [单页打印长度]
 * @param {[Function]} addBtn   [分页按钮打印功能]
 * @param {[Function]} showfunc [打印信息功能]
 * @param {[Object]} showObj  [清空对象]
 */
function PageFun(ary, Size, addBtn, showfunc, showObj) {
	var ary;//分页总数据
	var pageSize = Size;//单页长度
	var pageNum = Math.ceil(ary.length / pageSize);//总页数
	var Now = 1;//获取当前页值并取整
	var Star = pageSize * (Now - 1);//单页总数据开始下标
	var End = pageSize * Now;//单页总数据结束下标	
	var cPage = document.getElementById('contentPage');//获取分页按钮标签父级对象
	var cbtn = document.getElementById('pageBtn');

	cbtn.innerHTML = '';//安装分页按钮前先清空已有的按钮

	for (var i = 1; i <= pageNum; i++) {
		/*var cli = document.createElement('li');
		cli.innerHTML = i;
		cbtn.appendChild(cli);*/
		addBtn(cbtn, 'LI', i);
	}//循环创建分页按钮对象追加进按钮标签中

	var cli = cbtn.getElementsByTagName('li');

	showfunc(ary, Now - 1, Size);//预先打印第一页课程

	cPage.onclick = function(e) {
		var event = e || window.event;
		var target = event.target || ararguments.srcElement;
		//获取事件对象兼容ie

		if (target.className == 'lastPage') {//上一页按钮
			if (Now == 1) {//当前页若为第一页则退出功能
				return alert('已是第一页了！');
			}
			Now--;
			Star = pageSize * (Now - 1);//单页总数据开始下标
			End = pageSize * Now;//单页总数据结束下标

			for (var i = 0; i < cli.length; i++) {
				if (cli[i].innerHTML == Now) {
					cli[i].style.background = '#999';
				}
				else {
					cli[i].style.background = '#bcb7bf';
				}
			}
			/*遍历分页按钮标签修改当前页按钮背景色*/

			showObj.innerHTML = '';//清空表格已有课程信息
			showfunc(ary, Star, End);//打印对应页数课程
		}

		if (target.className == 'nextPage') {//下一页按钮
			if (Now == pageNum) {//当前页若为最后一页则弹出提示退出功能
				return alert('已经是最后一页了！');
			}
			Now++;
			Star = pageSize * (Now - 1);//单页总数据开始下标
			End = pageSize * Now;//单页总数据结束下标


			for (var i = 0; i < cli.length; i++) {
				if (cli[i].innerHTML == Now) {
					cli[i].style.background = '#999';
				}
				else {
					cli[i].style.background = '#bcb7bf';
				}
			}
			/*遍历分页按钮标签修改当前页按钮背景色*/

			showObj.innerHTML = '';//清空表格已有课程信息
			showfunc(ary, Star, End);//打印对应页数课程

		}

		if (target.tagName == 'LI') {//分页按钮标签
			Now = parseInt(target.innerHTML);//获取当前页值并取整
			Star = pageSize * (Now - 1);//单页总数据开始下标
			End = pageSize * Now;//单页总数据结束下标
			


			for (var i = 0; i < cli.length; i++) {
				cli[i].style.background = '#bcb7bf';
			}
			target.style.background = '#999';
			/*遍历分页按钮标签修改当前按钮背景色*/

			showObj.innerHTML = '';//清空表格已有课程信息
			showfunc(ary, Star, End);//打印对应页数课程
		}
	}

}
/*----------------------End 分页按钮功能----------------------*/

/*----------------------搜索功能----------------------*/
var oseText = document.getElementById('SearchText');
var oseBtn = document.getElementById('SearchBtn');
var aseCourse = [];
/*获取搜索功能所需对象声明用于存储搜索课程的变量*/

/**
 * [searCh 课程搜索存储功能]
 * @param  {[string]} obj [用户输入的搜索信息]
 * @return {[type]}     [description]
 */
function searCh(obj) {
	for (var i = 0; i < aCourse.length; i++) {
		if (aCourse[i].course.toLowerCase().indexOf(obj.toLowerCase()) != -1) {//将搜索信息和遍历课程转化为小写忽略大小写区别进行遍历
			aseCourse.push(aCourse[i]);//将搜索到符合条件的课程存入数组
		}
	}

	window.localStorage.setItem('hx180310seCourse', JSON.stringify(aseCourse));//将搜索出来的课程导入本地存储
}

oseText.onkeypress = function(e) {
	var e = e || window.event;
	/*兼容IE*/

	if ((e.code == 'NumpadEnter' || e.code == 'Enter') && oseText.value) {//判断搜索框已输入信息且按下回车键执行语句
		searCh(oseText.value);//调用课程搜索功能检索符合条件课程信息

		window.location.href = 'course.html';//跳转课程中心页面
	}
	if ((e.code == 'NumpadEnter' || e.code == 'Enter') && !oseText.value) {
		alert('请输入课程信息进行查找!');
	}
	// console.log(e);
}

oseBtn.onclick = function() {
	if (oseText.value) {//判断搜索框已输入信息且按下回车键执行语句
		searCh(oseText.value);//调用课程搜索功能检索符合条件课程信息

		window.location.href = 'course.html';//跳转课程中心页面
	}
	else {
		alert('请输入课程信息进行查找!');
	}
}
/*----------------------End 搜索功能----------------------*/


//-------------------------选项卡功能-------------------------
/**
 * [turnTab 选项卡切换显示]
 * @param  {[string]} obj1 [选项卡ID]
 * @param  {[string]} obj2 [切换显示对象ID]
 * @param  {[stylesheet-class]} style [点击后显示的样式类名]
 * @return {[type]}      [description]
 */
function turnTab(obj1, obj2, style) {
	var oTab = document.getElementById(obj1);
	var oContent = obj2 ? document.getElementById(obj2) : false;
	// 获取选项切换过程中需要操作的选项卡对象和展示区隐藏显示对象

	oTab.onclick = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		//兼容IE事件委托

		if (target.tagName == 'LI' && target.className != 'nowTab') {//判断点击选项不为当前状态
			for (var i = 0; i < oTab.children.length; i++) {
				oTab.children[i].className = '';//遍历清空所有选项当前样式；
				oTab.children[i].index = i;//为每个选项添加属性保存下标序号
			}

			target.className = style;//为当前点击选项安装样式类

			if (!oContent) {
				return;//当切换对象未传参则退出函数不执行后续功能
			}

			for (var i = 0; i < oContent.children.length; i++) {//遍历展示区对象
				if (i == target.index) {//判断遍历顺序符合当前点击选项序号属性
					oContent.children[i].style.display = 'block';//显示对应展示对象
				}
				else {
					oContent.children[i].style.display = 'none';//隐藏展示区
				}
			}
		}
	}
}
//-------------------------End选项卡功能-------------------------

//-------------------------课程点击跳转功能-------------------------
var nowCourse = '';//用于保存当前点击课程名

/**
 * [turnCourse 课程点击跳转]
 * @param  {[string]} obj [课程展示对象ID]
 * @return {[type]}     [description]
 */
function turnCourse(obj) {
	var oShow = document.getElementById(obj);

	oShow.onclick = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		//兼容IE

		if (target.tagName != 'DIV' && target.tagName != 'UL') {//判断触发点击事件标签不为LI之外的对象获取标签中的课程名
			nowCourse = target.tagName == 'LI' ? target.getElementsByTagName('H4')[0].innerText : target.parentElement.getElementsByTagName('H4')[0].innerText;//当点击对象为LI直接获取子集课程名，否则返回父级进行获取

			for (var i = 0; i < aCourse.length; i++) {
				if (aCourse[i].course.indexOf(nowCourse) != -1) {
					window.localStorage.setItem('hx180310nowCourse', JSON.stringify(aCourse[i]));//遍历出当前点击课程对象存入本地
					break;
				}
			}

			window.location.href = 'learning.html';//跳转页课程详情页打印当前课程信息
		}
	}
}
//-------------------------End 课程点击跳转功能-------------------------

//-------------------------课程详情动态显示功能-------------------------
function showCourseMsg() {
	if (!window.localStorage.getItem('hx180310nowCourse')) {
		return;//当本地存储没有课程对象则退出函数
	}
	var nowCourse = JSON.parse(window.localStorage.getItem('hx180310nowCourse'));

	var oTitle = document.getElementsByTagName('TITLE');
	var oBread = document.getElementById('Breadcrumbs');
	var oCtitle = document.getElementById('CourseTitle');
	var oTeacher = document.getElementById('UserName');
	var oNodus = document.getElementById('CourseNodus');
	var oDate = document.getElementById('CoursePeriod');
	var oAtten = document.getElementById('CourseAtten');
	var oDescr = document.getElementById('CoDescription');
	var oPic = document.getElementById('picture');
	// 获取动态打印课程信息的对象

	oTitle[0].innerHTML = nowCourse.course + '-传一慕课';
	oBread.innerHTML = nowCourse.technology + '&nbsp;>&nbsp;' + nowCourse.classify + '&nbsp;>&nbsp;' + nowCourse.course;
	oCtitle.innerHTML = nowCourse.course;
	oTeacher.innerHTML = nowCourse.teacher;
	oNodus.innerHTML = nowCourse.nodus;
	oAtten.innerHTML = nowCourse.attention;
	oDescr.innerHTML = nowCourse.description;
	oPic.innerHTML = '';
	//给对应节点添加课程信息

	addChild(oPic, 'img', null, nowCourse.img, 'src');//调用节点追加功能给章节图片区添加课程图片

}
//-------------------------End 课程详情动态显示功能-------------------------

/*----------------------判断个人页面非法访问跳转功能----------------------*/
function userType() {
	if (window.localStorage.getItem('hx180310nowUser')) {
		return;
	}
	else {
		window.onload = alert('请先登入账号');
		window.location.href = 'index.html';
	}
}
/*----------------------End 判断个人页面非法访问跳转功能----------------------*/
