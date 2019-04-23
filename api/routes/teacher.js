var express = require('express');
var UUID = require('uuid');
var md5 = require('md5');

var Busboy = require('busboy');

var router = express.Router();
var { transcation, pool,find } = require('./mysql_config');
var {upload} =  require("./utils");
var {verfity} = require('./api.js');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 增
router.post('/add',verfity, function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  req.pipe(busboy);
  var id = UUID.v1();
  upload(busboy, "t_images", function (teacher) {
    teacher['id']
    var sqls = [{
      sql: "insert into jk_teacher values(?,?,?,?,?,?)",
      params: [id, teacher.name, teacher.type, teacher.imgPath, teacher.descreption, teacher.status]
    }];
    transcation(sqls,
      function (err, data) {
        if (err) {
          res.send({
            code: "err",
            message: "保存失败"
          })
        } else {
          res.send({
            code: "success",
            data:teacher 
          });
        }
      }
    );

  });
});

// 删
router.get('/delete',verfity, function (req, res) {
  var id = req.query.id;
  var sqls = [
    {
      sql: "delete from jk_teacher where id = ?",
      params: [id]
    }
  ]
  transcation(sqls, function (err, data) {
    if (err) {
      res.send({
        code: "err",
        message: "删除失败"
      })
    } else {
      res.send({
        code: "success",
        message: "删除成功"
      })
    }
  })
});

// 改
router.post('/motify',verfity, function (req, res) {
  var busboy = new Busboy({ headers: req.headers });
  req.pipe(busboy);
  upload(busboy,"t_images",function(teacher){
    console.log(teacher);
    var sqls = [
      {
        sql:"update jk_teacher set name = ?,type= ?,imgPath =?,descreption=?,status=? where id =?",
        params:[teacher.name,teacher.type,teacher.imgPath,teacher.descreption,teacher.status,teacher.id]
      }
    ];
    transcation(sqls,function(err,data) {
      if (err) {
        res.send({
          code:'err',
          message:'修改失败，请稍后重试！'
        })
      } else {
        res.send({
          code:'success',
          data:teacher
        })
      }
    })
  })
});


// 查
router.get('/list', function (req, res) {
  var param = req.query;
  if (!param['page'] || !param['limit']) {
    res.send({
      code:'param_incomplete',
      message:'参数不完整',
    });
  }  
  if (isNaN(param['page']*1) && isNaN(param['limit']*1)) {
    res.send({
      code:"parma_err",
      message:"参数错误"
    });
  }
  var start = (param.page-1)*param.limit;
  var limit = 1*param.limit;
  var sql = "";
  var params = [start,limit];
  if (param['column'] && param['order']){
    console.log(param['column'],param['order']);
    if (param['order'] === "ascending")
    sql = "select id,name,type,imgPath,descreption,status from jk_teacher order by "+ pool.escapeId(param['column']) +" asc limit ?,? ";
    else 
    sql = "select id,name,type,imgPath,descreption,status from jk_teacher order by "+ pool.escapeId(param['column']) +" desc limit ?,? ";
  } else {
    sql = 'select id,name,type,imgPath,descreption,status from jk_teacher limit ?,?';
  }


  find("select count(id) from jk_teacher",[],function(err,data) {
    if (err) {
      res.send({
        code:"err",
        message:"查询失败"
      })
    } else {
      var count = data[0]['count(id)'];
      console.log(sql,params);
      find(sql,params,function(err,data) {
        if (err){
          res.send({
            code:"err",
            message:"查询失败"
          })
        } else {
          var result = {
            code:"success",
            data:{
              teachers:data,
              count:count
            }
          };
          res.send(result);
        }
      });      
    }
  });   
});                                  

module.exports = router;
