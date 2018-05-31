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