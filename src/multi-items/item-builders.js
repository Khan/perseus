// @flow
import type {MultiItem, MultiItemNode, ObjectNode} from "./item-types.js";
import type {Shape} from "./shapes.js";


function buildEmptyNodeForShape(shape: Shape): MultiItemNode {
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
        const object: ObjectNode = {};
        Object.keys(valueShapes).forEach(key => {
            object[key] = buildEmptyNodeForShape(valueShapes[key]);
        });
        return object;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}


function buildEmptyItemForShape(shape: Shape): MultiItem {
    return wrapItem(buildEmptyNodeForShape(shape));
}


function unwrapItem(item: MultiItem): MultiItemNode {
    return item._multi;
}


function wrapItem(node: MultiItemNode): MultiItem {
    return {_multi: node};
}


module.exports = {
    buildEmptyNodeForShape,
    buildEmptyItemForShape,
    unwrapItem,
    wrapItem,
};
