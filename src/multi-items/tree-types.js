// @flow
export type ArrayNode<C, H> = Array<Tree<C, H>>;
export type ObjectNode<C, H> = {[k: string]: Tree<C, H>};
export type Tree<C, H> = C | H | ArrayNode<C, H> | ObjectNode<C, H>;
