// @flow
/**
 * These are things that widgets should exclude when serializing themselves.
 *
 * The use of this list needs to die. Basically, there are codepaths that
 * blindly serialize the "props" of a widget so that it can pass around its
 * info. Unfortunately, props aren't guaranteed to be serializable, and
 * automatically serializing schemaless list of attributes causes issues (e.g.
 * circular JSON structures sometimes).
 *
 * This blacklists things that we know don't need to be serialized.
 *
 * TODO(TB): Go through and update usage of BLACKLIST to DENYLIST: https://khanacademy.atlassian.net/browse/LP-13149?atlOrigin=eyJpIjoiNTI0Y2UwNzQ0MzA4NDYzOGI1YWRmNjEwY2E5YzZlZWUiLCJwIjoiaiJ9
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

export const removeDenylistProps = (props: Object): Object => {
    const newProps = {...props};
    for (const prop of denylist) {
        if (prop in newProps) {
            delete newProps[prop];
        }
    }
    return newProps;
};

export default denylist;
