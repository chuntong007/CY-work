var aStation = [//声明表格站台所需要的初始二维数组信息
    ['D3145', '上海虹桥', '宁波', '福州南', '厦门', 300],
    ['D6201', '福州', '莆田', '泉州', '厦门', 80],
    ['D2335', '厦门', '漳州', '潮汕', '深圳', 60],
    ['G1602', '深圳', '潮汕', '厦门', '福州', 75],
    ['D905', '上海', '杭州', '宁波', '深圳', 35],
    ['G322', '厦门', '福州', '合肥', '北京', 150],
    ['G2046', '厦门', '福州', '上饶', '南昌', 89],
    ['G1684', '厦门', '莆田', '怀化', '昆明', 66],
    ['G1688', '厦门', '南昌', '怀化', '贵阳', 32],
    ['G5', '北京', '天津', '济南', '南京', 230],
    ['G571', '北京', '剑门关', '成都', '重庆', 600],
];

window.localStorage.setItem('hx180310aStation', JSON.stringify(aStation));//将此次数据存入本地数组key命名为hx180310aStation

var oStbody = document.getElementById('schedule-body');

function getStation() {//声明函数封装用来遍历数组信息输出于表格
	oStbody.innerHTML = '';//先清空页面车次信息避免其他功能调用时进重复递增
	for (var i = 0; i < aStation.length; i++) {//第一层循环遍历数组第一维下标
		if (i % 2 == 0) {//设置条件表格每隔一行输出一个带有样式的tr头标
			var result = document.createElement('tr');//创建tr标签对象节点
			result.className = 'bgc';
			
			// result += '<tr class="bgc">';//在二维数组循环前获取表格行标签头标
		}
		else {
			// result += '<tr>';//在二维数组循环前获取表格行标签头标
			var result = document.createElement('tr');//创建tr标签对象节点
		}

		for (var l = 0; l < aStation[i].length; l++) {//第二层循环遍历数组第二维下标
			// result += '<td>' + aStation[i][l] + '</td>';
			var otd = document.createElement('td');
			otd.innerHTML = aStation[i][l];
			result.appendChild(otd);
		}

		/*退出循环后追加购票按钮节点*/
		var otd = document.createElement('td');
		var oinput = document.createElement('input');
		
		oinput.type = 'button';
		oinput.value = '购票';

		otd.appendChild(oinput);
		result.appendChild(otd);
		/*End 退出循环后追加购票按钮节点*/

		oStbody.appendChild(result);
	}
}

getStation();

/*车次打印功能*/

/**流程构思
 *
 *1、在车票搜索框处的查询按钮（a标签处）添加购票页按钮加入onclick=""属性在构建好函数功能将其插入。
 *2、声明变量uSer获取点击按钮弹出输入框输入站点信息和用来对遍历数组成功后进行计数的变量count
 *3、通过indexOf()函数结合循环遍历数组信息。
 *4、使用if判断遍历数组过程中，数组存在对应站点信息则将该车次表格行叠加进预先声明好的变量中并且对count进行加一计数，（出于优化考虑使用单层循环打印车次信息）
 *5、在循环结束后判断count计数是否为零，不为对表格输出循环叠加后的车次信息，为零弹出没有车次信息提示。
 *
 */

function searchSta() {
	var uSer = document.getElementById('shopStar').value;
	var result = '';
	var count = 0;

	for (var i = 0; i < aStation.length; i++) {
		if (aStation[i].indexOf(uSer) != -1) {
			if (i % 2 == 0) {
				result += '<tr class="bgc">';
			}
			else {
				result += '<tr>';
			}

			result += '<td>' + aStation[i][0] + '</td>' + '<td>' + aStation[i][1] + '</td>'+ '<td>' + aStation[i][2] + '</td>'+ '<td>' + aStation[i][3] + '</td>'+ '<td>' + aStation[i][4] + '</td>'+ '<td>' + aStation[i][5] + '</td>' + '<td><input type="button" value="购票" /></td>' + '</tr>';
			count++;
		}
	}

	if (uSer) {
		if (count > 0) {
		    oStbody.innerHTML = result;
		}
		else {
		    alert('没有符合条件的车次信息,请重新查找。');
		}
	}
}

/*车次打印功能结束*/

/*站点间票价查询*/

/**流程构思
 * [selectFun description]
 * @return {[type]} [description]
 * 用户点击按钮时执行confirm方法选择进行站点信息查看或是站点间票价查询
 */

/**
 * [ticKetserh description]
 * @return {[type]} [description]
 * 1、声明获取弹框提示用户输入起点站的变量uStar、用来叠加符合站点信息的变量result。
 * 2、for循环结合indexOf遍历数组，判断存在起点站且站点不为车次终点情况下将站点信息结合表格标签叠加给result并打印在表格中;不存在站点信息则退出函数执行弹出提示信息。
 * 3、
 * 
 */
function ticKetserh() {
	var uStar = prompt('请输入起始站点。');
	var result = '';
	var starIndex = aStation[i].indexOf(uStar);
	var endIndex = aStation[i].indexOf(uEnd);
	var uEnd = prompt('请输入终点站。');

	for (var i = 0; i < aStation.length; i++) {
		if (starIndex != -1 && starIndex < 4) {
			
		}
	}
}

/*站点间票价查询结束*/

// 车次添加功能
function addSta() {
	var ary = [];//获取车次信息的小数组
	var uindex1 = document.getElementById('index1').value;
	var uindex2 = document.getElementById('index2').value;
	var uindex3 = document.getElementById('index3').value;
	var uindex4 = document.getElementById('index4').value;
	var uindex5 = document.getElementById('index5').value;
	var uindex6 = document.getElementById('index6').value;

	for (var i = 0; i < aStation.length; i++) {//定义循环对站点数组进行查重遍历
		if (aStation[i][0] == uindex1) {//遍历每一列车次的编号
			alert('车次编号重复，请重新添加。')
			return;//出现重复弹出提示后return退出函数执行
		}
	}

	if (uindex1  && uindex2 && uindex5 && uindex6) {
		if (uindex2 == uindex5) {
			return alert('始发站与终点站重复，请重新输入！');

		}
		ary = [uindex1, uindex2, uindex3, uindex4, uindex5, parseInt(uindex6)];
		aStation.unshift(ary);
		alert('添加成功');
	}
	else {
		alert('车次信息不完整！（除途径站以外的信息必须填写）');
	}
	// 查重遍历没有重复车次信息后判断输入框是否输入必填项符合要求则将车次信息加入第一维大数组，不符合弹出提示补全信息。

	getStation();
	//重新输出所有列车信息检验是否正常添加。
}
// 车次添加功能结束

// 站点间计算票价功能
/**
 * [findStation description]
 * @return {[type]} [description]
 * 1、声明获取起始站input输入信息变量uStar和终点站uEnd和用来叠加获取站点信息的变量result
 * 2、判断起始站点和终点站已输入情况下执行执行第3步否则执行6步
 * 3、通过循环遍历数组，循环过程中判断aStation[i].indexOf(uStar)不等于-1且小于终点站下标aStation[i][4],aStation[i].indexOf(uEnd)不等于-1且大于uStar下标
 * 4、声明变量获取计算下标差乘以票价aStation[i][5]的值。
 * 5、以表格形式获取当前标签车次信息叠加进result;
 * 6、else if 判断于第2步终点站未输入的情况下执行searchSta()车次信息查找打印
 * 7、else 弹出提示请输入起始站
 */
function findStation() {
	var uStar = document.getElementById('shopStar').value;
	var uEnd = document.getElementById('shopEnd').value;
	var result = '';

	if (uStar && uEnd) {//判断起始站与终点站已输入内容情况下执行后面语句
		for (var i = 0; i < aStation.length; i++) {
			if (aStation[i].indexOf(uStar) != -1 && aStation[i].indexOf(uEnd) != -1 && aStation[i].indexOf(uEnd) > aStation[i].indexOf(uStar)) {
				var price = (aStation[i].indexOf(uEnd) - aStation[i].indexOf(uStar)) * aStation[i][5];//声明price获取站点间计算后的票价

				result += '<tr><td>' + aStation[i][0] + '</td>' + '<td>' + aStation[i][1] + '</td>'+ '<td>' + aStation[i][2] + '</td>'+ '<td>' + aStation[i][3] + '</td>'+ '<td>' + aStation[i][4] + '</td>'+ '<td>' + price + '</td>' + '<td><input type="button" value="购票" /></td></tr>';
			}
		}

		if (result) {//判断在有符合车次条件叠加的情况下对表格输出相应车次信息
			oStbody.innerHTML = result;
		}
		else {//当result没获取到符合条件信息则在表格中输出对应提示信息
			oStbody.innerHTML = '<tr>' + '<td colspan="7">没有符合条件的车次信息。</td>' + '</tr>';
		}
	}
	else if (uStar && !uEnd) {//判断只输入起点站情况下调用车次查找打印功能
		searchSta();
	}
	else {//强两者条件不满足的情况下判断只有起始站点未输入，并在对表格输出已有的车次信息后弹出提示。
		getStation();
		alert('请输入起始站点。');
	}
}
// 站点间计算票价功能结束

/*票价排序功能*/
var result = 0;//声明一个变量用来计数叠加
function asc() {//声明排序功能函数
	if (result % 2 == 0) {//判断变量能被2整除执行升序排列
		aStation.sort(function(a, b) {
			if (a[5] < b[5]) {
				return -1;
			}
			else {
				return 1;
			}
		});	
	}
	else {//当变量不能被2整除时执行降序排列
		aStation.sort(function(a, b) {
			if (a[5] > b[5]) {
				return -1;
			}
			else {
				return 1;
			}
		});	
	}
	result++;//排序完成后计数变量加一递增，当重新点击执行判断后将进行不同于前次的排序

	getStation();
}
/*票价排序功能结束*/