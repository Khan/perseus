// @flow
import type {
    MultiItem, MultiItemNode, ItemNode, HintNode, ArrayNode, ObjectNode
} from "./item-types.js";


export type ItemShape = {
    type: "item",
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
export type Shape = ItemShape | HintShape | ArrayShape | ObjectShape;


const itemShape: ItemShape = {
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


function inferNodeShape(node: MultiItemNode): Shape {
    if (Array.isArray(node)) {
        // If the array is empty, we guess that it's an item array, not that it
        // matters. If you need to be able to work with empty arrays, like in
        // the Perseus editor, you should get the correct shape explicitly!
        return buildArrayShape(
            node.length ? inferNodeShape(node[0]) : itemShape
        );
    } else if (typeof node === "object" && node.__type === "item") {
        return itemShape;
    } else if (typeof node === "object" && node.__type === "hint") {
        return hintShape;
    } else if (typeof node === "object") {
        const valueShapes = {};
        Object.keys(node).forEach(key => {
            // Flow, I promise you: `node` is not an array right now.
            valueShapes[key] = inferNodeShape((node: any)[key]);
        });
        return buildObjectShape(valueShapes);
    } else {
        throw new Error(`unexpected multi-item node ${JSON.stringify(node)}`);
    }
}


module.exports = {
    item: itemShape,
    hint: hintShape,
    hints: hintsShape,
    arrayOf: buildArrayShape,
    shape: buildObjectShape,
    inferNodeShape,
};
