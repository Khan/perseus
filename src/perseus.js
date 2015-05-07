require("./all-widgets.js");

var version = require("./version.json");

module.exports = {
    apiVersion:         version.apiVersion,
    itemDataVersion:    version.itemDataVersion,
    itemVersion:        require("./item-version"),
    init:               require("./init.js"),
    renderability:      require("./renderability.jsx"),
    accessibility:      require("./a11y.js"),
    i18n:               require("./i18n.jsx"),
    AnswerAreaRenderer: require("./answer-area-renderer.jsx"),
    ArticleEditor:      require("./article-editor.jsx"),
    ArticleRenderer:    require("./article-renderer.jsx"),
    Editor:             require("./editor.jsx"),
    EditorPage:         require("./editor-page.jsx"),
    ItemRenderer:       require("./item-renderer.jsx"),
    HintsRenderer:      require("./hints-renderer.jsx"),
    Renderer:           require("./renderer.jsx"),
    RevisionDiff:       require("./diffs/revision-diff.jsx"),
    StatefulEditorPage: require("./stateful-editor-page.jsx"),
    ClassNames:         require("./perseus-api.jsx").ClassNames,
    Util:               require("./util.js")
};
