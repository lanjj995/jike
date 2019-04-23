var UUID = require('uuid');
var fs = require('fs');
var path = require('path');
/**
 * 
 * @param {*} busboy 已经获取req的数据的busboy 
 * @param {*} savedir 需要保存的文件夹
 * @param {*} cb    回调
 */
function upload(busboy, savedir, cb) {
    var url = path.join(__dirname,"..",'public',savedir);
  
    if (!fs.existsSync(url)) {
      fs.mkdirSync(url);
    }
    var obj = {};
    var imgName = "";
    busboy.on("file", function (filedname, file, filename, encoding, contype) {
  
      imgName = UUID.v1() + "." + filename.split(".")[1];
      obj['imgPath'] = "/" + savedir + "/" + imgName;
      var stream = fs.createWriteStream(path.join(url, imgName));
      file.on("data", function (data) {
        stream.write(data);
      });
  
      file.on("end", function () {
        stream.end();
      })
    });
    busboy.on("field", function (field, value) {
      obj[field] = value;
    })
  
    busboy.on("finish", () => {
      cb(obj)
    });
  }

  module.exports = {
    upload,
};