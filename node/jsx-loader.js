// Modified version of https://github.com/petehunt/jsx-loader to use jsx-i18n

var loaderUtils = require("loader-utils");
var babel = require("babel-core");
var options = require("./babel-options.js");
var _ = require("../lib/underscore.js");

options = JSON.parse(JSON.stringify(options));  // copy before modifying

module.exports = function(source) {
    this.cacheable && this.cacheable();

    var sourceFilename = loaderUtils.getRemainingRequest(this);
    var current = loaderUtils.getCurrentRequest(this);

    var query = loaderUtils.parseQuery(this.query);

    options = _.extend({}, options, { sourceMaps: query.sourceMap });

    var transform = babel.transform(source, options);

    if (transform.map) {
        transform.sourceMap.sources = [sourceFilename];
        transform.sourceMap.file = current;
        transform.sourceMap.sourcesContent = [source];
    }

    this.callback(null, transform.code, transform.map);
};
