var svgicons2svgfont = require('svgicons2svgfont');
var fs = require('fs');
var path = require('path');
// var TTFStream = require('./ttfstream');
// var ttf2eot = require('ttf2eot');
// var ttf2woff = require('ttf2woff');

function merge2font(fontDir, fontName, svgDir, svgs){
  return new Promise(function(resolve, reject){
    var fontStream = svgicons2svgfont({
      fontName: fontName
    });

    var code = 0xe001;
    var svgArr = [];
    var glyphArr = [];

    fontStream.pipe(fs.createWriteStream(path.join(fontDir, fontName+'.svg')))
      .on('finish',function() {
        resolve(glyphArr);
      })
      .on('error',function(err) {
        console.log(err);
        reject(err);
        throw err;
      });

    svgs.map(function(svg){
      var glyph = fs.createReadStream(path.join(svgDir, svg));
      var svgname = svg.match(/(^.+)\.svg$/)[1];
      if(svgArr.indexOf(svgname)>-1){
        throw new Error('svg files can not have same name!');
      }
      else{
        svgArr.push(svgname);
      }
      glyph.metadata = {
        unicode: [String.fromCharCode(code)],
        name: svgname
      };
      glyphArr.push({code: code, name: svgname});
      code++;
      fontStream.write(glyph);
    });
    
    fontStream.end();
  });
}
module.exports = merge2font;

