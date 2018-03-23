var program = require('commander');
var fs = require('fs');
var version = require('../package.json').version;
var executing = require('./executing');
var buildcolorful = require('./buildcolorful');
var path = require('path');
var config = require('./config'); 

program
  .version(version)
  .usage('[options] <directory ...>')
  .option('-p, --path <path>', 'root path of svg files. defaults to ./svgs')
  .option('-F, --fontname <fontname>', 'name of font. defaults to iconfont')
  .option('-c, --colorful', 'build colorful svg-sprites files')
  .parse(process.argv);

 
if(!program.path) program.path = config.svgdir;
if(!program.fontname) program.fontname = config.fontname;
 
var svgdir = path.isAbsolute(program.path) ? program.path : path.join(process.cwd(),  program.path);

var fontsdir = path.join(process.cwd(), config.fontdir);
var svgicondir = path.join(process.cwd(), config.svgicondir);
fs.stat(svgdir, function(err, stat) {
  if (err) {
    console.dir(err);
  } else {
    if (stat.isDirectory()) {
      if(program.colorful) {
        buildcolorful(svgdir, 'svgsymbol', svgicondir);
      } else {
        executing(svgdir, program.fontname, fontsdir);    
      }
    } else {
      console.log('%s is not a legal directory', svgdir);
    }
  }
});


