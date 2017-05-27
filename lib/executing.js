var fs = require('fs');
var co = require('co');
var merge2font = require('./merge2font.js');
var path = require('path');
var makeCss = require('./makecss');
var makeHtml = require('./makehtml');
var makeJson = require('./makejson');
var pfunc = require('./pfunc');
var svg2ttf = require('svg2ttf');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');

var executing = function(svgDir, fontName, fontDir){
  return co(function* (){
    var svgfiles = yield pfunc.pFsReaddir(svgDir);
    
    yield pfunc.pWriteDir(fontDir);

    var glyphArr = yield merge2font(fontDir, fontName, svgDir, svgfiles);    
    console.log(fontName+'.svg successfully created!');

    var ttf = svg2ttf(fs.readFileSync(path.join(fontDir, fontName+'.svg'),'utf-8'), {});
    yield pfunc.pWriteFile(path.join(fontDir, fontName+'.ttf'), new Buffer(ttf.buffer));
    console.log(fontName+'.ttf successfully created!');

    var woffcontent = new Buffer(ttf2woff(ttf).buffer);
    var eotcontent = new Buffer(ttf2eot(ttf).buffer);
    yield pfunc.pWriteFile(path.join(fontDir, fontName+'.woff'), woffcontent, 'utf-8')
    console.log(fontName+'.woff successfully created.');
    yield pfunc.pWriteFile(path.join(fontDir, fontName+'.eot'), eotcontent, 'utf-8')
    console.log(fontName+'.eot successfully created.');

    var cssFilePath = path.join(fontDir, fontName+'.css');
    var cssText = makeCss(fontName, glyphArr);
    yield pfunc.pWriteFile(cssFilePath, cssText, 'utf-8');
    console.log(fontName+'.css successfully created.');

    var htmlFilePath = path.join(fontDir, fontName+'.html');
    var htmlText = makeHtml(fontName, glyphArr);
    yield pfunc.pWriteFile(htmlFilePath, htmlText, 'utf-8');    
    console.log(fontName+'.html successfully created.');

    var jsonFilePath = path.join(fontDir, fontName+'.json');
    var jsonText = makeJson(glyphArr);
    yield pfunc.pWriteFile(jsonFilePath, jsonText, 'utf-8');    
    console.log(fontName+'.json successfully created.');
  });
};

module.exports = executing;