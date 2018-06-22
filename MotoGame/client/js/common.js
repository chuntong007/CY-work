/**
 * [Director 导演管理]
 */
function Director() {
	/**
	 * [turnScene 场景切换]
	 * @param  {[string]} close [隐藏对象]
	 * @param  {[string]} show  [切换显示对象]
	 * @return {[type]}       [description]
	 */
	this.turnScene = function(close, show) {
		$(close).hide();
		$(show).show();
		/*if ($(this)[0] == oSen[oSen.length - 1]) {
			$('#Login').show();
		}
		else {
			$(this).next().show();
		}*/
		
	}
}

// $('section').on('click', SceneTurn);