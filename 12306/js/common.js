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


/*----------------------元素点击切换隐藏显示功能----------------------*/
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
var uPtrtext = document.getElementById('Password2');
var ulogBtn = document.getElementById('logNbtn');
var uRegbtn = document.getElementById('Regsbtn');
var uTubtn = document.getElementById('turnBtn');
var uMsg = document.getElementById('phonMsg');
var AMsg = document.getElementById('countMsg');
var PMsg = document.getElementById('passMsg');
// 提前声明好输入框对象获取变量

function disReg() {
	if (uPhtext.style.display == 'inline-block' && uPtrtext.style.display == 'inline-block' && ulogBtn.style.display == 'none') {
		uPhtext.parentElement.style.display = 'none';
		uPtrtext.parentElement.style.display = 'none';
		ulogBtn.style.display = 'inline-block';
		uRegbtn.style.display = 'none';
		uMsg.style.display = 'none';
		AMsg.style.display = 'none';
		PMsg.style.display = 'none';
		uTubtn.innerHTML = '没有账号请点击注册跳转';
	}
	else {
		uPhtext.parentElement.style.display = 'inline-block';
		uPtrtext.parentElement.style.display = 'inline-block';
		ulogBtn.style.display = 'none';
		uRegbtn.style.display = 'inline-block';
		uMsg.style.display = 'inline-block';
		AMsg.style.display = 'inline-block';
		PMsg.style.display = 'inline-block';
		uTubtn.innerHTML = '已有账号请点击登录跳转';
	}

	document.getElementById('Account').value = '';
	document.getElementById('PhoneNum').value = '';
	document.getElementById('Password').value = '';
	document.getElementById('Password2').value = '';
	document.getElementById('verify').value = '';
	// 点击跳转显示后自动清空输入框信息。
}
/*----------------------End 登录注册跳转显示功能----------------------*/

/*----------------------执行注销账户跳转功能----------------------*/
function RemoveUser() {
	window.localStorage.removeItem('hx180310nowUser');//移除本地存储中的账户键名
	window.location.href = '12306.html';
}
/*----------------------End执行注销账户跳转功能----------------------*/


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
		uMsg.style.background = 'url(img/icon_wrong.png) no-repeat left';
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


/*----------------------判断个人页面非法访问跳转功能----------------------*/
function userType() {
	if (window.localStorage.getItem('hx180310nowUser')) {
		return;
	}
	else {
		window.location.href = 'register.html';
	}
}
/*----------------------End 判断个人页面非法访问跳转功能----------------------*/


/*----------------------登录状态传导功能----------------------*/
function loginType() {//用于点击登录跳转注册页，让注册页用于判断本地存储login值进行登录注册跳转显示
	window.localStorage.setItem('login', true);//赋予键login值为true使之具备语义化。
}
/*----------------------End 登录状态传导功能----------------------*/


/*----------------------添加联系人功能----------------------*/
var cName = document.getElementById('contName');
var cAge = document.getElementById('contAge');
var cPhone = document.getElementById('contPhone');
var cradio = document.getElementsByName('sex-btn');
var cSex = '';
var cAry = JSON.parse(window.localStorage.getItem('hx180310Contacts')) ? JSON.parse(window.localStorage.getItem('hx180310Contacts')) : [{"contname":"巍峨","contage":"13","contphone":"13123123132","contsex":"女","contbelong":"ln"},{"contname":"人为钱","contage":"13","contphone":"13123123123","contsex":"男","contbelong":"a123123"},{"contname":"人为钱","contage":"13","contphone":"13123123112","contsex":"男","contbelong":"a123123"},{"contname":"流出","contage":"12","contphone":"13123123123","contsex":"男","contbelong":"ln"},{"contname":"惹玩","contage":"12","contphone":"13123123122","contsex":"女","contbelong":"ln"},{"contname":"范甘迪","contage":"12","contphone":"13123123222","contsex":"男","contbelong":"ln"},{"contname":"大哥","contage":"44","contphone":"13123122222","contsex":"男","contbelong":"ln"},{"contname":"温情","contage":"44","contphone":"13233332222","contsex":"女","contbelong":"ln"},{"contname":"美格菲","contage":"44","contphone":"13222123123","contsex":"女","contbelong":"ln"},{"contname":"槐花黄","contage":"34","contphone":"13222133421","contsex":"女","contbelong":"ln"},{"contname":"林春通","contage":"22","contphone":"13123123234","contsex":"男","contbelong":"a123123"},{"contname":"周培真","contage":"24","contphone":"15880260500","contsex":"女","contbelong":"a123123"},{"contname":"王咪","contage":"23","contphone":"13234321432","contsex":"女","contbelong":"a123123"},{"contname":"各位","contage":"24","contphone":"13423412133","contsex":"男","contbelong":"a123123"},{"contname":"带我飞","contage":"24","contphone":"13423412333","contsex":"女","contbelong":"a123123"},{"contname":"广河村","contage":"24","contphone":"13421234333","contsex":"男","contbelong":"a123123"}];//通过三目运算判断本地是否已有联系人信息数组，有则获取赋值，没有则赋值空数组
/*声明变量获取文档对象用户输入的联系人信息*/

/**
 * [addCon 添加联系人功能]
 */
function addCon() {
	var nowuser = window.localStorage.getItem('hx180310nowUser');//获取当前登录帐户名

	for (var i = 0; i < cradio.length; i++) {//遍历单选框对象判断获取选中值
		if (cradio[i].checked == true) {//判断单选框被选中的状态
			cSex = cradio[i].value;//将选中对象的value值赋予变量
			break;
		}
	}

	if (cSex == '') {
		return alert('未选择性别！');
	}

	if (cName.value && cAge.value && cPhone.value) {
		if (!cAge.value.match(/\d/)) {
			return alert('请输入正常年龄！');
		}
		if (!cPhone.value.match(phonRex)) {
			return alert('请输入正确的手机号！');
		}

		/*for (var i = 0; i < wUser.length; i++) {
			if (wUser[i].username == nowuser) {//遍历判断是否为当前登录账户的信息对象
				var oCont = new Contacts(cName.value, cAge.value, cPhone.value, cSex, wUser[i].username);//将输入的联系人信息通过Contacts类存储为对象

				cAry.push(oCont);//将联系人对象置入数组里用于统一存入本地中

				window.localStorage.setItem('hx180310Contacts', JSON.stringify(cAry));//将联系人对象数组存入本地存储区

				return alert('添加联系人成功!');
			}
		}*/
		for (var i = 0; i < cAry.length; i++) {//遍历本地联系人数组
			if (cAry[i].contbelong == nowuser && cAry[i].contphone == cPhone.value) {//判断但联系人附属于当前账户且联系人手机号与输入框手机号重复
				alert('联系人手机号重复！');
				return;//当联系人手机号重复弹出提示并退出函数
			}
		}

		var oCont = new Contacts(cName.value, cAge.value, cPhone.value, cSex, nowuser);//将输入的联系人信息通过Contacts类存储为对象

		cAry.push(oCont);//将联系人对象置入数组里用于统一存入本地中

		window.localStorage.setItem('hx180310Contacts', JSON.stringify(cAry));//将联系人对象数组存入本地存储区

		return alert('添加联系人成功!');
	}
	else {
		alert('请将联系人信息补全!');
	}

}
/*----------------------End 添加联系人功能----------------------*/


/*----------------------打印联系人功能----------------------*/
var cTbody = document.getElementById('contact-body');//获取将要用来打印联系人的表格主体对象

/**
 * [putCont 打印联系人功能]
 * @param  {[Array]} Ary  [打印遍历的数组对象]
 * @param  {[number]} star [打印起始位]
 * @param  {[number]} end  [打印结束位]
 * @return {[type]}      [description]
 * 1、循环遍历联系人数组，判断联系人是否归属于当前账户
 * 2、属于当前账户情况下创建节点将联系人信息按表格结构进行进行追加输出
 */
function putCont(Ary, star, end) {
	var cimg;//用于获取男女头像的图片标签变量。

	for (var i = star; i < end; i++) {//遍历联系人数组
		if (!Ary[i]) {
			return;
		}
		/*打印联系人最后一页超出数组范围则退出打印*/

		if (Ary[i].contbelong == nowUser) {//判断属于当前账户的联系人进行输出
			var ctr = document.createElement('tr');//创建一个行标签再后续用来追加于tbody
			var ctd = document.createElement('td');
			var cinput = document.createElement('input');
			
			if (Ary[i].contsex == '男') {//判断联系人性别输出对应头像标签
				cimg = '<td><img width="100px" src="img/man.jpeg" alt=""></td>'; 
			}
			else {
				cimg = '<td><img width="100px" src="img/women.jpg" alt=""></td>';
			}

			cinput.type = 'button';
			cinput.className = 'delete';
			cinput.value = '删除';
			cinput.belong = Ary[i].contphone;//给删除按钮定义一个和隐藏的属性belong赋值当前联系人的手机号

			ctd.appendChild(cinput);

			// alert(cimg + cAry[i].contname);
			ctr.innerHTML = cimg + '<td>' + Ary[i].contname + '</td>' + '<td>' + Ary[i].contphone + '</td>' + '<td>' + Ary[i].contsex + '</td>' + '<td>' + Ary[i].contage + '</td>';// + '<td><input class="delete" type="button" value="删除"></td>';//将联系人信息按照表格结构输出于行标签中

			ctr.appendChild(ctd);

			cTbody.appendChild(ctr);//将格式化为行标签的联系人信息追加于表格主体对象中进行显示输出
		}
	}
	
}

// 联系人删除功能
function contDel() {//封装联系人删除功能，在联系人页面底部调用
	cTbody.onclick = function() {//给联系人显示表格主体添加点击事件委托
		var e = arguments[0] || window.event;
		var target = e.target || arguments.srcElement;//声明变量调用点击事件的触发对象

		if (target.className == 'delete') {//判断点击触发对象的class名是否和删除按钮一致
			var msg = confirm('确定要删除联系人？');

			if (!msg) {
				return
			}
			
			for (var i = 0; i < cAry.length; i++) {//遍历联系人数组

				if (cAry[i].contphone == target.belong && msg) {//判断联系人姓名与触发按钮的附属联系人名一致且提示确认删除联系人返回值为true执行操作
					cAry.splice(i, 1);//删除对应联系人数组下标

					window.localStorage.setItem('hx180310Contacts', JSON.stringify(cAry));//将联系人对象数组存入本地存储区刷新数据
					window.location.reload();//刷新页面重新打印联系人。
					return;
				}
			}
		}

	}
	
}

// End 联系人删除功能

/*----------------------End 打印联系人功能----------------------*/


/*----------------------分页按钮功能----------------------*/
var nowContacts = [];//声明当前账户联系人空数组
var nowuser = window.localStorage.getItem('hx180310nowUser') ? window.localStorage.getItem('hx180310nowUser') : '';//获取当前登录帐户名，没有则赋空字符。

for (var i = 0; i < cAry.length; i++) {
	if (cAry[i].contbelong == nowuser) {
		nowContacts.push(cAry[i]);
	}
}
/*遍历联系人数组筛选当前账户联系人存入nowContacts*/

window.localStorage.setItem('hx180310nowContacts', JSON.stringify(nowContacts));//将当前账户联系人导入本地存储

/**分页按钮功能流程：
 * 1、获取分页信息对象并声明当前页、开始页、结束页、总页数、单页信息长度变量
 * 2、根据总页数追加打印分页按钮
 * 3、改编原先联系人打印功能传参化进行初始页（第一页）联系人信息的打印
 * 4、通过事件委托给分页按钮父级安装点击事件，判断对应按钮对象分别打印分页功能
 */

/*节点追加功能封装*/
/**
 * [showInfo 节点追加]
 * @param  {[string]} id      [要被追加节点的对象id名]
 * @param  {[obj]} data    [追加节点的内容]
 * @param  {[string]} tagName [要追加的节点标签类型]
 * @return {[type]}         [description]
 */
function showInfo(id, data, tagName) {
	var obj = document.getElementById(id);
	var oP = document.createElement(tagName);
	oP.innerHTML = data;

	obj.appendChild(oP);
}
/*End 节点追加功能封装*/

/**
 * [PageFun 当前联系人分页化打印输出功能]
 * @param {[Array]} ary  [要打印的数组信息]
 * @param {[number]} Size [单页打印长度]
 */
function PageFun(ary, Size) {
	var ary;//分页总数据
	var pageSize = Size;//单页长度
	var pageNum = Math.ceil(ary.length / pageSize);//总页数
	var Now = 1;//获取当前页值并取整
	var Star = pageSize * (Now - 1);//单页总数据开始下标
	var End = pageSize * Now;//单页总数据结束下标	
	var cPage = document.getElementById('contentPage');//获取分页按钮标签父级对象
	var cbtn = document.getElementById('pageBtn');

	for (var i = 1; i <= pageNum; i++) {
		/*var cli = document.createElement('li');
		cli.innerHTML = i;
		cbtn.appendChild(cli);*/
		showInfo('pageBtn', i, 'li');
	}//循环创建分页按钮对象追加进按钮标签中
	var cli = cbtn.getElementsByTagName('li');
	putCont(nowContacts, Now - 1, Size);//预先打印第一页联系人

	cPage.onclick = function(e) {
		var event = e || window.event;
		var target = event.target || ararguments.srcElement;
		//获取事件对象兼容ie

		if (target.className == 'lastPage') {//上一页按钮
			if (Now == 1) {//当前页若为第一页则退出功能
				return;
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

			cTbody.innerHTML = '';//清空表格已有联系人信息
			putCont(nowContacts, Star, End);//打印对应页数联系人
		}

		if (target.className == 'nextPage') {//下一页按钮
			if (Now == pageNum) {//当前页若为最后一页则退出功能
				return;
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

			cTbody.innerHTML = '';//清空表格已有联系人信息
			putCont(nowContacts, Star, End);//打印对应页数联系人

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

			cTbody.innerHTML = '';//清空表格已有联系人信息
			putCont(nowContacts, Star, End);//打印对应页数联系人
		}
	}

}
/*----------------------End 分页按钮功能----------------------*/
