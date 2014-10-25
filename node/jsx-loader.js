// Modified version of https://github.com/petehunt/jsx-loader to use jsx-i18n

var jstransform = require("jstransform");
var jsxI18n = require("jsx-i18n");
var loaderUtils = require("loader-utils");
var visitors = require("react-tools/vendor/fbtransform/visitors");

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var sourceFilename = loaderUtils.getRemainingRequest(this);
  var current = loaderUtils.getCurrentRequest(this);

  var query = loaderUtils.parseQuery(this.query);

  var visitorList = jsxI18n.visitorList.concat(visitors.getAllVisitors());
  var transform = jstransform.transform(visitorList, source, {
    sourceMap: query.sourceMap
  });
  if (transform.sourceMap) {
    transform.sourceMap.sources = [sourceFilename];
    transform.sourceMap.file = current;
    transform.sourceMap.sourcesContent = [source];
  }
  this.callback(null, transform.code, transform.sourceMap);
};
