var express = require("express");
var Busboy = require("busboy");
var router = express.Router();
var { transcation, pool,find } = require('./mysql_config');
var {upload} =  require("./utils");
var {verfity} = require('./api.js');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });

/**
 * @params
 * page 必须
 * limit 必须
 * column 列
 * order 'asc' 'desc'
 */
router.get("/list",function(req,res) {
    
    var pramas = req.query;
    console.log(pramas);
    var sql ;
    if (!pramas['page'] || !pramas['limit']) {
        res.send({
            code:'param_incomplete',
            message:'参数不完整',
        })
    }
    var page = pramas['page']*1-1;
    var limit = pramas['limit']*1;
    var start = (page-1)*limit;

    if (isNaN(page) || isNaN(limit)){
        res.send({
            code:"param_err",
            message:'参数错误'
        })
    }
    if (pramas['column'] && pramas['order']) {
        if (pramas['order'].indexOf(['ascending','descending']) === -1){
            res.send({
                code:"pramas_err",
                message:'参数错误'
            })
        } else {
            sql = `select jk_course.id id,jk_course.name name, jk_course.type type,jk_teacher.name teacher,intro,price,image_large,image_small,apply_count,class_time,class_hour,class_password from jk_course inner join jk_teacher on jk_course.teacher = jk_teacher.id order by ${pool.escapeId()} ${pramas['order']==="ascending"?'asc':'desc'}  limit ?,?`;
        }
    } else {
        sql = `select jk_course.id id,jk_course.name name,jk_course.type type,jk_teacher.name teacher,intro,price,image_large,image_small,apply_count,class_time,class_hour,class_password from jk_course inner join jk_teacher on jk_course.teacher = jk_teacher.id limit ?,?`
    }
    var sql_pramas = [page,limit];
    
    pool.query(sql,sql_pramas,function(err,data) {
        if (err) {
            console.log(err);
        } else {
            res.send({
                code:"success",
                data:data
            })
        }
    });

});


// 增
router.post('/add',verfity,function(req,res){
    var busboy = new Busboy({headers:req.headers});
    req.pipe(busboy);
    upload(busboy,'course',function(course){
        
    });
});

// 改
router.post('/motify',verfity,function(req,res) {
    
});

router.post('/remove',verfity,function(req,res){
    var pramas = req.body;
    if (!pramas['id']) {
        res.send({
            code:'param_incomplete',
            message:'参数不完整',
        })
    }

    var sqls = [
        {
            sql:'delete from jk_course where id = ?',
            prams:[pramas['id']]
        }
    ];
    transcation(sqls,function(err,data){
        if (err) {
            
        } else {

        }
    });
})

module.exports = router;

