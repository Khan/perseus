/**
 * For clients that want the full perseus bundle, we always load the extra
 * widgets.
 */
module.exports = require("./perseus.js");
module.exports.init({loadExtraWidgets: true, skipMathJax: true});
