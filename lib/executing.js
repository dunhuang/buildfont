var fs = require('fs');
var co = require('co');
var merge2font = require('./merge2font.js');
var path = require('path');
var makeCss = require('./makecss');
var makeHtml = require('./makehtml');

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

var executing = function(svgDir, fontName, fontDir){
  return co(function* (){
    var svgfiles = yield pFsReaddir(svgDir);
    yield pWriteDir(fontDir);
    var glyphArr = yield merge2font(fontDir, fontName, svgDir, svgfiles);    

    var cssFilePath = path.join(fontDir, fontName+'.css');
    var cssText = makeCss(fontName, glyphArr);
    fs.writeFileSync(cssFilePath, cssText, 'utf-8');
    console.log('iconfont.css successfully created.');

    var htmlFilePath = path.join(fontDir, 'demo.html');
    var htmlText = makeHtml(fontName, glyphArr);
    fs.writeFileSync(htmlFilePath, htmlText, 'utf-8');    
    console.log('demo.html successfully created.');
  });
};

module.exports = executing;
//getLargestFile('/Users/shiyinghua/Downloads').then(files=>{console.log(files)})