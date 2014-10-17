define(function(require) {

// For legacy reasons, Perseus assumes that some modules (such as knumber) are
// executed immediately when the exercise content bundle is loaded, so we load
// them all here.

require("./ke/utils/answer-types.js");
require("./ke/utils/graphie.js");
require("./ke/utils/interactive.js");
require("./ke/utils/math.js");

});
