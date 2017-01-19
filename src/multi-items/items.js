// @flow
/**
 * Utility functions for constructing and manipulating multi-items.
 *
 * These functions apply *specifically* to Items and ItemTrees - things that
 * actually semantically *are* multi-items. For more general functions for
 * traversing and manipulating *anything* shaped like a multi-item (like a
 * renderer tree or a score tree or, well, a multi-item), see trees.js.
 */
import type {Item, ItemTree, ItemObjectNode} from "./item-types.js";
import type {Shape} from "./shape-types.js";


/**
 * Return a semantically empty ItemTree that conforms to the given shape.
 *
 * - An empty content node has an empty content string and no widgets/images.
 * - An empty hint node has an empty content string and no widgets/images.
 * - An empty array node has no elements.
 * - An empty object node has a semantically empty node for each of its keys.
 *   (That is, we recursively call buildEmptyItemTreeForShape for each key.)
 */
function buildEmptyItemTreeForShape(shape: Shape): ItemTree {
    if (shape.type === "item") {
        return {
            "__type": "item",
            "content": "",
            "images": {},
            "widgets": {},
        };
    } else if (shape.type === "hint") {
        return {
            "__type": "hint",
            "replace": false,
            "content": "",
            "images": {},
            "widgets": {},
        };
    } else if (shape.type === "array") {
        return [];
    } else if (shape.type === "object") {
        const valueShapes = shape.shape;
        const object: ItemObjectNode = {};
        Object.keys(valueShapes).forEach(key => {
            object[key] = buildEmptyItemTreeForShape(valueShapes[key]);
        });
        return object;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}


/**
 * Return a semantically empty Item that conforms to the given shape.
 *
 * - An empty content node has an empty content string and no widgets/images.
 * - An empty hint node has an empty content string and no widgets/images.
 * - An empty array node has no elements.
 * - An empty object node has a semantically empty node for each of its keys.
 *   (That is, we recursively call buildEmptyItemTreeForShape for each key.)
 */
function buildEmptyItemForShape(shape: Shape): Item {
    return treeToItem(buildEmptyItemTreeForShape(shape));
}


/**
 * Convert the given ItemTree to an Item, by wrapping it in the `_multi` key.
 */
function itemToTree(item: Item): ItemTree {
    return item._multi;
}


/**
 * Convert the given Item to an ItemTree, by unwrapping the `_multi` key.
 */
function treeToItem(node: ItemTree): Item {
    return {_multi: node};
}


module.exports = {
    buildEmptyItemTreeForShape,
    buildEmptyItemForShape,
    itemToTree,
    treeToItem,
};
