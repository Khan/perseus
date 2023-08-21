/**
 * Type definitions for generic trees that are shaped like multi-items.
 *
 * Multi-items are trees! But we also often have other trees that are shaped
 * like multi-items - for example, if we map a multi-item tree into a tree of
 * renderer info and state, and then map that again into a tree of just the
 * renderer nodes, like we do in MultiRenderer.
 *
 * Therefore, we provide the type Tree<C, H>, which represents a tree that's
 * shaped like a multi-item, but the data that lives at each type of leaf could
 * be anything.
 *
 * So, in a Tree<C, H>, content leaf nodes have type C, and hint leaf nodes
 * have type H. An ItemTree is a Tree<ContentNode, HintNode>.
 *
 * That is, we still preserve the distinction between node types, and thereby
 * enforce the Tree's adherence to some multi-item Shape, but we're flexible
 * about exactly what type of data the tree contains at its leaves.
 *
 * This enables us to write generic tree-traversal and tree-mapping functions,
 * as you'll see in trees.js.
 */

// TODO(jeremy): We lost "arrayness" in D69450. It'd be nice to restore that
// because right now ArrayNode doesn't add anything.
// @ts-expect-error - TS2456 - Type alias 'ArrayNode' circularly references itself. | TS2315 - Type 'Tree' is not generic.
export type ArrayNode<C, H, T> = Tree<C, H, T>;
export type ObjectNode<C, H, T> = {
    // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    [k: string]: Tree<C, H, T>;
};

/**
 * TODO(somewhatabstract, JIRA-XXXX):
 * We should ditch this type or create some helpers for working with it.
 * As it stands, consumers have to check each node's type before using it
 * in order to ensure that TypeScript can track its refinement and appropriate use.
 * It's messy.
 */
// @ts-expect-error - TS2456 - Type alias 'Tree' circularly references itself. | TS2315 - Type 'ArrayNode' is not generic.
export type Tree<C, H, T> =
    | C
    | H
    | T
    // @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
    | ArrayNode<C, H, T>
    | ObjectNode<C, H, T>;
