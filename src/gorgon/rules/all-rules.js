// TODO(davidflanagan):
// This should probably be converted to use import and to export
// and object that maps rule names to rules. Also, maybe this should
// be an auto-generated file with a script that updates it any time
// we add a new rule?
module.exports = [
    require("./blockquoted-math.js"),
    require("./blockquoted-widget.js"),
    require("./heading-level-1.js"),
    require("./heading-level-skip.js"),
    require("./heading-sentence-case.js"),
    require("./heading-title-case.js"),
    require("./image-alt-text.js"),
    require("./image-in-table.js"),
    require("./link-click-here.js"),
    require("./link-image-url.js"),
    require("./long-paragraph.js"),
    require("./math-adjacent.js"),
    require("./math-align-extra-break.js"),
    require("./math-align-linebreaks.js"),
    require("./math-empty.js"),
    require("./math-font-size.js"),
    require("./math-frac.js"),
    require("./math-nested.js"),
    require("./math-starts-with-space.js"),
    require("./math-text-empty.js"),
    require("./nested-lists.js"),
    require("./table-missing-cells.js"),
    require("./unescaped-dollar.js"),
    require("./widget-in-table.js"),
];
