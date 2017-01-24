// @flow
/**
 * Type definitions for multi-item shapes.
 *
 * A shape is an object that serves as a runtime type declaration: it specifies
 * a tree structure for a particular class of multi-item.
 *
 * We use shapes instead static compile-time typing because the CMS needs to
 * understand the shape of our content library's multi-items at runtime, and
 * it's not always possible to infer the full shape from an example multi-item.
 *
 * Shapes also enable us to traverse a multi-item-shaped tree with confidence,
 * even when we can't infer the shape from the tree alone.
 *
 * We *could* go all-in on a more general library to make certain Flow types
 * runtime-inspectable, in order to DRY some things up, but that's probably a
 * big ol' infrastructural magic mess, and the narrower scope of Shapes makes
 * it easier to be confident that we've covered all cases rather than having to
 * deal with all possible Javascript types.
 */
export type ContentShape = {
    type: "item",  // TODO(mdr): can we just rename this "content" pls?
};
export type HintShape = {
    type: "hint",
};
export type TagsShape = {
    type: "tags",
};
export type ArrayShape = {
    type: "array",
    /**
     * Each element of an ArrayNode has the same shape, which is specified by
     * the `elementShape` property.
     */
    elementShape: Shape,
};
export type ObjectShape = {
    type: "object",
    /**
     * Each property of an ObjectNode has its own shape, which is specified
     * under the corresponding key in the `shape` property.
     */
    shape: {[k: string]: Shape},
};
export type Shape =
    ContentShape | HintShape | TagsShape | ArrayShape | ObjectShape;
