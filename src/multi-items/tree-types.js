// @flow
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
export type ArrayNode<C, H> = Array<Tree<C, H>>;
export type ObjectNode<C, H> = {[k: string]: Tree<C, H>};
export type Tree<C, H> = C | H | ArrayNode<C, H> | ObjectNode<C, H>;
