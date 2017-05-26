var svgicons2svgfont = require('svgicons2svgfont');
var fs = require('fs');
var path = require('path');
var TTFStream = require('./ttfstream');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');

function merge2font(fontDir, fontName, svgDir, svgs){
  return new Promise(function(resolve, reject){
    var fontStream = svgicons2svgfont({
      fontName: fontName
    });

    fontStream.pipe(fs.createWriteStream(path.join(fontDir, fontName+'.svg')))
      .on('finish',function() {

      })
      .on('error',function(err) {
        console.log(err);
      });
    var code = 0xe001;
    var svgArr = [];
    var glyphArr = [];
    svgs.map(function(svg){
      // Writing glyphs
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
    console.log('iconfont.svg successfully created!');

    var ttfStream = fontStream.pipe(new TTFStream({
      fp: path.join(fontDir, fontName+'.ttf')
    }));
    ttfStream.on('end', function(data) {
      console.log('iconfont.ttf successfully created.');
      var ttfcontent = new Uint8Array(data);
      var woffcontent = new Buffer(ttf2woff(ttfcontent).buffer);
      var eotcontent = new Buffer(ttf2eot(ttfcontent).buffer);
      fs.writeFile(path.join(fontDir, fontName+'.woff'), woffcontent, 'utf-8', function(err) {
        if(!err) {
          console.log('iconfont.woff successfully created.');
        }
      });
      fs.writeFile(path.join(fontDir, fontName+'.eot'), eotcontent, 'utf-8', function(err) {
        if(!err) {
          console.log('iconfont.eot successfully created.');
        }
      });
      resolve(glyphArr);
    });
    fontStream.end();
  });
}
module.exports = merge2font;

