module.exports = [
    // standard props "added" by react
    // (technically the renderer still adds them)
    "key",
    "ref",
    // added by src/renderer.jsx
    "widgetId",
    "onChange",
    "problemNum",
    "enabledFeatures",
    "apiOptions",
    "questionCompleted",
    "interWidgets",
    // added by src/editor.jsx, for widgets removing themselves
    // this is soooo not the right place for this, but alas.
    "onRemove",
];
