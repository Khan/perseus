/**
 * Utility functions for constructing and manipulating multi-items.
 *
 * These functions apply *specifically* to Items and ItemTrees - things that
 * actually semantically *are* multi-items. For more general functions for
 * traversing and manipulating *anything* shaped like a multi-item (like a
 * renderer tree or a score tree or, well, a multi-item), see trees.js.
 */

import {Errors, PerseusError} from "@khanacademy/perseus-core";

import shapes from "./shapes";
import {buildMapper} from "./trees";

import type {
    Item,
    ItemTree,
    ContentNode,
    HintNode,
    TagsNode,
    ItemArrayNode,
    ItemObjectNode,
} from "./item-types";
import type {Shape} from "./shape-types";

/**
 * Return a semantically empty ItemTree that conforms to the given shape.
 *
 * - An empty content node has an empty content string and no widgets/images.
 * - An empty hint node has an empty content string and no widgets/images.
 * - An empty array node has no elements.
 * - An empty object node has a semantically empty node for each of its keys.
 *   (That is, we recursively call buildEmptyItemTreeForShape for each key.)
 */
export function buildEmptyItemTreeForShape(shape: Shape): ItemTree {
    if (shape.type === "content") {
        return {
            __type: "content",
            content: "",
            images: {},
            widgets: {},
        };
    }
    if (shape.type === "hint") {
        return {
            __type: "hint",
            replace: false,
            content: "",
            images: {},
            widgets: {},
        };
    }
    if (shape.type === "tags") {
        return [] as TagsNode;
    }
    if (shape.type === "array") {
        return [] as ItemArrayNode;
    }
    if (shape.type === "object") {
        const valueShapes = shape.shape;
        const object: ItemObjectNode = {};
        Object.keys(valueShapes).forEach((key) => {
            object[key] = buildEmptyItemTreeForShape(valueShapes[key]);
        });
        return object;
    }
    throw new PerseusError(
        // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'never'.
        `unexpected shape type ${shape.type}`,
        Errors.InvalidInput,
    );
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
export function buildEmptyItemForShape(shape: Shape): Item {
    return treeToItem(buildEmptyItemTreeForShape(shape));
}

/**
 * Given an Item and its Shape, yield all of its content nodes to the callback.
 */
export function findContentNodesInItem(
    item: Item,
    shape: Shape,
    callback: (c: ContentNode) => any,
) {
    const itemTree = itemToTree(item);
    buildMapper().setContentMapper(callback).mapTree(itemTree, shape);
}

/**
 * Given an Item and its Shape, yield all of its hint nodes to the callback.
 */
export function findHintNodesInItem(
    item: Item,
    shape: Shape,
    callback: (h: HintNode) => any,
) {
    const itemTree = itemToTree(item);
    buildMapper().setHintMapper(callback).mapTree(itemTree, shape);
}

/**
 * Given an ItemTree, return a Shape that it conforms to.
 *
 * The Shape might not be complete or correct Shape that this Item was designed
 * for. If you have access to the intended Shape, use that instead.
 */
export function inferItemShape(item: Item): Shape {
    const itemTree = itemToTree(item);
    return inferItemTreeShape(itemTree);
}

function inferItemTreeShape(node: ItemTree): Shape {
    if (Array.isArray(node)) {
        if (node.length) {
            if (typeof node[0] === "string") {
                // There's no ItemTree that can manifest as a string.
                // So, an array of strings must be a TagsNode, not ArrayNode.
                return shapes.tags;
            }
            // Otherwise, assume that this is a valid ArrayNode, and
            // therefore the shape of the first element applies to all
            // elements in the array.
            return shapes.arrayOf(inferItemTreeShape(node[0]));
        }
        // The array is empty, so we arbitrarily guess that it's a content
        // array. As discussed in the docstring, this might be incorrect,
        // and you shouldn't depend on it.
        return shapes.arrayOf(shapes.content);
    }
    if (
        // TODO(mdr): Remove #LegacyContentNode support.
        typeof node === "object" &&
        (node.__type === "content" || node.__type === "item")
    ) {
        return shapes.content;
    }
    if (typeof node === "object" && node.__type === "hint") {
        return shapes.hint;
    }
    if (typeof node === "object") {
        const valueShapes: Record<string, any> = {};
        Object.keys(node).forEach((key) => {
            valueShapes[key] = inferItemTreeShape(node[key]);
        });
        return shapes.shape(valueShapes);
    }
    throw new PerseusError(
        `unexpected multi-item node ${JSON.stringify(node)}`,
        Errors.InvalidInput,
    );
}

/**
 * Convert the given Item to an ItemTree, by unwrapping the `_multi` key.
 */
export function itemToTree(item: Item): ItemTree {
    return item._multi;
}

/**
 * Convert the given ItemTree to an Item, by wrapping it in the `_multi` key.
 */
export function treeToItem(node: ItemTree): Item {
    return {_multi: node};
}
