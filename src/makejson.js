module.exports = function(glyphs) {
  var json = '{\n';
  glyphs.forEach(function(glyph, i) {
    json += '  "'+ glyph.name +'": ' + glyph.code ;
    if(i!==glyphs.length -1) json += ',\n' ;
  });
  json += '\n}\n';
  return json;
};