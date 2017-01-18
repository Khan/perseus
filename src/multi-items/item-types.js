// @flow
import type {Tree, ArrayNode, ObjectNode} from "./tree-types.js";

export type ContentNode = {
    __type: "item",  // TODO(mdr): can we just rename this "content" pls?
    content: string,
    images: {[k: string]: any},
    widgets: {[k: string]: any},
};
export type HintNode = {
    __type: "hint",
    content: string,
    images: {[k: string]: any},
    widgets: {[k: string]: any},
    replace: boolean,
};

export type ItemArrayNode = ArrayNode<ContentNode, HintNode>;
export type ItemObjectNode = ObjectNode<ContentNode, HintNode>;
export type ItemTree = Tree<ContentNode, HintNode>;

export type Item = {
    _multi: any,
};
