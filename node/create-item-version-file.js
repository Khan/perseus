require("./environment.js");
var ItemVersion = require("../src/item-version.js");

console.log(
    "/* eslint-disable comma-dangle */\n\n" +
    "module.exports = " +
    JSON.stringify(ItemVersion, null, 4) +
    ";"
);
