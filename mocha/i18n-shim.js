// Jed detects whether we are using require(), and if so, sends
// an export rather than making a global, so we make that global
// explicitly for i18n.js
global.Jed = window.Jed = require("../ke/local-only/jed.js");

// i18n.js has a line with
//     window.i18n = new Jed({});
//     i18n.options.locale_data = {};
// For this to work, we need to add the i18n global as soon as window.i18n
// is defined. We use Object.defineProperty to do this
//Object.defineProperty(window, "i18n", {
//    get: function() { console.log("GET i18n"); return global.i18n; },
//    set: function(value) { console.log("SET i18n", value); global.i18n = value; }
//});

require("../ke/local-only/i18n.js");

