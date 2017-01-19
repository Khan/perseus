// @flow
/**
 * Utility functions for manipulating multi-item-shaped trees.
 *
 * Multi-items are trees! But we also often have other trees that are shaped
 * like multi-items - for example, if we map a multi-item tree into a tree of
 * renderer info and state, and then map that again into a tree of just the
 * renderer nodes, like we do in MultiRenderer. See tree-types.js for further
 * discussion.
 *
 * These functions enable us to manipulate generic multi-item-shaped trees,
 * regardless of what type of data they contain at their leaves. You can use
 * the mapper functions to transform a tree into another tree of the same
 * shape, or to discover all the nodes of a particular type.
 *
 * We expose two simple mapper functions (mapContentNodes and mapHintNodes),
 * and also a more complex interface for creating a mapping over all of a
 * tree's node types simultaneously:
 *
 * `buildMapper()` returns a TreeMapper object that allows you to build your
 * mapper object one node type at a time. Then, you can execute your mapping by
 * calling the `mapTree` method.
 *
 * For example:
 *     const renderers = buildMapper()
 *         .setContentMapper(this.renderContentNode)
 *         .setHintMapper(this.renderHintNode)
 *         .setArrayMapper(this.hideSkippedQuestions)
 *         .mapTree(tree, shape);
 *
 * This will copy the given tree, apply the given transformations to the
 * content, hint, and array nodes respectively, and return the resulting tree.
 *
 * For node types whose mappers aren't specified, we default to the identity
 * function. (This builder interface enables us to implement that default
 * behavior in a provably type-safe way, while not requiring the call site to
 * be aware of all the node types. Hooray!)
 *
 * The call to `setArrayMapper` must come last, because the array mapper's
 * argument types depend on the other mappers' types. See ArrayMapper for more
 * details.
 *
 * WARNING: These functions trust that the provided tree conforms to the
 * provided shape. If not, behavior is undefined and may not adhere to the type
 * signatures specified here.
 */
import type {
    Shape, ContentShape, HintShape, ArrayShape,
} from "./shape-types.js";
import type {Tree, ArrayNode, ObjectNode} from "./tree-types.js";


/**
 * The sequence of edges that lead to a particular node in a Tree.
 * Elements can be `string` to correspond to an ObjectNode key, or `number` to
 * correspond to an ArrayNode index.
 */
export type Path = Array<string | number>;


/**
 * These are function interfaces for mapping over various types of tree nodes.
 *
 * ArrayMapper is a bit more complicated than the leaf node mappers. It's
 * executed in the context of a `mapTree` call, after we've finished mapping
 * its child nodes, so the function has access to both the resulting array
 * (with mapped elements) and the original array (with the original untouched
 * elements).
 *
 * The ArrayMapper then has the opportunity to apply a final transformation to
 * the resulting array, like filtering certain elements or (in the hacky
 * MultiRenderer case) attaching a `renderHints` method to arrays of hint
 * renderers :)
 *
 * This is why `TreeMapper#setArrayMapper` must be called last: ArrayMapper's
 * types depend on the ContentMapper and HintMapper's types. And, since you can
 * only specify one mapper at a time in this builder interface (which is
 * necessary to provide default mappers in a type-safe way), you need your
 * dependencies to already be in place by the time you call `setArrayMapper`.
 * Otherwise, we'd have to set the ArrayMapper and *hope* that you *eventually*
 * provide a compatible ContentMapper and HintMapper, which is difficult to
 * prove at compile time.
 *
 * There's no ObjectMapper here, but not for any particular reason. We just
 * don't have a use case for it yet, so we haven't built it yet.
 */
export type ContentMapper<CI, CO> =
    (content: CI, shape: ContentShape, path: Path) => CO;
export type HintMapper<HI, HO> =
    (hint: HI, shape: HintShape, path: Path) => HO;
export type ArrayMapper<CI, CO, HI, HO> =
    (
        newArray: ArrayNode<CO, HO>,
        oldArray: ArrayNode<CI, HI>,
        shape: ArrayShape,
        path: Path
    ) => ArrayNode<CO, HO>;

/**
 * A TreeMapper is a collection of node mappers, which, together, compose the
 * behavior for mapping over an entire tree.
 *
 * This object serves as an interface for the two TreeMapper classes, including
 * both the internal mapper properties that we care about, and the `mapTree`
 * function that the call site will use.
 */
export type TreeMapper<CI, CO, HI, HO> = {
    content: ContentMapper<CI, CO>,
    hint: HintMapper<HI, HO>,
    array: ArrayMapper<CI, CO, HI, HO>,

    // NOTE(mdr): Class methods are covariant, so we use `+` to denote
    //     covariance in this interface's `mapTree` property, too.
    +mapTree: (tree: Tree<CI, HI>, shape: Shape) => Tree<CO, HO>,
};


/**
 * This is a TreeMapper that only has mappers specified for its leaf nodes; its
 * array mapper is the identity function.
 *
 * This is the TreeMapper initially returned by `buildMapper`. It allows you to
 * change the types of your ContentMapper and HintMapper, which is safe because
 * none of the other mappers that depend on those types (aka ArrayMapper) have
 * been specified yet. (Or, more specifically, the ArrayMapper is currently
 * `identity`, which can trivially vary with the ContentMapper and HintMapper's
 * types.)
 *
 * Once you call `setArrayMapper`, however, we move to the other class:
 * TreeMapperForLeavesAndCollections.
 */
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


/**
 * This is a TreeMapper that has an ArrayMapper specified, so the types of its
 * ContentMapper and HintMapper are now locked in. You can still change any of
 * the mappers, so long as you don't change their types anymore.
 *
 * (Okay, yeah, fine, I lied. The `setArrayMapper` call doesn't *strictly* have
 * to come last, *if* your ContentMapper and HintMapper return the same type of
 * node data as they consume. But that's not really worth explaining in the
 * module docstring, ya know? :P)
 *
 * TODO(mdr): Would it be better to just remove those methods instead?
 */
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


/**
 * Return a new TreeMapper that will perform a no-op transformation on an input
 * tree. To make it useful, chain any combination of `setContentMapper`,
 * `setHintMapper`, and `setArrayMapper` to specify transformations for the
 * individual node types.
 */
function buildMapper<C, C, H, H>(): TreeMapperJustForLeaves<C, C, H, H> {
    return new TreeMapperJustForLeaves(identity, identity);
}


/**
 * Copy the given tree, apply the given transformation to its hint nodes, and
 * return the resulting tree.
 */
function mapContentNodes<CI, CO, H>(
    tree: Tree<CI, H>,
    shape: Shape,
    mapper: (content: CI, shape: Shape, path: Path) => CO
): Tree<CO, H> {
    return buildMapper()
        .setContentMapper(mapper)
        .mapTree(tree, shape);
}


/**
 * Copy the given tree, apply the given transformation to its hint nodes, and
 * return the resulting tree.
 */
function mapHintNodes<C, HI, HO>(
    tree: Tree<C, HI>,
    shape: Shape,
    mapper: (hint: HI, shape: Shape, path: Path) => HO
): Tree<C, HO> {
    return buildMapper()
        .setHintMapper(mapper)
        .mapTree(tree, shape);
}


/**
 * Copy the given tree, apply the corresponding transformation specified in the
 * TreeMapper to each node, and return the resulting tree.
 */
function mapTree<CI, CO, HI, HO>(
    tree: Tree<CI, HI>,
    shape: Shape,
    path: Path,
    mappers: TreeMapper<CI, CO, HI, HO>
): Tree<CO, HO> {
    // We trust the shape of the multi-item to match the shape provided at
    // runtime. Therefore, in each shape branch, we cast the node to `any` and
    // reinterpret it as the expected node type.
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
