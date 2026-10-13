/**
 * The browsers our built code must run in. Shared with the Storybook build
 * so its Chromatic snapshots render the same output we ship.
 */

// Keep in sync with `target` in tsconfig-common.json!
export const jsTarget = "es2020";

// Set explicitly because `cssTarget` defaults to `jsTarget`, which Vite maps
// to much older browsers. Lightning CSS would then rewrite modern CSS, such as
// turning `:dir(rtl)` into `:lang(...)` selectors that ignore the `dir`
// attribute.
export const cssTarget = ["chrome144", "safari16.6"];
