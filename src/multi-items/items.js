// @flow
import type {Item, ItemTree, ItemObjectNode} from "./item-types.js";
import type {Shape} from "./shape-types.js";


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


function buildEmptyItemForShape(shape: Shape): Item {
    return treeToItem(buildEmptyItemTreeForShape(shape));
}


function itemToTree(item: Item): ItemTree {
    return item._multi;
}


function treeToItem(node: ItemTree): Item {
    return {_multi: node};
}


module.exports = {
    buildEmptyItemTreeForShape,
    buildEmptyItemForShape,
    itemToTree,
    treeToItem,
};
