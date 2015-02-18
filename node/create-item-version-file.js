require("./environment.js");
var ItemVersion = require("../src/item-version.js");

console.log(
    "module.exports = " +
    JSON.stringify(ItemVersion, null, 4) +
    ";"
);
