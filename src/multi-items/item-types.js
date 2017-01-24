// @flow
/**
 * Type definitions for multi-item types, including:
 *
 * - Item: A multi-item tree wrapped in a `_multi` key, to help us recognize it
 *         as a multi-item in other contexts and avoid misinterpreting its
 *         other properties.
 * - ItemTree: A multi-item without the `_multi` key. Conforms to the Tree
 *             interface, so it's compatible with our tree traversal functions.
 * - And the various types of nodes that compose a tree.
 */
import type {Tree, ArrayNode, ObjectNode} from "./tree-types.js";

export type ContentNode = {
    __type: "content",
    // Perseus has default values for these fields, so they're all optional.
    content?: ?string,
    images?: ?{[k: string]: any},
    widgets?: ?{[k: string]: any},
};
export type HintNode = {
    __type: "hint",
    // Perseus has default values for these fields, so they're all optional.
    content?: ?string,
    images?: ?{[k: string]: any},
    widgets?: ?{[k: string]: any},
    replace?: ?boolean,
};
export type TagsNode = Array<string>;

export type ItemArrayNode = ArrayNode<ContentNode, HintNode, TagsNode>;
export type ItemObjectNode = ObjectNode<ContentNode, HintNode, TagsNode>;
export type ItemTree = Tree<ContentNode, HintNode, TagsNode>;

export type Item = {
    _multi: any,
};
