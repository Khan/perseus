// @flow
import type {
    Shape, ContentShape, HintShape, ArrayShape, ObjectShape
} from "./shape-types.js";
import type {Tree, ArrayNode, ObjectNode} from "./tree-types.js";

const shapes = require("./shapes.js");


type Path = Array<string | number>;
type Mappers<CI, CO, HI, HO> = {
    content: (content: CI, shape: ContentShape, path: Path) => CO,
    hint: (hint: HI, shape: HintShape, path: Path) => HO,
    array: (array: ArrayNode<CO, HO>, shape: ArrayShape, path: Path) =>
        ArrayNode<CO, HO>,
};


function identity<T>(x: T): T {
    return x;
}


function mapContentNodes<CI, CO, H>(
    tree: Tree<CI, H>,
    shape: Shape,
    mapper: (content: CI, shape: Shape, path: Path) => CO
): Tree<CO, H> {
    return mapTree(tree, shape, {
        content: mapper,
        hint: identity,
        array: identity,
    });
}


function mapHintNodes<C, HI, HO>(
    tree: Tree<C, HI>,
    shape: Shape,
    mapper: (hint: HI, shape: Shape, path: Path) => HO
): Tree<C, HO> {
    return mapTree(tree, shape, {
        content: identity,
        hint: mapper,
        array: identity,
    });
}


function mapArrayNodes<C, H>(
    tree: Tree<C, H>,
    shape: Shape,
    mapper:
        (array: ArrayNode<C, H>, shape: Shape, path: Path) => ArrayNode<C, H>
) {
    // HACK(mdr): Flow has a hard time inferring the type parameterization of
    //     this mapTree call. I don't fully understand why, but passing the
    //     parametrically-typed `mappers` through a one-off function seems to
    //     help Flow understand that this is a Mappers<C, C, H, H>, which seems
    //     to resolve the issue - whereas an assignment to a type-annotated
    //     variable, surprisingly, doesn't have the same effect. Go figure.
    //     https://github.com/facebook/flow/issues/2165#issuecomment-236868389
    const boundMapTree = (
        mappers: Mappers<C, C, H, H>
    ): Tree<C, H> => {
        return mapTree(tree, shape, mappers);
    };

    return boundMapTree({
        content: identity,
        hint: identity,
        array: mapper,
    });
}


function mapTree<CI, CO, HI, HO>(
    tree: Tree<CI, HI>,
    shape: Shape,
    mappers: Mappers<CI, CO, HI, HO>
): Tree<CO, HO> {
    console.trace("let's map tree!");
    return mapTreeRec(tree, shape, [], mappers);
}


function mapTreeRec<CI, CO, HI, HO>(
    tree: Tree<CI, HI>,
    shape: Shape,
    path: Path,
    mappers: Mappers<CI, CO, HI, HO>
): Tree<CO, HO> {
    if (shape.type === "item") {
        const content: CI = (tree: any);
        return mappers.content(content, shape, path);
    } else if (shape.type === "hint") {
        const hint: HI = (tree: any);
        return mappers.hint(hint, shape, path);
    } else if (shape.type === "array") {
        const array: ArrayNode<CI, HI> = (tree: any);

        if (!Array.isArray(array)) {
            throw new Error(
                `Invalid object of type "${typeof array}" found at path ` +
                `${["<root>"].concat(path).join(".")}. Expected array.`);
        }

        // TODO(mdr): Flow fails if I inline the expression shape.elementShape?
        const elementShape = shape.elementShape;
        console.log("start array", path);
        const mappedElements: ArrayNode<CO, HO> =
            array.map((inner, i) =>
                mapTreeRec(inner, elementShape, path.concat(i), mappers));
        console.log("end array", path);
        return mappers.array(mappedElements, shape, path);
    } else if (shape.type === "object") {
        const object: ObjectNode<CI, HI> = (tree: any);

        if (object && typeof object !== "object") {
            throw new Error(
                `Invalid object of type "${typeof object}" found at ` +
                `path ${["<root>"].concat(path).join(".")}. Expected ` +
                `"object" type.`);
        }

        // TODO(mdr): Flow fails if I inline the expression shape.shape?
        const valueShapes = shape.shape;
        if (!valueShapes) {
            throw new Error(
                `Unexpected shape ${JSON.stringify(shape)} at path ` +
                `${["<root>"].concat(path).join(".")}.`);
        }
        const newObject = {};
        console.log("start object", path);
        Object.keys(valueShapes).forEach(key => {
            if (!object[key]) {
                throw new Error(
                    `Key "${key}" is missing from shape at path ` +
                    `${["<root>"].concat(path).join(".")}.`);
            }

            newObject[key] = mapTreeRec(
                object[key], valueShapes[key], path.concat(key), mappers);
        });
        console.log("end object", path);
        return newObject;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}


module.exports = {
    mapContentNodes,
    mapHintNodes,
    mapArrayNodes,
};
