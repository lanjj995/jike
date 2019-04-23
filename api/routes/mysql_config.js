var mysql = require("mysql");

// 创建连接池
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "gongkao",
    connectionLimit:10
});

function find(sql,params,callback){
    pool.query(sql,params,function(err,data) {
        if (err) {
          callback(err,null);
        } else {
          callback(null,data);
        }
      })
}

// transcation
function transcation(sqls, callback) {
    // 获取连接
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log("获取连接失败");
        } else {
            console.log("获取连接成功");
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log("开启手动事务失败");
                } else {
                    console.log("开启手动事务成功");
                    var arr = [];
                    sqls.forEach(function (ele) {
                        var p1 = new Promise(function (resolve, reject) {
                            conn.query(ele.sql,ele.params,function(err,result) {
                                if (err) {
                                    console.log("执行sql语句出错");
                                    reject(err);
                                } else {
                                    console.log("执行sql语句成功");
                                    resolve(result);
                                }
                            });
                        });
                        arr.push(p1);
                    });
                    Promise.all(arr).then(function(data){

                        conn.commit(function(err) {
                            if (err) {
                                console.log("提交事务失败");
                                conn.rollback(function(err) {
                                    if (err) {
                                        console.log("回滚事务失败");
                                    } else {
                                        console.log("回滚事务成功");
                                        conn.release();
                                    }
                                });
                                callback(err,null);
                            } else {
                                console.log("提交事务成功");
                                callback(null,data);
                            }
                        })
                    }).catch(function(err){
                        conn.rollback(function(err) {
                            if (err) {
                                console.log("回滚事务失败");
                            } else {
                                console.log("回滚事务成功");
                                conn.release();
                            }
                        });
                        callback(err,null);
                    });
                }
            })
        }
    })
}

module.exports = {
    transcation,
    pool,
    find
};