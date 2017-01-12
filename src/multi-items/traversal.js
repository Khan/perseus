// @flow
import type {
    MultiItem, MultiItemNode, ItemNode, HintNode, ArrayNode, ObjectNode
} from "./item-types.js";
import type {
    Shape, ItemShape, HintShape, ArrayShape, ObjectShape
} from "./shapes.js";

const {buildShapeVisitor, buildMultiItemShapeVisitor} =
    require("./visitors.js");
const shapes = require("./shapes.js");
const {unwrapItem} = require("./item-builders.js");


type Path = Array<string | number>;


type FindLeafCallback =
    (node: ItemNode | HintNode, type: "item" | "hint") => any;


/**
 * This function traverses a multirenderer item-data and calls the callback on
 * each of the leaf nodes. This function does not require the shape of the item
 * to be passed in.
 *
 * Example:
 *
 *   data = {
 *       _multi: {
 *           question: { __type: "item", content: "question" },
 *           hints: [
 *               { __type: "hint", content: "hint 1" },
 *               { __type: "hint", content: "hint 2" }
 *           ]
 *       }
 *   }
 *   findLeafNodesInItem(data, (d, t) => console.log(d, t));
 *   // logs in some order:
 *   // { __type: "item", content: "question" } "item"
 *   // { __type: "hint", content: "hint 1" } "hint"
 *   // { __type: "hint", content: "hint 2" } "hint"
 *
 * @param {} data: A multirenderer item-data.
 * @param {FindLeafCallback} callback: The callback called on each leaf node.
 */
function findLeafNodesInItem(item: MultiItem, callback: FindLeafCallback) {
    // TODO(mdr): I don't like that we infer shape here...
    const node = unwrapItem(item);
    const shape = shapes.inferNodeShape(node);

    const findLeafNodesInItemVisitor = buildMultiItemShapeVisitor({
        item(item: ItemNode, shape: ItemShape) {
            callback(item, "item");
        },
        hint(hint: HintNode, shape: HintShape) {
            callback(hint, "hint");
        },
        array(array: ArrayNode, shape: ArrayShape) {
            array.forEach(child =>
                findLeafNodesInItemVisitor(child, shape.elementShape));
        },
        object(object: ObjectNode, shape: ObjectShape) {
            Object.keys(object).forEach(key => {
                findLeafNodesInItemVisitor(object[key], shape.shape[key]);
            });
        },
    });

    findLeafNodesInItemVisitor(node, shape, callback);
}


function identity<T>(x: T): T {
    return x;
}


type LeafMapper<I, O> = 
    (
        node: I,
        shape: ItemShape | HintShape,
        path: Path
    ) => O;
type MappedLeafNode<L> = L;
type MappedArrayNode<L> = Array<MappedMultiItemNode<L>>;
type MappedObjectNode<L> = {[k: string]: MappedMultiItemNode<L>};
type MappedMultiItemNode<L> =
    MappedLeafNode<L> | MappedArrayNode<L> | MappedObjectNode<L>;


/**
 * Traverse a multirenderer item shape and piece of data at the same time, and
 * call the callback with the data at each of the leaf nodes of the shape (an
 * item) is reached. Returns data of the same structure as the shape, with the
 * leaf node data being whatever is returned from the callback.
 *
 * Example:
 *
 *   data = {
 *       x: 1,
 *       y: [2, 3, 4],
 *       z: {v: 5, w: 6},
 *   }
 *   shape = shapes.shape({
 *       x: shapes.item,
 *       y: shapes.arrayOf(shapes.item),
 *       z: shapes.shape({
 *           v: shapes.item,
 *           w: shapes.item,
 *       }),
 *   })
 *
 *   mapLeafNodes(shape, data, x => x + 1)
 *
 * This would call the callback with the values 1, 2, 3, 4, 5, and 6, and would
 * return an object of the shape
 *
 *   {
 *     x: 2,
 *     y: [3, 4, 5],
 *     z: {v: 6, w: 7},
 *   }
 *
 * @function mapLeafNodes
 * @param {} shape: A shape returned from one of the shapes constructors.
 * @param {} data: Some data in the shape that is described by the shape
 *     argument.
 * @param {LeafMapper} leafMapper: A function called with the data
 *     at each of the leaf nodes, and the path of the current leaf. The path is
 *     an array of keys inside the object.
 * @returns {} An object in the shape described by the shape argument, with the
 *     result of the callback() function at the leaves.
 */
function mapLeafNodes<L1, L2>(
    shape: Shape, data: MappedMultiItemNode<L1>, leafMapper: LeafMapper<L1, L2>
): MappedMultiItemNode<L2> {
    return mapLeafNodesRec(shape, data, [], leafMapper);
}


function mapLeafNodesRec<L1, L2>(
    shape: Shape, data: MappedMultiItemNode<L1>, path: Path,
    leafMapper: LeafMapper<L1, L2>
): MappedMultiItemNode<L2> {
    const mapLeafNodesVisitor = buildShapeVisitor({
        item(item: L1, itemShape: ItemShape): L2 {
            if (item && typeof item !== "object") {
                throw new Error(
                    `Invalid object of type "${typeof item}" found at path ` +
                    `${["<root>"].concat(path).join(".")}. ` +
                    `Expected item.`);
            }
            return leafMapper(item, itemShape, path);
        },
        hint(hint: L1, hintShape: HintShape): L2 {
            if (hint && typeof hint !== "object") {
                throw new Error(
                    `Invalid object of type "${typeof hint}" found at path ` +
                    `${["<root>"].concat(path).join(".")}. ` +
                    `Expected hint.`);
            }
            return leafMapper(hint, hintShape, path);
        },
        array(
            array: MappedArrayNode<L1>, arrayShape: ArrayShape
        ): MappedArrayNode<L2> {
            if (!Array.isArray(array)) {
                throw new Error(
                    `Invalid object of type "${typeof array}" found at path ` +
                    `${["<root>"].concat(path).join(".")}. Expected array.`);
            }

            return array.map((inner, i) => mapLeafNodesRec(
                arrayShape.elementShape, inner, path.concat(i), leafMapper));
        },
        object(
            object: MappedObjectNode<L1>, objectShape: ObjectShape
        ): MappedObjectNode<L2> {
            if (object && typeof object !== "object") {
                throw new Error(
                    `Invalid object of type "${typeof object}" found at ` +
                    `path ${["<root>"].concat(path).join(".")}. Expected ` +
                    `"object" type.`);
            }

            const valueShapes = objectShape.shape;
            if (!valueShapes) {
                throw new Error(
                    `Unexpected shape ${JSON.stringify(shape)} at path ` +
                    `${["<root>"].concat(path).join(".")}.`);
            }
            const newObject = {};
            Object.keys(valueShapes).forEach(key => {
                if (!object[key]) {
                    throw new Error(
                        `Key "${key}" is missing from shape at path ` +
                        `${["<root>"].concat(path).join(".")}.`);
                }

                newObject[key] = mapLeafNodesRec(
                    valueShapes[key], object[key], path.concat(key),
                    leafMapper);
            });
            return newObject;
        }
    });

    return mapLeafNodesVisitor(data, shape);
}


module.exports = {
    findLeafNodesInItem,
    mapLeafNodes,
};
