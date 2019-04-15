var Busbody = require('busboy');
var fs = require('fs');
var path = require('path');

function upload(req){
    var bus = new Busbody({headers:req.headers});

    req.pipe(bus);
    
    bus.on("file",function (fieldname, file, filename, encoding, contype) {
        //fieldname input字段名称
        //file 文件对象
        //filename 文件名称
        //encoding文件编码
        //contype文件类型
        console.log(fieldname,file, filename, encoding, contype);
        var stream = fs.createWriteStream(__dirname+"/"+filename)
        file.on("data",function (data) {
            stream.write(data)
        })
        file.on("end",function () {
            stream.end();
            console.log("上传完成")
        })
    })   

    var user = {};
    //提取文本内容
    bus.on("field",function (fieldname, val) {
        user[fieldname] = val;
    })

    //监听finish 来获取所有操作的完成
    bus.on("finish",function () {
        console.log(user)
        //数据库操作
        res.send(user)
    })
}

module.exports = {upload};