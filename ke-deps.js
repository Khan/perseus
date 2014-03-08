define(function(require) {

// For legacy reasons, Perseus assumes that some modules (such as knumber) are
// executed immediately when the exercise content bundle is loaded, so we load
// them all here.

require("./ke/utils/answer-types.js");
require("./ke/utils/graphie.js");
require("./ke/utils/interactive.js");
require("./ke/utils/kline.js");
require("./ke/utils/knumber.js");
require("./ke/utils/kpoint.js");
require("./ke/utils/kray.js");
require("./ke/utils/kvector.js");
require("./ke/utils/math.js");

});
