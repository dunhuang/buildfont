var fs = require('fs');
var util = require('util');
var path = require('path');
var merge2svg = require('./merge2svg');
var makecolorfuljs = require('./makecolorfuljs');
var makecolorfulcjs = require('./makecolorfulcjs');
var makecolorfulhtml = require('./makecolorfulhtml');
var readdir = util.promisify(fs.readdir);
var stat = util.promisify(fs.stat);
var mkdir = util.promisify(fs.mkdir);
var writeFile = util.promisify(fs.writeFile);

var buildcolorful = async function(svgDir, fontName, fontDir){
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
    await merge2svg(fontDir, fontName, svgDir, svgfiles);    
    console.log('colorful ' + fontName + '.svg successfully created!');
    
    var str = fs.readFileSync(path.join(fontDir, fontName+'.svg'),'utf-8');
    var jsstr = makecolorfuljs(str);
    await writeFile(path.join(fontDir, fontName+'.js'), jsstr, 'utf-8');
    console.log('colorful ' + fontName + '.js successfully created!');

    var jsstr2 = makecolorfulcjs(str);
    await writeFile(path.join(fontDir, fontName+'_cjs.js'), jsstr2, 'utf-8');
    console.log('colorful ' + fontName + '_cjs.js successfully created!');

    var html = makecolorfulhtml(fontName, svgfiles);
    await writeFile(path.join(fontDir, fontName+'.html'), html, 'utf-8');
    console.log('colorful ' + fontName + '.html successfully created!');
  } catch(e) {
    console.log(e.message)
  }
};

module.exports = buildcolorful;