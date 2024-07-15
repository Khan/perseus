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
 *         .setTagsMapper(this.renderTagsNode)
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
 * provided shape. If not, behavior is undefined and may not respect the type
 * signatures specified here.
 */

import {Errors, PerseusError} from "@khanacademy/perseus-core";

import type {
    Shape,
    ContentShape,
    HintShape,
    TagsShape,
    ArrayShape,
} from "./shape-types";
import type {Tree, ArrayNode, ObjectNode} from "./tree-types";

/**
 * The sequence of edges that lead to a particular node in a Tree.
 * Elements can be `string` to correspond to an ObjectNode key, or `number` to
 * correspond to an ArrayNode index.
 */
export type Path = ReadonlyArray<string | number>;

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
export type ContentMapper<CI, CO> = (
    content: CI,
    shape: ContentShape,
    path: Path,
) => CO;
export type HintMapper<HI, HO> = (hint: HI, shape: HintShape, path: Path) => HO;
export type TagsMapper<TI, TO> = (tag: TI, shape: TagsShape, path: Path) => TO;
export type ArrayMapper<CI, CO, HI, HO, TI, TO> = (
    // @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
    mappedArray: ArrayNode<CO, HO, TO>,
    // @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
    originalArray: ArrayNode<CI, HI, TI>,
    shape: ArrayShape,
    path: Path,
    // @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
) => ArrayNode<CO, HO, TO>;

/**
 * A TreeMapper is a collection of node mappers, which, together, compose the
 * behavior for mapping over an entire tree.
 *
 * This serves as the interface for the two TreeMapper classes, including both
 * the internal mapper properties that we care about, and the `mapTree`
 * function that the call site will use.
 */
export interface TreeMapper<CI, CO, HI, HO, TI, TO> {
    content: ContentMapper<CI, CO>;
    hint: HintMapper<HI, HO>;
    tags: TagsMapper<TI, TO>;
    array: ArrayMapper<CI, CO, HI, HO, TI, TO>;
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic. | TS2315 - Type 'Tree' is not generic.
    mapTree(tree: Tree<CI, HI, TI>, shape: Shape): Tree<CO, HO, TO>;
}

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
class TreeMapperJustForLeaves<CI, CO, HI, HO, TI, TO> {
    content: ContentMapper<CI, CO>;
    hint: HintMapper<HI, HO>;
    tags: TagsMapper<TI, TO>;
    array: ArrayMapper<CI, CO, HI, HO, TI, TO>;

    constructor(
        content: ContentMapper<CI, CO>,
        hint: HintMapper<HI, HO>,
        tags: TagsMapper<TI, TO>,
    ) {
        this.content = content;
        this.hint = hint;
        this.tags = tags;
        this.array = identity;
    }

    setContentMapper<CI2, CO2>(
        newContentMapper: ContentMapper<CI2, CO2>,
    ): TreeMapperJustForLeaves<CI2, CO2, HI, HO, TI, TO> {
        return new TreeMapperJustForLeaves(
            newContentMapper,
            this.hint,
            this.tags,
        );
    }

    setHintMapper<HI2, HO2>(
        newHintMapper: HintMapper<HI2, HO2>,
    ): TreeMapperJustForLeaves<CI, CO, HI2, HO2, TI, TO> {
        return new TreeMapperJustForLeaves(
            this.content,
            newHintMapper,
            this.tags,
        );
    }

    setTagsMapper<TI2, TO2>(
        newTagsMapper: TagsMapper<TI2, TO2>,
    ): TreeMapperJustForLeaves<CI, CO, HI, HO, TI2, TO2> {
        return new TreeMapperJustForLeaves(
            this.content,
            this.hint,
            newTagsMapper,
        );
    }

    setArrayMapper(
        newArrayMapper: ArrayMapper<CI, CO, HI, HO, TI, TO>,
    ): TreeMapperForLeavesAndCollections<CI, CO, HI, HO, TI, TO> {
        return new TreeMapperForLeavesAndCollections(
            this.content,
            this.hint,
            this.tags,
            newArrayMapper,
        );
    }

    // @ts-expect-error - TS2315 - Type 'Tree' is not generic. | TS2315 - Type 'Tree' is not generic.
    mapTree(tree: Tree<CI, HI, TI>, shape: Shape): Tree<CO, HO, TO> {
        return mapTree(tree, shape, [], this);
    }
}

/**
 * This is a TreeMapper that already has an ArrayMapper specified, so its
 * ContentMapper and HintMapper are now locked in.
 */
class TreeMapperForLeavesAndCollections<CI, CO, HI, HO, TI, TO> {
    content: ContentMapper<CI, CO>;
    hint: HintMapper<HI, HO>;
    tags: TagsMapper<TI, TO>;
    array: ArrayMapper<CI, CO, HI, HO, TI, TO>;

    constructor(
        content: ContentMapper<CI, CO>,
        hint: HintMapper<HI, HO>,
        tags: TagsMapper<TI, TO>,
        array: ArrayMapper<CI, CO, HI, HO, TI, TO>,
    ) {
        this.content = content;
        this.hint = hint;
        this.tags = tags;
        this.array = array;
    }

    setArrayMapper(
        newArrayMapper: ArrayMapper<CI, CO, HI, HO, TI, TO>,
    ): TreeMapperForLeavesAndCollections<CI, CO, HI, HO, TI, TO> {
        return new TreeMapperForLeavesAndCollections(
            this.content,
            this.hint,
            this.tags,
            newArrayMapper,
        );
    }

    // @ts-expect-error - TS2315 - Type 'Tree' is not generic. | TS2315 - Type 'Tree' is not generic.
    mapTree(tree: Tree<CI, HI, TI>, shape: Shape): Tree<CO, HO, TO> {
        return mapTree(tree, shape, [], this);
    }
}

function identity<T>(x: T): T {
    return x;
}

/**
 * Return a new TreeMapper that will perform a no-op transformation on an input
 * tree. To make it useful, chain any combination of `setContentMapper`,
 * `setHintMapper`, `setTagMapper`, and `setArrayMapper` to specify
 * transformations for the individual node types.
 */
// @ts-expect-error - TS2300 - Duplicate identifier 'C'. | TS2300 - Duplicate identifier 'H'. | TS2300 - Duplicate identifier 'T'.
export function buildMapper<C, C, H, H, T, T>(): TreeMapperJustForLeaves<
    C,
    C,
    H,
    H,
    T,
    T
> {
    return new TreeMapperJustForLeaves(identity, identity, identity);
}

/**
 * Copy the given tree, apply the corresponding transformation specified in the
 * TreeMapper to each node, and return the resulting tree.
 */
function mapTree<CI, CO, HI, HO, TI, TO>(
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    tree: Tree<CI, HI, TI>,
    shape: Shape,
    path: Path,
    mappers: TreeMapper<CI, CO, HI, HO, TI, TO>,
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
): Tree<CO, HO, TO> {
    // We trust the shape of the multi-item to match the shape provided at
    // runtime. Therefore, in each shape branch, we cast the node to `any` and
    // reinterpret it as the expected node type.
    if (shape.type === "content") {
        const content: CI = tree as any;
        return mappers.content(content, shape, path);
    }
    if (shape.type === "hint") {
        const hint: HI = tree as any;
        return mappers.hint(hint, shape, path);
    }
    if (shape.type === "tags") {
        const tags: TI = tree as any;
        return mappers.tags(tags, shape, path);
    }
    if (shape.type === "array") {
        // @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
        const array: ArrayNode<CI, HI, TI> = tree as any;

        if (!Array.isArray(array)) {
            throw new PerseusError(
                `Invalid object of type "${typeof array}" found at path ` +
                    // @ts-expect-error - TS2769 - No overload matches this call.
                    `${["<root>"].concat(path).join(".")}. Expected array.`,
                Errors.Internal,
            );
        }

        const elementShape = shape.elementShape;
        // @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
        const mappedElements: ArrayNode<CO, HO, TO> = array.map((inner, i) =>
            mapTree(inner, elementShape, path.concat(i), mappers),
        );
        return mappers.array(mappedElements, array, shape, path);
    }
    if (shape.type === "object") {
        const object: ObjectNode<CI, HI, TI> = tree as any;

        if (object && typeof object !== "object") {
            throw new PerseusError(
                `Invalid object of type "${typeof object}" found at ` +
                    // @ts-expect-error - TS2769 - No overload matches this call.
                    `path ${["<root>"].concat(path).join(".")}. Expected ` +
                    `"object" type.`,
                Errors.InvalidInput,
            );
        }

        const valueShapes = shape.shape;
        if (!valueShapes) {
            throw new PerseusError(
                `Unexpected shape ${JSON.stringify(shape)} at path ` +
                    // @ts-expect-error - TS2769 - No overload matches this call.
                    `${["<root>"].concat(path).join(".")}.`,
                Errors.InvalidInput,
            );
        }
        const newObject: Record<string, any> = {};
        Object.keys(valueShapes).forEach((key) => {
            if (!(key in object)) {
                throw new PerseusError(
                    `Key "${key}" is missing from shape at path ` +
                        // @ts-expect-error - TS2769 - No overload matches this call.
                        `${["<root>"].concat(path).join(".")}.`,
                    Errors.InvalidInput,
                );
            }

            newObject[key] = mapTree(
                object[key],
                valueShapes[key],
                path.concat(key),
                mappers,
            );
        });
        return newObject;
    }
    throw new PerseusError(
        // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'never'.
        `unexpected shape type ${shape.type}`,
        Errors.InvalidInput,
    );
}
