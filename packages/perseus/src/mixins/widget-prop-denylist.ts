/**
 * These are things that widgets should exclude when serializing themselves.
 *
 * The use of this list needs to die. Basically, there are codepaths that
 * blindly serialize the "props" of a widget so that it can pass around its
 * info. Unfortunately, props aren't guaranteed to be serializable, and
 * automatically serializing schemaless list of attributes causes issues (e.g.
 * circular JSON structures sometimes).
 *
 * This blocks things that we know don't need to be serialized.
 */
/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
const denylist = [
    // standard props "added" by react
    // (technically the renderer still adds them)
    "key",
    "ref",
    // added by src/renderer.jsx
    "containerSizeClass",
    "widgetId",
    "onChange",
    "problemNum",
    "apiOptions",
    "widgetIsOpen",
    "questionCompleted",
    "findWidgets",
    // added by src/editor.jsx, for widgets removing themselves
    // this is soooo not the right place for this, but alas.
    "onRemove",
    // also added by src/editor.jsx
    "id",
    // Callbacks and items for interaction handling
    "onBlur",
    "onFocus",
    "trackInteraction",
    "keypadElement",
];

export default denylist;
