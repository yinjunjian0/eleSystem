var express = require('express');
var app = express();
var mysql = require('mysql');
var router = express.Router();
// 中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 数据库连接
var models = require('./db');
var connection = mysql.createConnection(models.mysql);
// connection.connect();

// 读取mapper
var $sql = require('./sqlMap');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(models.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret, sql) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败',
            data: ret,
            sql: sql
        });
    } else {
        res.json(ret);
    }
};
// 添加用户
app.post('/login', function (req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body;
        // 建立连接 增加一个用户信息 
        connection.query($sql.user.name, param.name.toString(), function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result,
                    param: param
                };
            }
            // 以json形式，把操作结果返回给前台页面     
            responseJSON(res, result);
            // 释放连接  
            connection.release();
        });
    });
});
// 注册
app.post('/regis', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.regis.regis_data, [param.name, param.password, param.identity, param.email, param.phone, param.time], function (err, result) {
            if (result) {
                 result = {
                    code: 200,
                    msg: '成功',
                    data: result,
                    param: param
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 账户信息
app.post('/zhxx', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.user.name, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result,
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 账单查询
app.post('/zdcx', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.zdcx, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result,
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 报修
app.post('/gzbx', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.gzbx, [param.name, param.address, param.problem, param.date, param.remark], function (err, result) {
            if (result) {
                res.send('报修成功')
            } else {
                responseJSON(res, result, $sql.gzbx);
            }
            connection.release();
        });
    });
});
// 留言
app.post('/ly', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.ly.insert, [param.title, param.name, param.type, param.content, param.date], function (err, result) {
            if (result) {
                res.send('留言成功')
            } else {
                responseJSON(res, result);
            }
            connection.release();
        });
    });
});
// 管理员登陆
app.post('/adminlogin', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.admin.login, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//获得公告数据
app.get('/getgonggao', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.gonggao.select, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 获得留言数据
app.get('/getly', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.ly.select, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//获得故障数据
app.get('/getgz', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.gzgl.select, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 插入账单数据
app.post('/insertzd', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.user_jumin_zd, [param.name, param.date, param.gu, param.feng, param.ping, param.yongdian, param.dianfei], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
app.post('/insert_gongyezd', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.user_gongye_zd, [param.name, param.date, param.yongdian, param.dianfei], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 修改故障进度
app.post('/update_gzbx', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.gzbx, [param.jindu, param.updatetime, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 根据名字获取账单数据
app.post('/selectname_juminzd', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.user_jumin_zd.select, [param.name], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 根据名字修改余额
app.post('/updateyue', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.xgmm.updateyue, [param.yue, param.name], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 记录收费
app.post('/insertrecord', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.userrecord, [param.name, param.date, param.dianfei], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 数据管理员登陆
app.post('/dataadmin', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.dataadmin.select, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result,
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});

// 修改密码
app.post('/xgmm', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.xgmm.update, [param.new, param.name], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result,
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});

// -------------------------------
// 数据表
// --------------------------------
// 用户登陆表载入
// --------------------------------
app.get('/b_userlogin', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.userlogin, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
app.post('/b_userloginex', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.userloginex, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//用户登陆表添加
app.post('/b_userlogin_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.userlogin, [param.name, param.password, param.identity, param.email, param.phone, param.time, param.yue], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 用户登陆更新
app.post('/b_userlogin_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.userlogin, [param.name, param.password, param.identity, param.email, param.phone, param.yue, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 用户登陆删除
app.post('/b_userlogin_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.userlogin, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 用户居民账单表载入
// --------------------------------
app.get('/b_user_jumin_zd', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.user_jumin_zd, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//用户账单表添加
app.post('/b_user_jumin_zd_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.user_jumin_zd, [param.name, param.time, param.gu, param.feng, param.ping, param.dianfei], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 用户账单更新
app.post('/b_user_jumin_zd_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.user_jumin_zd, [param.name, param.time, param.gu, param.feng, param.ping, param.dianfei, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 用户账单删除
app.post('/b_user_jumin_zd_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.user_jumin_zd, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 用户工业账单表载入
// --------------------------------
app.get('/b_user_gongye_zd', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.user_gongye_zd, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//用户账单表添加
app.post('/b_user_gongye_zd_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.user_gongye_zd, [param.name, param.time, param.yongdian, param.dianfei], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 用户账单更新
app.post('/b_user_gongye_zd_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.user_gongye_zd, [param.name, param.time, param.yongdian, param.dianfei, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 用户账单删除
app.post('/b_user_gongye_zd_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.user_gongye_zd, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 故障管理表载入
// --------------------------------
app.get('/b_user_gzgl', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.user_gzgl, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//故障管理表添加
app.post('/b_user_gzgl_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.user_gzgl, [param.name, param.address, param.type, param.date, param.content, param.progress, param.updatetime], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 故障管理更新
app.post('/b_user_gzgl_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.user_gzgl, [param.name, param.address, param.type, param.date, param.content, param.progress, param.updatetime, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 故障管理删除
app.post('/b_user_gzgl_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.user_gzgl, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 交费记录表载入
// --------------------------------
app.get('/b_user_jfjl', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.userrecord, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//交费记录表添加
app.post('/b_user_jfjl_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.userrecord, [param.name, param.date, param.dianfei], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 查询 - user
app.post('/b_record_select_where', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.userrecordwhere, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 交费记录更新
app.post('/b_user_jfjl_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.admin_zh, [param.name, param.date, param.dianfei, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 交费记录删除
app.post('/b_user_jfjl_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.admin_zh, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 管理员账号表载入
// --------------------------------
app.get('/b_admin_zh', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.admin_zh, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//管理员账号表添加
app.post('/b_admin_zh_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.admin_zh, [param.name, param.password], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 管理员账号更新
app.post('/b_admin_zh_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.admin_zh, [param.name, param.password, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 管理员账号删除
app.post('/b_admin_zh_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.admin_zh, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 数据管理员账号表载入
// --------------------------------
app.get('/b_dataadmin_zh', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.dataadmin_zh, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//数据管理员账号表添加
app.post('/b_dataadmin_zh_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.dataadmin_zh, [param.name, param.password], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 数据管理员账号更新
app.post('/b_dataadmin_zh_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.dataadmin_zh, [param.name, param.password, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 数据管理员账号删除
app.post('/b_dataadmin_zh_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.dataadmin_zh, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 公告管理表载入
// --------------------------------
app.get('/b_gggl', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.admin_gggl, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//公告管理表添加
app.post('/b_gggl_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.admin_gggl, [param.title, param.content, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 公告管理更新
app.post('/b_gggl_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.admin_gggl, [param.title, param.content, param.date, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 公告管理删除
app.post('/b_gggl_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.admin_gggl, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 留言管理表载入
// --------------------------------
app.get('/b_lygl', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.admin_lygl, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
//留言管理表添加
app.post('/b_lygl_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.admin_lygl, [param.title, param.name, param.type, param.content, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 留言管理更新
app.post('/b_lygl_update', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.update.admin_lygl, [param.title, param.name, param.type, param.content, param.date, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// 留言管理删除
app.post('/b_lygl_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.admin_lygl, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
// --------------------------------
// 公告表载入
// --------------------------------
app.post('/b_gonggao_insert', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.insert.gonggao, [param.title, param.content, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});
app.post('/b_gonggao_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.gonggao, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});

// --------------------------------
// 留言表载入
// --------------------------------
app.post('/b_ly_delete', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.delete.ly, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});

// --------------------------------
// 记录表载入
// --------------------------------
app.get('/b_record_select', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.select.userrecord, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});

// 验证

app.post('/verify_nameExist', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.nameExist, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});


app.post('/verify_monthExist', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.monthExist, [param.name, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});

app.post('/verify_gynameExist', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.gynameExist, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});


app.post('/verify_gymonthExist', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.gymonthExist, [param.name, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});


app.post('/verify_jumindianfei', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.jumindianfei, [param.name, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});



app.post('/verify_gydianfei', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.gydianfei, [param.name, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});


app.post('/verify_recordExist', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.verify.recordExist, [param.name, param.date], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});


// 充值
app.post('/recharge', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.b.recharge, [param.money, param.loginname], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});


// bug
app.post('/select_gzwhere', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.bug.select_gzwhere, param.name, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '成功',
                    data: result
                };
            }
            responseJSON(res, result);
            connection.release();
        });
    });
});











connection.end();


var server = app.listen(8001, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})



