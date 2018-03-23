function makecolorfulcjs(svg){
  return 'function getSvg(){return \''+svg+'\'}; module.exports = getSvg;';
}
module.exports = makecolorfulcjs