var Writable = require('stream').Writable;
var util = require('util');
var svg2ttf = require('svg2ttf');
var fs = require('fs');
function TTFStream(options) {
  if (!(this instanceof TTFStream)) {
    return new TTFStream(options);
  }
  Writable.call(this);
  this.filepath = options.fp;
  this._data = [];
  this._size = 0;
}
util.inherits(TTFStream, Writable);
TTFStream.prototype.write = function(data, encoding) {
  if (!util.isBuffer(data)) {
    data = new Buffer(data, encoding);
  }
  this._data.push(data);
  this._size += data.length;
};
TTFStream.prototype.end = function(data, encoding) {
  data && this.write(data,encoding);
  var buf = Buffer.concat(this._data);
  var ttf = new Buffer(svg2ttf(buf.toString(encoding || 'utf8'), {}).buffer);
  this.emit('end', ttf);
  fs.createWriteStream(this.filepath).write(ttf);
};
module.exports = TTFStream;
