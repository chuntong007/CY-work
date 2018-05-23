var oCont = document.getElementById('content');
var oBtn = document.getElementById('turnBtn');

//选项卡切换功能
oBtn.onclick = function(e) {
	var e = e || window.Event;
	var target = e.target || e.srcElement;
	//兼容IE

	if (target.tagName == 'LI') {
		for (var i = 0; i < oBtn.children.length; i++) {
			oBtn.children[i].className = '';//清空所有按钮样式类
			oBtn.children[i].index = i;//安装顺序下标
		}
		
		target.className = 'Now';

		for (var i = 0; i < oCont.children.length; i++) {
			oCont.children[i].style.display = 'none';//影藏所有选项
		}

		oCont.children[target.index].style.display = 'block';
	}
}

/**
 * [MulTable 九九乘法表]
 */
function MulTable() {
	var result = '<h2>For循环打印</h2>';

	for (var i = 9; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			result += i + '&nbsp;*&nbsp;' + (j + 1) + '&nbsp;&nbsp;';
		}
		result += '<br />';
	}

	result += '<h2>While循环</h2>';

	var i = 9;

	while(i > 0) {
		var j = 1;

		while(j <= i) {
			result += i + '&nbsp;*&nbsp;' + j + '&nbsp;&nbsp;';
			j++
		}

		i--;

		result += '<br />';
	}

	oCont.children[0].innerHTML = result;
}

MulTable();

function VerifyId() {
	var oId = document.getElementById('IdCard');
	var modulus = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//系数
	var remainder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];//余数
	var remFor = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
	var result = 0;

	if (oId.value.length == 18) {
		for (var i = 0; i < (oId.value.length - 1); i++) {
			result += parseInt(oId.value[i]) * modulus[i];
		}

		result %= 11;

		for (var i = 0; i < remFor.length; i++) {
			if (result == i) {
				if (oId.value[oId.value.length -1].toUpperCase() != remFor[i]) {
					alert('身份证号不合法');
				}
				else {
					alert('身份证号合法');
				}
			}
		}

	}
	else {
		alert('请输入18位身份证号码');
	}
}

oCont.children[2].onclick = function(e) {
	var e = e || window.Event;
	var target = e.target || e.srcElement;
	//兼容IE
	var otitle = document.getElementById('Title');
	var oWage = document.getElementById('Wage');
	var oIn = document.getElementById('Insurance');
	var oResult = document.getElementById('Result');
	var oValue1 = document.getElementById('value1');
	var oValue2 = document.getElementById('value2');
	console.log(e);

	if (target.id == 'Count' && otitle.innerHTML != '个人所得税计算结果' && oWage.value && oIn.value) {
		otitle.innerHTML = '个人所得税计算结果';
		oValue1.innerHTML = '应缴税款：';
		oValue2.innerHTML = '实发工资：';

		var result;
		var Wage = oWage.value;
		var Insur = oIn.value;
		result = oWage.value - oIn.value - 3500;

		switch(true) {
			case result > 0 && result <= 1500:
			oWage.value = result * 0.03;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			case result > 1500 && result <= 4500:
			oWage.value = result * 0.1 - 105;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			case result > 4500 && result <= 9000:
			oWage.value = result * 0.20 - 555;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			case result > 9000 && result <= 35000:
			oWage.value = result * 0.25 - 1005;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			case result > 35000 && result <= 55000:
			oWage.value = result * 0.3 - 2755;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			case result > 55000 && result <= 80000:
			oWage.value = result * 0.35 - 5505;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			case result > 80000:
			oWage.value = result * 0.45 - 13505;
			oIn.value = Wage - oWage.value;
			oResult.innerHTML = result;
			break;

			default:
			alert('工资低于3500无需缴税');
		}
	}
	if (target.id == 'Reset') {
		otitle.innerHTML = '个人所得税计算器2018';
		oWage.value = '';
		oIn.value = '';
		oResult.innerHTML = '';	
		oValue1.innerHTML = '税前工资：';
		oValue2.innerHTML = '各项社会保险费：';
	}
}