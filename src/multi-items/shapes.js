// @flow
import type {ItemTree} from "./item-types.js";
import type {
    Shape, ContentShape, HintShape, ArrayShape, ObjectShape
} from "./shape-types.js";


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


function inferTreeShape(node: ItemTree): Shape {
    if (Array.isArray(node)) {
        // If the array is empty, we guess that it's an item array, not that it
        // matters. If you need to be able to work with empty arrays, like in
        // the Perseus editor, you should get the correct shape explicitly!
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
