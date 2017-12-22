// sql语句
var sqlMap = {
	// 用户
	user: {
		name: 'SELECT * FROM user_login where user_name = ?'
	}
}
module.exports = sqlMap;