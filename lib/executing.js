var fs = require('fs');
var co = require('co');
var merge2font = require('./merge2font.js');
var path = require('path');
var makeCss = require('./makecss');
var makeHtml = require('./makehtml');
var makeJson = require('./makejson');
var pfunc = require('./pfunc');


var executing = function(svgDir, fontName, fontDir){
  return co(function* (){
    var svgfiles = yield pfunc.pFsReaddir(svgDir);
    
    yield pfunc.pWriteDir(fontDir);

    var glyphArr = yield merge2font(fontDir, fontName, svgDir, svgfiles);    

    var cssFilePath = path.join(fontDir, fontName+'.css');
    var cssText = makeCss(fontName, glyphArr);
    yield pfunc.pWriteFile(cssFilePath, cssText, 'utf-8');
    console.log('iconfont.css successfully created.');

    var htmlFilePath = path.join(fontDir, 'demo.html');
    var htmlText = makeHtml(fontName, glyphArr);
    yield pfunc.pWriteFile(htmlFilePath, htmlText, 'utf-8');    
    console.log('demo.html successfully created.');

    var jsonFilePath = path.join(fontDir, fontName+'.json');
    var jsonText = makeJson(glyphArr);
    yield pfunc.pWriteFile(jsonFilePath, jsonText, 'utf-8');    
    console.log('iconfont.json successfully created.');
  });
};

module.exports = executing;