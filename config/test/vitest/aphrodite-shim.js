// EXPERIMENT: stands in for `aphrodite` in Vitest (see `resolve.alias` in
// vitest.config.mts).
//
// In VM pools, Vitest copies a CommonJS module's named exports when the module
// loads, so `import {css} from "aphrodite"` keeps the original `css` even after
// the snapshot serializer replaces `aphrodite.css`. This module's `css` looks
// the function up on Aphrodite's exports object at call time instead.
import aphrodite from "aphrodite/lib/index.js";

export default aphrodite;
export const {StyleSheet, StyleSheetServer, StyleSheetTestUtils} = aphrodite;
export function css(...styles) {
    return aphrodite.css(...styles);
}
