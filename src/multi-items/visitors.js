// @flow
import type {
    MultiItem, MultiItemNode, ItemNode, HintNode, ArrayNode, ObjectNode
} from "./item-types.js";
import type {
    Shape, ItemShape, HintShape, ArrayShape, ObjectShape
} from "./shapes.js";

const shapes = require("./shapes.js");
const {unwrapItem} = require("./item-builders.js");


export type ShapeVisitorSpec<I, H, A, O, R> = {
    item: (node: I, shape: ItemShape) => R,
    hint: (node: H, shape: HintShape) => R,
    array: (node: A, shape: ArrayShape) => R,
    object: (node: O, shape: ObjectShape) => R,
};
export type ShapeVisitor<I, H, A, O, R> =
    (node: I | H | A | O, shape: Shape) => R;


/**
 * Builds a function that takes a shape and a MultiItemNode as input, casts the
 * node to the type specified in the shape, and delegates the call to the
 * corresponding function in the provided ShapeVisitorSpec.
 *
 * This function trusts that the given node is of the given shape.
 */
function buildGenericShapeVisitor<I, H, A, O, R>(
    spec: ShapeVisitorSpec<I, H, A, O, R>
): ShapeVisitor<I, H, A, O, R> {
    return (node: I | H | A | O, shape: Shape): R => {
        if (shape.type === "item") {
            return spec.item(((node: any): I), shape);
        } else if (shape.type === "hint") {
            return spec.hint(((node: any): H), shape);
        } else if (shape.type === "array") {
            return spec.array(((node: any): A), shape);
        } else if (shape.type === "object") {
            return spec.object(((node: any): O), shape);
        } else {
            throw new Error(`unexpected shape type ${shape.type}`);
        }
    };
}


function buildMultiItemShapeVisitor<R>(
    spec: ShapeVisitorSpec<ItemNode, HintNode, ArrayNode, ObjectNode, R>
): ShapeVisitor<ItemNode, HintNode, ArrayNode, ObjectNode, R> {
    const visitor = buildGenericShapeVisitor(spec);

    return (node: MultiItemNode, shape: Shape): R => {
        const inferredType = shapes.inferNodeShape(node).type;
        if (inferredType !== shape.type) {
            throw new Error(
                `expected node of type ${shape.type} ` +
                `but found type ${inferredType}`);
        }

        return visitor(node, shape);
    };
}


function buildShapeVisitor<I, H, A, O, R>(
    spec: ShapeVisitorSpec<I, H, A, O, R>
): ShapeVisitor<I, H, A, O, R> {
    const genericVisitor = buildGenericShapeVisitor(spec);
    const multiItemVisitor = buildMultiItemShapeVisitor((spec: any));

    return (node: I | H | A | O, shape: Shape): R => {
        if ((node: any)._multi) {
            return multiItemVisitor(unwrapItem((node: any)), shape);
        } else {
            return genericVisitor(node, shape);
        }
    };
}


module.exports = {
    buildMultiItemShapeVisitor,
    buildGenericShapeVisitor,
    buildShapeVisitor,
};
