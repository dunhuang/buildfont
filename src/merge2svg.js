var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanUpEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    transformsWithOnePath: false,
  },{
    removeDimensions: true,
  },{
    removeAttrs: {attrs: '(stroke|fill)'},
  }]
});



async function merge2svg(fontDir, fontName, svgDir, svgs){
  return new Promise(async function(resolve, reject){
    var writableStream = fs.createWriteStream(path.join(fontDir, fontName+'.svg'));
  
    writableStream.on('finish',function() {
      resolve();
    })
    .on('error',function(err) {
      console.log(err);
      reject(err);
    });
    
    var xmlDocMerge = new DOMParser().parseFromString('<svg></svg>','text/xml'); 
    var svgDomMerge = xmlDocMerge.getElementsByTagName('svg')[0]; 
    writableStream.write('<svg>');
    svgs.map(svg => {
      var svgData = fs.readFileSync(path.join(svgDir, svg), 'utf-8');
      var xmlDoc = new DOMParser().parseFromString(svgData,'text/xml'); 
      var svgDom = xmlDoc.getElementsByTagName('svg')[0];
  
      var id = 'icon-'+svg.replace(/\.svg$/,'');
      var viewBox = svgDom.getAttribute('viewBox');
  
      
      var symbol = xmlDocMerge.createElement('symbol');
      symbol.setAttribute('id', id);
      symbol.setAttribute('viewBox', viewBox);
      for(var i=0; i<svgDom.childNodes.length;i++){
        symbol.appendChild(svgDom.childNodes[i].cloneNode(true));
      }
      svgDomMerge.appendChild(symbol);
  
      var xmlstr = new XMLSerializer().serializeToString(symbol)
      writableStream.write(xmlstr);

    });
    writableStream.write('</svg>');
    writableStream.end();
  });
}

module.exports = merge2svg;