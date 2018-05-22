//-------------------------学习中心动态显示功能-------------------------
	var nowUser = window.localStorage.getItem('hx180310nowUser');
	var aUser = JSON.parse(window.localStorage.getItem('hx180310user')) == null ? aUser : JSON.parse(window.localStorage.getItem('hx180310user'));//获取当前本地存储的账户数据
	var oUser = {};//用于存储遍历后的当前账户对象

	for (var i = 0; i < aUser.length; i++) {
		if (aUser[i].username == nowUser) {
			oUser = aUser[i];//获取当帐户名对象

			break;
		}
	}

	console.log(typeof oUser.userdate);

function turnUserMsg() {
	var oUsName = document.getElementById('UserName');
	var oUdate = document.getElementById('UserDate');
	var oInt = document.getElementById('InterGral');
	var oRank = document.getElementById('Rank');
	var oGold = document.getElementById('Golden');
	// 获取动态打印个人信息的对象

	oUsName.innerHTML = oUser.username;
	oUdate.innerHTML = '注册日期：' + oUser.userdate;
	oInt.innerHTML = '等级：' + oUser.ranknum;
	oRank.innerHTML = '积分：' + oUser.integral;
	oGold.innerHTML = oUser.balance;
	//给对应节点添加课程信息

	// addChild(oPic, 'img', null, nowCourse.img, 'src');//调用节点追加功能给章节图片区添加课程图片

}

turnUserMsg();
//-------------------------End 学习中心动态显示功能-------------------------

//-------------------------订单打印功能-------------------------
var oOrder = document.getElementById('OrderShow2');
var nowOrders = window.localStorage.getItem('hx180310nowOrders') ? JSON.parse(window.localStorage.getItem('hx180310nowOrders')) : [];//本地存储有用户订单则获取没有返回空数组
var nowUser = window.localStorage.getItem('hx180310nowUser') ? window.localStorage.getItem('hx180310nowUser') : nowUser;//本地存储有用户订单则获取没有返回空数组

function printOrders() {
	oOrder.getElementsByTagName('UL')[0].innerHTML = '';//清空订单列表内容；
	
	for (var i = 0; i < nowOrders.length; i++) {
		if (nowOrders[i].uBelong == nowUser) {
			for (var j = 0; j < aCourse.length; j++) {
				if (aCourse[j].course == nowOrders[i].cBelong) {
					var cImg = aCourse[j].img;
					break;
				}
			}//获取对应课程的图片地址
			var oli = document.createElement('li');
			var oinp1 = document.createElement('input');
			var oinp2 = document.createElement('input');
			var oinp3 = document.createElement('input');
			var oinp4 = document.createElement('input');
			var oSpan = document.createElement('span');

			oinp1.className = 'Co-Down';
			oinp1.type = 'button';
			oinp1.value = '-';

			oinp2.className = 'Co-Num';
			oinp2.type = 'text';
			oinp2.value = '1';

			oinp3.className = 'Co-Up';
			oinp3.type = 'button';
			oinp3.value = '+';

			oinp4.className = 'Co-cancel';
			oinp4.type = 'button';

			addChild(oli, 'IMG', null, cImg, 'src');
			addChild(oli, 'SPAN', nowOrders[i].cBelong, 'CourseName', 'className');
			addChild(oli, 'SPAN', '$' + nowOrders[i].price, 'Co-Price', 'className');
			oli.appendChild(oinp1);
			oli.appendChild(oinp2);
			oli.appendChild(oinp3);
			// addChild(oli, 'SPAN', '$' + nowOrders[i].price, 'PriceTotal', 'className');
			oSpan.className = 'PriceTotal';
			oSpan.innerHTML = '$' + nowOrders[i].price;
			oSpan.price = nowOrders[i].price;
			oli.appendChild(oSpan);

			oli.appendChild(oinp4);

			oOrder.getElementsByTagName('UL')[0].appendChild(oli);//追加对应标签打印到订单列表中
		}
	}
}

printOrders();

//-------------------------End 订单打印功能-------------------------


//-------------------------订单购买功能-------------------------
function turnPrice() {
	var oPrice = document.getElementsByClassName('PriceTotal');

	for (var i = 0; i < oPrice.length; i++) {
		oPrice[i].parentElement.getElementsByClassName('')
	}
}// 订单价格动态显示功能


oOrder.onclick = function(e) {
	var e = e || window.Event;
	var target = e.target || e.srcElement;
	//兼容IE

	console.log(e);
}
//-------------------------End 订单购买功能-------------------------