module.exports = function(fontName, glyphs) {
  var cssText = '';
  var time = Date.now()+'';
  cssText += '@font-face {\n';
  cssText += '  font-family: "' + fontName + '";\n';
  cssText += '  src: url(' + fontName + '.eot?t=' + time + '); /* IE9*/\n' ;
  cssText += '  src: url(' + fontName + '.eot?t=' + time + '#iefix) format("eot"), /* IE6-IE8 */\n';
  cssText += '    url(' + fontName + '.woff?t=' + time + ') format("woff"), /* chrome, firefox */\n';
  cssText += '    url(' + fontName + '.ttf?t=' + time + ') format("truetype"), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\n';
  cssText += '    url(' + fontName + '.svg?t=' + time + '#' + fontName + ') format("svg"); /* iOS 4.1- */\n';
  cssText += '}\n';
  cssText += '\n';
  cssText += '.'+ fontName +' {\n';
  cssText += '  font-family: "' + fontName + '" !important;\n';
  cssText += '  -webkit-font-smoothing: antialiased;\n';
  cssText += '  -moz-osx-font-smoothing: grayscale;\n';
  cssText += '  font-style: normal;\n';
  cssText += '}\n';
  glyphs.forEach(function(glyph) {
    cssText += '.icon-' + glyph.name + ':before {';
    cssText += 'content: "\\' + glyph.code.toString(16) + '";';
    cssText += '}\n';
  });
  return cssText;
};