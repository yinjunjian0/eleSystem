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
	ly:{
		select: 'SELECT * FROM ele_ly',
		insert: 'INSERT INTO ele_ly(title,type,content,date) VALUES (?,?,?,?)'
	},
	// 管理员
	admin:{
		login: 'SELECT * FROM admin_login where loginname = ?'
	},
	gonggao:{
		select: 'SELECT * FROM ele_gonggao'
	},
	gzgl:{
		select: 'SELECT * FROM ele_gzbx'
	}

}
module.exports = sqlMap;