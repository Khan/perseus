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
import type {ItemTree} from "./item-types.js";
import type {
    Shape, ContentShape, HintShape, ArrayShape, ObjectShape,
} from "./shape-types.js";


/**
 * These tools allow you to construct arbirtary shapes, by combining simple
 * leaf shapes like `content` and `hint` into composite shapes like
 * `arrayOf(shape({question: content, hints: arrayOf(hint)}))`.
 */
const contentShape: ContentShape = {
    type: "item",
};
const hintShape: HintShape = {
    type: "hint",
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


/**
 * Given an ItemTree, return a Shape that it conforms to.
 *
 * This function will pretty reliably identify the content, hint, array, and
 * object nodes that are present in the item, so long as there are no
 * meaningful keys like `__type` in unexpected places.
 *
 * So, if you want to perform a VERY SIMPLE operation on ONLY THIS ITEM (like
 * finding its content nodes), but it's difficult to obtain the original shape
 * object in this context, then this method might be an appropriate hack.
 *
 * HOWEVER! This function MUST NOT be expected to produce the original shape
 * that this item was designed against. The resulting shape might be INCOMPLETE
 * or even INCORRECT, primarily due to the possibility of empty arrays.
 *
 * TL;DR: Do not use this function, unless it's a very well-contained hack to
 * avoid significant data plumbing.
 */
function inferTreeShape(node: ItemTree): Shape {
    if (Array.isArray(node)) {
        // If the array is empty, we guess that it's a content array. Could be
        // wrong, but, if we're only going to use this inferred shape for
        // traversing this particular item, then it doesn't matter, anyway :P
        // But, if you need to be able to work with empty arrays, like in the
        // Perseus editor, you should get the correct shape explicitly!
        return buildArrayShape(
            node.length ? inferTreeShape(node[0]) : contentShape
        );
    } else if (typeof node === "object" && node.__type === "item") {
        return contentShape;
    } else if (typeof node === "object" && node.__type === "hint") {
        return hintShape;
    } else if (typeof node === "object") {
        const valueShapes = {};
        Object.keys(node).forEach(key => {
            // Flow, I promise you: `node` is not an array right now.
            valueShapes[key] = inferTreeShape((node: any)[key]);
        });
        return buildObjectShape(valueShapes);
    } else {
        throw new Error(`unexpected multi-item node ${JSON.stringify(node)}`);
    }
}


module.exports = {
    content: contentShape,
    hint: hintShape,
    hints: hintsShape,
    arrayOf: buildArrayShape,
    shape: buildObjectShape,
    inferTreeShape,
};
