// ----------------------课程中心三级联动功能----------------------
var oCnav = document.getElementById('CourseNav');//三级联动筛选栏对象
var oTechn = document.getElementById('TechnoLogy');//三级联动技术方向筛选对象
var oClass = document.getElementById('ClassIfy');//三级联动分类筛选对象
var oNodus = document.getElementById('Nodus');//三级联动难度筛选对象
var oCoShow = document.getElementById('CourseShow');//课程展示区对象
//获取首页用于三级联动动态修改对象

console.log(oClass);

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
 * [showNav 课程分类导航标签打印功能]
 * @param  {[array]} Ary   [遍历获取数据的数组对象]
 * @param  {[string]} Index [需要遍历的对象属性名]
 * @return {[type]}       [description]
 */
function showNav(Ary) {
	var aClass = [];//声明用于存放已遍历获取的课程类名称属性
	var obj = document.createElement('LI');

	oClass.children[1].innerHTML = '';//清空分类导航所有选项
	addChild(oClass.children[1], 'LI', '全部', 'nav-Now', 'className');
	//首先为导航栏对象追加一个带有当前样式类的全部分类按钮

	for (var i = 0; i < Ary.length; i++) {
		if (aClass.indexOf(Ary[i].classify) == -1) {
			aClass.push(Ary[i].classify);

			addChild(oClass.children[1], 'LI', Ary[i].classify);
		}
	}
}

// console.log(aCourse[0].classify);
showNav(aCourse);

/**
 * [reloadNav 重置其他选项样式状态功能]
 * @param  {[Array]} obj [遍历重置对象数组]
 * @return {[type]}     [description]
 */
function reloadNav(obj) {
	for (var i = 0; i < obj.length; i++) {//遍历难度选项分类对象重置难度样式
		if (obj[i].innerHTML == '全部') {
			obj[i].className = 'nav-Now';//当分类选项为全部时重置添加当前样式属性
		}
		else {
			obj[i].className = '';//清空难度分类选项样式属性
		}
	}
}

/**
 * [showCourse 课程打印功能]
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
 * [onclick 三级联动点击事件委托]
 * @param  {[Event]} e [事件对象]
 * @return {[type]}   [description]
 */
oCnav.onclick = function(e) {
	var e = e || window.event;
	var target = e.target || arguments.srcElement;
	/*兼容ie获取点击事件对象*/
	console.log(e);

	var aNavCourse = [];//用于动态存储赛选后的课程对象数组
	var aNavCourseB = [];//存储初次筛选后二次难度筛选的课程对象数组

	if (e.path[2].id == 'TechnoLogy') {//判断点击选项为技术方向分类区块时执行语句
		if (target.innerHTML == '全部') {//判断点击全部选项时重置所有条件选项当前样式，并打印出所有课程信息

			for (var k = 0; k < e.path[1].children.length; k++) {
				e.path[1].children[k].className = '';//清空所有选项的当前类属性
			}
			target.className = 'nav-Now';//为当前点击对象添加样式类

			/*for (var i = 0; i < oNodus.children[1].children.length; i++) {//遍历难度选项分类对象重置难度样式
				if (oNodus.children[1].children[i].innerHTML == '全部') {
					oNodus.children[1].children[i].className = 'nav-Now';//当分类选项为全部时重置添加当前样式属性
				}
				else {
					oNodus.children[1].children[i].className = '';//清空难度分类选项样式属性
				}
			}*/
			reloadNav(oNodus.children[1].children);//调用重置联动选项状态功能重置难度选项栏样式

			showNav(aCourse);//打印出所有课程类选项

			oCoShow.children[0].innerHTML = '';//清空课程展示区已有的课程信息

			for (var i = aCourse.length - 1; i >= 0; i--) {//遍历课程数组
				showCourse(oCoShow.children[0], aCourse[i].img, aCourse[i].course, aCourse[i].description, aCourse[i].score, aCourse[i].attention);//调用课程打印功能打印课程信息
			}
			return;
		}
		else {
			/*oClass.children[1].innerHTML = '';//遍历前先将课程分类选项清空
			addChild(oClass.children[1], 'LI', '全部', 'nav-Now');*/

			for (var k = 0; k < e.path[1].children.length; k++) {
				e.path[1].children[k].className = '';//清空所有选项的当前类属性
			}
			target.className = 'nav-Now';//为当前点击对象添加样式类

			reloadNav(oNodus.children[1].children);//调用重置联动选项状态功能重置难度选项栏样式

			for (var i = 0; i < aCourse.length; i++) {
				if (aCourse[i].technology == target.innerHTML) {//遍历课程数组中技术方向与当前点击选项属性值一致执行语句
					aNavCourse.push(aCourse[i]);//将对应技术方向课程存入联动筛选大数组
				}

			}

			showNav(aNavCourse);//调用分类导航打印将技术方向筛选后的课程数组的所有类选项打印出来


			oCoShow.children[0].innerHTML = '';//清空课程展示区已有的课程信息

			for (var i = aNavCourse.length - 1; i >= 0; i--) {//遍历课程数组
				showCourse(oCoShow.children[0], aNavCourse[i].img, aNavCourse[i].course, aNavCourse[i].description, aNavCourse[i].score, aNavCourse[i].attention);//调用课程打印功能打印课程信息
			}
		}
	}

	if (e.path[2].id == 'ClassIfy') {//判断点击选项为课程分类区块时执行语句
		aNavCourse = aNavCourse.length > 0 ? aNavCourse : aCourse;//当筛选课程数组没有对象则获取中课程数组，否则返回本身

		if (target.innerHTML == '全部') {//判断点击全部选项时重置所有条件选项当前样式，并打印出所有课程信息

			for (var k = 0; k < e.path[1].children.length; k++) {
				e.path[1].children[k].className = '';//清空所有选项的当前类属性
			}
			target.className = 'nav-Now';//为当前点击对象添加样式类

			reloadNav(oNodus.children[1].children);//调用重置联动选项状态功能重置难度选项栏样式

			return;
		}
		else {
			/*oClass.children[1].innerHTML = '';//遍历前先将课程分类选项清空
			addChild(oClass.children[1], 'LI', '全部', 'nav-Now');*/

			for (var k = 0; k < e.path[1].children.length; k++) {
				e.path[1].children[k].className = '';//清空所有选项的当前类属性
			}
			target.className = 'nav-Now';//为当前点击对象添加样式类
			
			for (var i = 0; i < aCourse.length; i++) {//遍历课程数组
				if (aCourse[i].classify == target.innerHTML) {//判断课程对象类名符合当前点击分类执行语句
					for (var k = 0; k < oTechn.children[1].children.length; k++) {//遍历技术方向分类对象
						oTechn.children[1].children[k].className = '';//清空所有技术分类的当前样式类属性

						if (oTechn.children[1].children[k].innerHTML == aCourse[i].technology) {//判断符合课程遍历对象的技术方向与技术分类选项匹配执行语句
							oTechn.children[1].children[k].className = 'nav-Now';//为符合条件技术方向添加当前类
						}
					}

				}
			}


			reloadNav(oNodus.children[1].children);//调用重置联动选项状态功能重置难度选项栏样式
		}
	}

	if (e.path[2].id == 'Nodus') {//判断点击选项为难度分类区块时执行语句
		aNavCourseB = aNavCourse.length > 0 ? aNavCourse : aCourse;//当筛选课程数组没有对象则获取中课程数组，否则返回本身

		if (target.innerHTML == '全部') {//判断点击全部选项时重置所有条件选项当前样式，并打印出所有课程信息

			for (var k = 0; k < e.path[1].children.length; k++) {
				e.path[1].children[k].className = '';//清空所有选项的当前类属性
			}
			target.className = 'nav-Now';//为当前点击对象添加样式类

			return;
		}
		else {
			/*oClass.children[1].innerHTML = '';//遍历前先将课程分类选项清空
			addChild(oClass.children[1], 'LI', '全部', 'nav-Now');*/

			for (var k = 0; k < e.path[1].children.length; k++) {
				e.path[1].children[k].className = '';//清空所有选项的当前类属性
			}
			target.className = 'nav-Now';//为当前点击对象添加样式类

			/*for (var j = 0; j < aNavCourse; j++) {
				var obj = document.createElement('LI');

				addChild(obj, 'IMG', null, aNavCourse[j].img, 'src');
			}*/
		}
	}
}
// ----------------------End 课程中心三级联动功能----------------------