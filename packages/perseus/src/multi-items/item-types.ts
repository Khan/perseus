/**
 * Type definitions for multi-item types, including:
 *
 * - Item: A multi-item tree wrapped in a `_multi` key, to help us recognize it
 *         as a multi-item in other contexts and avoid misinterpreting its
 *         other properties.
 * - ItemTree: A multi-item without the `_multi` key. Conforms to the Tree
 *             interface, so it's compatible with our tree traversal functions.
 * - And the various types of nodes that compose a tree.
 */
import type {Tree, ArrayNode, ObjectNode} from "./tree-types";
import type {PerseusWidgetsMap} from "../perseus-types";
import type {ImageDict} from "../types";

export type ContentNode = {
    // TODO(mdr): When we first drafted the multi-item feature, we named
    //     content nodes "item" nodes, and later decided the term was
    //     ambiguous and switched to "content". But we're temporarily keeping
    //     support for the "item" string when inferring item shape, so that we
    //     don't crash on multi-items we've already created - but all new
    //     content nodes will be generated with the "content" string.
    //
    //     Code blocks that enable this legacy support are greppable with the
    //     keyword #LegacyContentNode.
    __type: "content" | "item";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
};
export type HintNode = {
    __type: "hint";
    // Perseus has default values for these fields, so they're all optional.
    content?: string | null | undefined;
    images?: ImageDict | null | undefined;
    widgets?: PerseusWidgetsMap | null | undefined;
    replace?: boolean | null | undefined;
};
export type TagsNode = ReadonlyArray<string>;

// @ts-expect-error - TS2315 - Type 'ArrayNode' is not generic.
export type ItemArrayNode = ArrayNode<ContentNode, HintNode, TagsNode>;
export type ItemObjectNode = ObjectNode<ContentNode, HintNode, TagsNode>;
// @ts-expect-error - TS2315 - Type 'Tree' is not generic.
export type ItemTree = Tree<ContentNode, HintNode, TagsNode>;

// TODO(jeremy): I think we could refine this root type for multi items. Right
// now a _multi's value can be _anything_ including "primitive" node types such
// as "type: content" or "type: hint". That doesn't seem to match the shapes
// that are in use to date. We could also move to a strict type at that point
// because it appears that we _never_ add other root keys to an item that
// specifies the `_multi` key. I think we'd be safe to restrict this root
// object type to something like the following:
// export type Item = {|_multi: ItemArrayNode | ItemObjectNode|};
export type Item = {
    _multi: ItemTree;
};
