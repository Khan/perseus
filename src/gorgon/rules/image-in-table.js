import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "image-in-table",
    selector: "table image",
    message: `Image in table:
do not put images inside of tables.`,
});
