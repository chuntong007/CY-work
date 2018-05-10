/*----------------------首页轮播图功能----------------------*/
var aimgbox = document.getElementById('bannerBox').getElementsByTagName('img');
var aban = document.getElementById('banner');
var ali = document.getElementById('circle').getElementsByTagName('li');
var abtn = document.getElementById('bannerBtn');
/*获取轮播图中的各个对象*/

var pos = 1;//声明轮播图播放顺序初始值变量

function Carousel() {
	if (pos == aimgbox.length || pos < 0) {
		pos = 0;
	}
	/*判断轮播顺序变量值超出轮播对象下标范围进行清零*/

	for (var l = 0; l < ali.length; l++) {
			ali[l].style.background = '#747474';
		}
	ali[pos].style.background = '#fff';
	/*循环遍历轮播下标按钮跟随轮播图跳动进行颜色变化*/

	for (var i = 0; i < aimgbox.length; i++) {
		aimgbox[i].style.display = 'none';
	}
	/*遍历轮播图全部进行隐藏*/

	aimgbox[pos].style.display = 'block';

	pos++;
}

var oint = setInterval(Carousel, 3000);
/*声明变量赋值定时器轮播方法*/

aban.onmouseover = function() {//安装鼠标停留清除计时器终端轮播
	clearInterval(oint);
}

aban.onmouseout = function(e) {
	oint = setInterval(Carousel, 3000);
	/*鼠标离开重新调用定时器*/
}

for (var j = 0; j < ali.length; j++) {
	ali[j].index = j;//将当前循环循环变量序号值赋予创建的隐藏属性中
	ali[j].onclick = function() {
		this.style.background = '#e2171796'
		pos = this.index;//设置轮播顺序变量为当前下标属性的序号值
		Carousel();//执行轮播功能进行图片切换
	}
}
/*遍历轮播下标按钮，给每个按钮设置属性获取下标序号，并给按钮安装点击切换轮播显示功能*/

abtn.onclick = function(e) {
	var event = e || window.event;
	var target = e.target || arguments.srcElement;
	/*兼容ie获取点击事件对象*/

	if (target.className == 'btn-l') {//向后切换按钮
		if (pos == 1) {
			pos = aimgbox.length - 1;
		}//当轮播下标为第一张时向前一张点击切换至轮播图最后一张
		else {
			pos -= 2;//不为零的时候轮播序号减2
		}

		Carousel();
	}//当点击事件触发判断为左侧按钮则轮播序号变量减一并执行轮播图切换
	if (target.className == 'btn-r') {
		Carousel();
	}//当点击事件触发判断为左侧按钮则轮播序号变量减一并执行轮播图切换
}
/*轮播图左右切换点击功能*/

/*----------------------End 首页轮播图功能----------------------*/