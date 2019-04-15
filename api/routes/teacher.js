var express = require('express');
var UUID = require('uuid');
var md5 = require('md5');

var router = express.Router();
var {transcation,pool} = require('./mysql_config');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 增
router.post('/add',function(req,res) {
  var teacher = req.body;
  var sqls = [{
    sql:"insert into jk_teacher values(?,?,?,?)",
    params:[UUID.v1(),teacher.name,teacher.type,teacher.desc]
  }];
  transcation(sqls,
    function(err,data) {
      if (err) {
        res.send({
          code:"err",
          message:"保存失败"
        })
      } else {
        res.send ( {
          code:"success",
          message:"保存成功"
        } );
      }
    }
  );
});

// 删
router.get('/delete',function(req,res) {
  var id = req.query.id;
  var sqls = [
    {
      sql:"delete from jk_teacher where id = ?",
      params:[id]
    }
  ]
  transcation(sqls,function(err,data) {
    if (err) {
      res.send({
        code:"err",
        message:"删除失败"
      })
    } else {
      res.send({
        code:"success",
        message:"删除成功"
      })
    }
  })
});

// 改
router.post('/motify',function(req,res){

});

// 查
router.get('/list',function(req,res){
  pool.query("select id,name,type,imgPath,status,descreption from jk_teacher",[],(err,data)=>{
    if (err) {
      console.log(err);
      res.send({
        code:"err",
        message:"查询失败"
      });
    } else {
      res.send({
        code:"success",
        data: data
      });
    }
  });
});

module.exports = router;
