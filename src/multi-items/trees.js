// @flow
import type {
    Shape, ContentShape, HintShape, ArrayShape, ObjectShape
} from "./shape-types.js";
import type {Tree, ArrayNode, ObjectNode} from "./tree-types.js";

const shapes = require("./shapes.js");


type Path = Array<string | number>;


type ContentMapper<CI, CO> =
    (content: CI, shape: ContentShape, path: Path) => CO;
type HintMapper<HI, HO> =
    (hint: HI, shape: HintShape, path: Path) => HO;
type ArrayMapper<CI, CO, HI, HO> =
    (
        newArray: ArrayNode<CO, HO>,
        oldArray: ArrayNode<CI, HI>,
        shape: ArrayShape,
        path: Path
    ) => ArrayNode<CO, HO>;
type TreeMapper<CI, CO, HI, HO> = {
    content: ContentMapper<CI, CO>,
    hint: HintMapper<HI, HO>,
    array: ArrayMapper<CI, CO, HI, HO>,
};


class TreeMapperJustForLeaves<CI, CO, HI, HO> {
    content: ContentMapper<CI, CO>
    hint: HintMapper<HI, HO>
    array: ArrayMapper<CI, CO, HI, HO>

    constructor(
        content: ContentMapper<CI, CO>,
        hint: HintMapper<HI, HO>,
    ) {
        this.content = content;
        this.hint = hint;
        this.array = identity;
    }

    setContentMapper<CI2, CO2>(
        newContentMapper: ContentMapper<CI2, CO2>
    ): TreeMapperJustForLeaves<CI2, CO2, HI, HO> {
        return new TreeMapperJustForLeaves(newContentMapper, this.hint);
    }

    setHintMapper<HI2, HO2>(
        newHintMapper: HintMapper<HI2, HO2>
    ): TreeMapperJustForLeaves<CI, CO, HI2, HO2> {
        return new TreeMapperJustForLeaves(this.content, newHintMapper);
    }

    setArrayMapper(
        newArrayMapper: ArrayMapper<CI, CO, HI, HO>
    ): TreeMapperForLeavesAndCollections<CI, CO, HI, HO> {
        return new TreeMapperForLeavesAndCollections(
            this.content, this.hint, newArrayMapper);
    }

    mapTree(tree: Tree<CI, HI>, shape: Shape): Tree<CO, HO> {
        return mapTree(tree, shape, [], this);
    }
}


// Once you add an ArrayMapper, we don't let you change the leaf mapper types
// anymore, because the ArrayMapper depends on the leaf mapper types.
// If you want to start fresh, you're gonna have to *really* start fresh.
class TreeMapperForLeavesAndCollections<CI, CO, HI, HO> {
    content: ContentMapper<CI, CO>
    hint: HintMapper<HI, HO>
    array: ArrayMapper<CI, CO, HI, HO>

    constructor(
        content: ContentMapper<CI, CO>,
        hint: HintMapper<HI, HO>,
        array: ArrayMapper<CI, CO, HI, HO>
    ) {
        this.content = content;
        this.hint = hint;
        this.array = array;
    }

    setContentMapper(
        newContentMapper: ContentMapper<CI, CO>
    ): TreeMapperForLeavesAndCollections<CI, CO, HI, HO> {
        return new TreeMapperForLeavesAndCollections(
            newContentMapper, this.hint, this.array);
    }

    setHintMapper(
        newHintMapper: HintMapper<HI, HO>
    ): TreeMapperForLeavesAndCollections<CI, CO, HI, HO> {
        return new TreeMapperForLeavesAndCollections(
            this.content, newHintMapper, this.array);
    }

    setArrayMapper(
        newArrayMapper: ArrayMapper<CI, CO, HI, HO>
    ): TreeMapperForLeavesAndCollections<CI, CO, HI, HO> {
        return new TreeMapperForLeavesAndCollections(
            this.content, this.hint, newArrayMapper);
    }

    mapTree(tree: Tree<CI, HI>, shape: Shape): Tree<CO, HO> {
        return mapTree(tree, shape, [], this);
    }
}


function identity<T>(x: T): T {
    return x;
}


function buildMapper<C, C, H, H>(): TreeMapperJustForLeaves<C, C, H, H> {
    return new TreeMapperJustForLeaves(identity, identity);
}


function mapContentNodes<CI, CO, H>(
    tree: Tree<CI, H>,
    shape: Shape,
    mapper: (content: CI, shape: Shape, path: Path) => CO
): Tree<CO, H> {
    return buildMapper()
        .setContentMapper(mapper)
        .mapTree(tree, shape);
}


function mapHintNodes<C, HI, HO>(
    tree: Tree<C, HI>,
    shape: Shape,
    mapper: (hint: HI, shape: Shape, path: Path) => HO
): Tree<C, HO> {
    return buildMapper()
        .setHintMapper(mapper)
        .mapTree(tree, shape);
}


function mapTree<CI, CO, HI, HO>(
    tree: Tree<CI, HI>,
    shape: Shape,
    path: Path,
    mappers: TreeMapper<CI, CO, HI, HO>
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
        const mappedElements: ArrayNode<CO, HO> =
            array.map((inner, i) =>
                mapTree(inner, elementShape, path.concat(i), mappers));
        return mappers.array(mappedElements, array, shape, path);
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
        Object.keys(valueShapes).forEach(key => {
            if (!object[key]) {
                throw new Error(
                    `Key "${key}" is missing from shape at path ` +
                    `${["<root>"].concat(path).join(".")}.`);
            }

            newObject[key] = mapTree(
                object[key], valueShapes[key], path.concat(key), mappers);
        });
        return newObject;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}


module.exports = {
    buildMapper,
    mapContentNodes,
    mapHintNodes,
};
