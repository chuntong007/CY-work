//////////////////////////////// 进度条功能 ////////////////////////////////
var pGindex = 0;

function proBar() {
	$('div.progress').css('display', 'block');
	$('.progress-bar').css({
		'width': pGindex + '%'
	})
	$('.sr-only').text(pGindex + '% Complete');

	pGindex += 2;

	var pgBar = setTimeout(proBar, 100);

	if (pGindex > 100) {
		clearTimeout(pgBar);
	}
}

//////////////////////////////// End 进度条功能 ////////////////////////////////

// 非法访问阻止跳转
function unAccess() {
	if (!localStorage.hx180310QQnowUser) {
		window.onload = alert('账号未登录');
		window.location.href = 'index.html';
	}
}
// End非法访问阻止跳转
