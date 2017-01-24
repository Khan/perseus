// @flow
/**
 * Utility functions for constructing and inferring multi-item shapes.
 *
 * A shape is an object that serves as a runtime type declaration: it specifies
 * a tree structure for a particular class of multi-item. See shape-types.js
 * for further discussion.
 *
 * This module allows you to construct arbitrary Shape trees, by combining
 * leaf node shapes like `content` and `hint` into composite shapes like
 * `arrayOf(shape({foo: content, bar: hint}))`.
 */
import type {
    Shape, ContentShape, HintShape, TagsShape, ArrayShape, ObjectShape,
} from "./shape-types.js";

/**
 * These tools allow you to construct arbirtary shapes, by combining simple
 * leaf shapes like `content` and `hint` into composite shapes like
 * `arrayOf(shape({question: content, hints: arrayOf(hint)}))`.
 */
const contentShape: ContentShape = {
    type: "content",
};
const hintShape: HintShape = {
    type: "hint",
};
const tagsShape: TagsShape = {
    type: "tags",
};
const buildArrayShape = (elementShape: Shape): ArrayShape => ({
    type: "array",
    elementShape,
});
const buildObjectShape = (shape: {[k: string]: Shape}): ObjectShape => ({
    type: "object",
    shape,
});
const hintsShape = buildArrayShape(hintShape);


module.exports = {
    content: contentShape,
    hint: hintShape,
    hints: hintsShape,
    tags: tagsShape,
    arrayOf: buildArrayShape,
    shape: buildObjectShape,
};
