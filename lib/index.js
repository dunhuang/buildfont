var program = require('commander');
var fs = require('fs');
var version = require('../package.json').version;
var executing = require('./executing');
var path = require('path');
var config = require('./config');

program
  .version(version)
  .usage('[options] <directory ...>')
  .option('-s, --svgs <path>', 'root path of svg files. defaults to ./svgs')
  .parse(process.argv);

if(!program.svgs) program.svgs = config.svgdir;

var svgdir = path.join(process.cwd(),  program.svgs);
var fontsdir = path.join(process.cwd(), config.fontdir);
fs.stat(program.svgs, function(err, stat) {
  if (err) {
    console.dir(err);
  } else {
    if (stat.isDirectory()) {
      executing(svgdir, config.fontname, fontsdir);    
    } else {
      console.log('%s is not a legal directory', program.svgs);
    }
  }
});

