module.exports = function(fontName, glyphs) {
  var cssText = '';
  var time = Date.now()+'';
  cssText += '@font-face {\n';
  cssText += '  font-family: "' + fontName + '";\n';
  cssText += '  src: url(' + fontName + '.eot?t=' + time + ');\n';
  cssText += '  src: url(' + fontName + '.eot?t=' + time + '#iefix) format("eot"),\n';
  cssText += '    url(' + fontName + '.woff?t=' + time + ') format("woff"),\n';
  cssText += '    url(' + fontName + '.ttf?t=' + time + ') format("truetype"),\n';
  cssText += '    url(' + fontName + '.svg?t=' + time + '#' + fontName + ') format("svg");\n';
  cssText += '}\n';
  cssText += '\n';
  cssText += '.iconfont {\n';
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