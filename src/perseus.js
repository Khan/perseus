require("./all-widgets.js");

module.exports = {
    fixupJSON:          require("./fixup-json.jsx"),
    init:               require("./init.js"),
    AnswerAreaRenderer: require("./answer-area-renderer.jsx"),
    Editor:             require("./editor.jsx"),
    EditorPage:         require("./editor-page.jsx"),
    ItemRenderer:       require("./item-renderer.jsx"),
    Renderer:           require("./renderer.jsx"),
    RevisionDiff:       require("./diffs/revision-diff.jsx"),
    StatefulEditorPage: require("./stateful-editor-page.jsx"),
    Util:               require("./util.js")
};
