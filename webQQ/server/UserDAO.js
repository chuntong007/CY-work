var sqlite3 = require('sqlite3');//声明变量激活Sqlite3模块
var db = new sqlite3.Database('./db/hx180310.db', function(err){//实例化sqlite3连接数据库文件
	if (!err) {
		console.log('数据库打开成功');
	}
});

function UserDAO() {
	this.login = function(user, pwd, callback) {
		var sql = 'select * from user where phon = ? and pwd = ?';

		db.all(sql, [user, pwd], function(err, result) {
			if (!err) {
				console.log(result);

				if (result.length == 0) {//判断数据库返回值向回调函数传入结果参数
					callback('error');
				}
				else {
					callback('success', result[0]);
					console.log('success', result[0]);
				}
			}
		});
	}
}

module.exports = new UserDAO();//加载某块接口实例化调用DAO