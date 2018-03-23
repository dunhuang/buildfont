var fs = require('fs');

var pFsReaddir = function(dir){
  return new Promise(function(resolve, reject){
    fs.readdir(dir, function(err, files){
      if(err) {
        reject(err);
      }
      else{
        resolve(files);
      }
    });
  })
};

var pWriteDir = function(dir){
  return new Promise(function(resolve, reject){
    fs.stat(dir, function(err, stat){
      if (stat) {
        resolve(dir);
      } else {
        fs.mkdir(dir, function(err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(dir);
          }
        });
      }
    });
  });
}

var pWriteFile = function(file, data, options){
  return new Promise(function(resolve, reject){
    fs.writeFile(file, data, options, function(err, stat){
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  pFsReaddir: pFsReaddir,
  pWriteFile: pWriteFile,
  pWriteDir: pWriteDir
}