const Perseus = require("./perseus.js");
const version = require("./version.json");

module.exports = {
    apiVersion:             version.apiVersion,
    itemDataVersion:        version.itemDataVersion,
    itemVersion:            require("./item-version"),
    RevisionDiff:           require("./diffs/revision-diff.jsx"),
    StatefulArticleEditor:  require("./stateful-article-editor.jsx"),
    StatefulEditorPage:     require("./stateful-editor-page.jsx"),
    ClassNames:             require("./perseus-api.jsx").ClassNames,
    Util:                   require("./util.js"),
    ViewportResizer:        require("./components/viewport-resizer.jsx"),
    renderability:          require("./renderability.jsx"),
    accessibility:          require("./a11y.js"),
    i18n:                   require("./i18n.jsx"),
    ArticleEditor:          require("./article-editor.jsx"),
    Editor:                 require("./editor.jsx"),
    EditorPage:             require("./editor-page.jsx"),
    ...Perseus,
};
