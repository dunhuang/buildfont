var SVGIcons2SVGFontStream = require('svgicons2svgfont');
var fs = require('fs');
var path = require('path');
var Readable = require('stream').Readable;

async function merge2font(fontDir, fontName, svgDir, svgs){
  return new Promise(async function(resolve, reject){
    
    var fontStream = new SVGIcons2SVGFontStream({
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
      });
      
    svgs.map((svg, i) => {
      var glyph = new Readable();
      glyph.push(fs.readFileSync(path.join(svgDir, svg)));
      glyph.push(null);
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
    })

    fontStream.end();
  });
}

module.exports = merge2font;