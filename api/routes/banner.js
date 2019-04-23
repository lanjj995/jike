var express =require('express');
var {verfity} = require('./api.js');
var router = express.Router();

var {transcation,pool} = require('./mysql_config');

router.get('/',function(req,res,next){

});
// 查询所有
router.get('/list',function(req,res){
    pool.query('select id,title,imgPath,descreption,status,createDate from jk_banner',[],function(err,result) {
        if (err) {
            res.send(
                {
                    code:'err',
                    message:'查询错误，请重新查询！'
                }
            )
        } else {
            res.send({
                code:"success",
                data:result
            })
        }
    });
});

/**
 * token
 * id
 */

router.get('/delete',verfity,function(req,res) {
    // 验证token的合法性
    console.log("ssssss");
    var id = req.query.id;
    var token = req.query.token;
    if (id && token) {
        res.send({

        })
    }

    var sqls = [
        {
            sql:'delete from jk_banner where id = ?',
            params:[id]
        }
    ]
    transcation(sqls,function(err,data) {
        if (err) {
            res.send({
                code:'err',
                message:'删除失败'
            })
        } else {
            res.send({
                code:'success',
                message:'删除成功'
            })
        }
    });
});

// 修改
router.post('/motify',function(req,res) {
    var banner = req.body;
    var sqls = [
        {
            sql:'update jk_banner set title = ?,imgPath = ?,descreption = ?,status = ?,createDate = ? where id = ?',
            params:[banner.title,banner.imgPath,banner.descreption,banner.status,banner.createDate,banner.id]
        }
    ];
    transcation(sqls,function(err,data) {
        if (err) {
            res.send(
                {
                    code:'err',
                    message:'修改失败，请重试！'
                }
            )
        } else {
            res.send(
                {
                    code:'success',
                    message:'修改成功！'
                }
            )
        }
    });
});

// 增加
router.post('/add',function(err,data){
    if (err) {

    } else {
        
    }
});

module.exports = router;