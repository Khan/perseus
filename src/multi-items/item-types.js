// @flow
export type ItemNode = {
    __type: "item",
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
export type ArrayNode = Array<MultiItemNode>;
export type ObjectNode = {
    [k: string]: MultiItemNode,
};

export type MultiItemNode = ItemNode | HintNode | ArrayNode | ObjectNode;

export type MultiItem = {
    _multi: any,
};
