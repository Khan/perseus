import Rule from "../rule.js";

module.exports = Rule.makeRule({
    name: "widget-in-table",
    selector: "table widget",
    message: `Widget in table:
do not put widgets inside of tables.`,
});
