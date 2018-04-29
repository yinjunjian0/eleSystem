// sql语句
var sqlMap = {
    // 用户
    user: {
        name: 'SELECT * FROM user_login where user_name = ?'
    },
    regis: {
        regis_data: 'INSERT INTO user_login(user_name,user_password,user_type,user_email,user_phone,user_date,yue) VALUES (?,?,?,?,?,?,0)',
    },
    zdcx: 'SELECT * FROM user_juminzd where user_name = ?',
    gzbx: 'INSERT INTO ele_gzbx(address,type,date,content) VALUES (?,?,?,?)',
    ly: {
        select: 'SELECT * FROM ele_ly',
        insert: 'INSERT INTO ele_ly(title,type,content,date) VALUES (?,?,?,?)'
    },
    xgmm: {
        update: 'UPDATE user_login SET user_password = ? WHERE user_name = ?',
        updateyue: 'UPDATE user_login SET yue = ? WHERE user_name = ?'
    },
    // 管理员
    admin: {
        login: 'SELECT * FROM admin_login where loginname = ?'
    },
    gonggao: {
        select: 'SELECT * FROM ele_gonggao'
    },
    gzgl: {
        select: 'SELECT * FROM ele_gzbx'
    },
    zd: {
        insert: 'INSERT INTO user_juminzd(user_name,date,yongdian) VALUES (?,?,?)'
    },
    user_jumin_zd: {
        select: 'SELECT * FROM user_juminzd where user_name = ?'
    },
    // 数据管理员
    dataadmin: {
        select: 'SELECT * FROM dataadmin_login where loginname = ?'
    },
    // gzbx: {
    // 	update: 'UPDATE ele_gzbx SET progress = ? ,updatetime = ? WHERE id = ? '
    // },
    b: {
        select: {
            userloginex: 'SELECT count( * ) as count FROM user_login WHERE `user_name` = ?', //查询知否存在
            userlogin: 'SELECT * FROM user_login',
            user_jumin_zd: 'SELECT * FROM user_juminzd',
            user_gongye_zd: 'SELECT * FROM user_gongyezd',
            user_gzgl: 'SELECT * FROM ele_gzbx',
            userrecord: 'SELECT * FROM user_record',
            userrecordwhere: 'SELECT * FROM user_record where user_name = ?',
            admin_zh: 'SELECT * FROM admin_login',
            admin_gggl: 'SELECT * FROM ele_gonggao',
            admin_lygl: 'SELECT * FROM ele_ly',
            dataadmin_zh: 'SELECT * FROM dataadmin_login',
        },
        insert: {
            userlogin: 'INSERT INTO user_login(user_name,user_password,user_type,user_email,user_phone,user_date) VALUES (?,?,?,?,?,?)',
            user_jumin_zd: 'INSERT INTO user_juminzd(user_name,date,gu,feng,ping,yongdian,dianfei) VALUES (?,?,?,?,?,?,?)',
            user_gongye_zd: 'INSERT INTO user_gongyezd(user_name,date,yongdian,dianfei) VALUES (?,?,?,?)',
            user_gzgl: 'INSERT INTO ele_gzbx(name,address,type,date,content,progress,updatetime) VALUES (?,?,?,?,?,?,?)',
            admin_zh: 'INSERT INTO admin_login(loginname,password) VALUES (?,?)',
            admin_gggl: 'INSERT INTO ele_gonggao(title,content,date) VALUES (?,?,?)',
            admin_lygl: 'INSERT INTO ele_ly(title,name,type,content,date) VALUES (?,?,?,?,?)',
            dataadmin_zh: 'INSERT INTO dataadmin_login(loginname,password) VALUES (?,?)',
            gonggao: 'INSERT INTO ele_gonggao(title,content,date) VALUES (?,?,?)',
            userrecord: 'INSERT INTO user_record(user_name,date,dianfei) VALUES (?,?,?)'
        },
        update: {
            userlogin: 'UPDATE user_login SET user_name = ?,user_password =?, user_type =?, user_email =?, user_phone =?, user_date = ? WHERE id = ? ',
            user_jumin_zd: 'UPDATE user_juminzd SET user_name = ? ,date = ?,gu = ? , feng = ? , ping = ? , yongdian = ? , dianfei = ? WHERE id = ? ',
            user_gongye_zd: 'UPDATE user_gongyezd SET user_name = ? ,date = ?, yongdian = ? , dianfei = ? WHERE id = ? ',
            user_gzgl: 'UPDATE ele_gzbx SET name = ? ,address = ?, type = ? , date = ? , content = ? , progress = ? , updatetime = ? WHERE id = ? ',
            admin_zh: 'UPDATE admin_login SET loginname = ? ,password = ? WHERE id = ? ',
            admin_gggl: 'UPDATE ele_gonggao SET title = ? ,content = ?,date = ? WHERE id = ? ',
            admin_lygl: 'UPDATE ele_ly SET title = ? ,name = ?,type = ?,content = ?,date = ? WHERE id = ? ',
            dataadmin_zh: 'UPDATE dataadmin_login SET loginname = ? ,password = ? WHERE id = ? ',
            userrecord: 'UPDATE user_record SET user_name = ? ,date = ?, dianfei = ?  WHERE id = ? ',
            gzbx: 'UPDATE ele_gzbx SET progress = ? ,updatetime = ? WHERE id = ? '
        },
        delete: {
            userlogin: 'DELETE FROM user_login WHERE id = ?',
            user_jumin_zd: 'DELETE FROM user_juminzd WHERE id = ?',
            user_gongye_zd: 'DELETE FROM user_gongyezd WHERE id = ?',
            user_gzgl: 'DELETE FROM ele_gzbx WHERE id = ?',
            userrecord: 'DELETE FROM user_record WHERE id = ?',
            admin_zh: 'DELETE FROM admin_login WHERE id = ?',
            admin_gggl: 'DELETE FROM ele_gonggao WHERE id = ?',
            admin_lygl: 'DELETE FROM ele_ly WHERE id = ?',
            dataadmin_zh: 'DELETE FROM dataadmin_login WHERE id = ?',
            gonggao: 'DELETE FROM ele_ly WHERE id = ?',
            ly: 'DELETE FROM ele_ly WHERE id = ?',
        },
        // 验证
        verify: {
            nameExist: 'select count(*) from user_login where user_name = ?',
            monthExist: 'select count(*) from user_juminzd where user_name = ? and date = ?',
            gynameExist: 'select count(*) from user_gongyezd where user_name = ?',
            gymonthExist: 'select count(*) from user_gongyezd where user_name = ? and date = ?',
            jumindianfei: 'select * from user_juminzd where user_name = ? and date = ?',
            gydianfei: 'select * from user_gongyezd where user_name = ? and date = ?',
            recordExist: 'select count(*) from user_record where user_name = ? and date = ?'
        },
        recharge: 'UPDATE `elesystem`.`user_login` SET yue = yue + ? WHERE (`user_name` = ?);'
    }

}
module.exports = sqlMap;