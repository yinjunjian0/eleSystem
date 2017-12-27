// sql语句
var sqlMap = {
	// 用户
	user: {
		name: 'SELECT * FROM user_login where user_name = ?'
	},
	regis: {
		regis_data: 'INSERT INTO user_login(user_name,user_password,user_type,user_email,user_phone,user_date) VALUES (?,?,?,?,?,?)',
	},
	zdcx: 'SELECT * FROM user_zd where user_name = ?',
	gzbx: 'INSERT INTO ele_gzbx(address,type,date,content) VALUES (?,?,?,?)',
}
module.exports = sqlMap;