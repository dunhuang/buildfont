var fs = require('fs');
var util = require('util');
var merge2font = require('./merge2font.js');
var path = require('path');
var makeCss = require('./makecss');
var makeHtml = require('./makehtml');
var makeJson = require('./makejson');
var svg2ttf = require('svg2ttf');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');
var readdir = util.promisify(fs.readdir);
var stat = util.promisify(fs.stat);
var mkdir = util.promisify(fs.mkdir);
var writeFile = util.promisify(fs.writeFile);

var executing = async function(svgDir, fontName, fontDir){
  try{
    var svgfiles = await readdir(svgDir);
    svgfiles = svgfiles.filter((svg) => {
      if(!/.svg$/.test(svg)) return false;
      return true;
    });

    try{
      var status = await stat(fontDir);
      if(!status){
        await mkdir(fontDir);
      }
    } catch(e){
      await mkdir(fontDir);
    }
    var glyphArr = await merge2font(fontDir, fontName, svgDir, svgfiles);    
    console.log(fontName+'.svg successfully created!');

    var ttf = svg2ttf(fs.readFileSync(path.join(fontDir, fontName+'.svg'),'utf-8'), {});
    await writeFile(path.join(fontDir, fontName+'.ttf'), new Buffer(ttf.buffer));
    console.log(fontName+'.ttf successfully created!');

    var woffcontent = new Buffer(ttf2woff(ttf).buffer);
    var eotcontent = new Buffer(ttf2eot(ttf).buffer);
    await writeFile(path.join(fontDir, fontName+'.woff'), woffcontent, 'utf-8');
    console.log(fontName+'.woff successfully created.');
    await writeFile(path.join(fontDir, fontName+'.eot'), eotcontent, 'utf-8')
    console.log(fontName+'.eot successfully created.');

    var cssFilePath = path.join(fontDir, fontName+'.css');
    var cssText = makeCss(fontName, glyphArr);
    await writeFile(cssFilePath, cssText, 'utf-8');
    console.log(fontName+'.css successfully created.');

    var htmlFilePath = path.join(fontDir, fontName+'.html');
    var htmlText = makeHtml(fontName, glyphArr);
    await writeFile(htmlFilePath, htmlText, 'utf-8');    
    console.log(fontName+'.html successfully created.');

    var jsonFilePath = path.join(fontDir, fontName+'.json');
    var jsonText = makeJson(glyphArr);
    await writeFile(jsonFilePath, jsonText, 'utf-8');    
    console.log(fontName+'.json successfully created.');
  } catch(e) {
    console.log(e.message)
  }
};

module.exports = executing;