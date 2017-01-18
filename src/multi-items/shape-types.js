// @flow
export type ContentShape = {
    type: "item",  // TODO(mdr): can we just rename this "content" pls?
};
export type HintShape = {
    type: "hint",
};
export type ArrayShape = {
    type: "array",
    elementShape: Shape,
};
export type ObjectShape = {
    type: "object",
    shape: {[k: string]: Shape},
};
export type Shape = ContentShape | HintShape | ArrayShape | ObjectShape;
