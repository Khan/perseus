/**
 * The browsers our built code must run in. Shared with the Storybook build
 * so its Chromatic snapshots render the same output we ship.
 */

// Keep in sync with `target` in tsconfig-common.json!
export const jsTarget = "es2020";

// Khan Academy's current browser targets as of Oct 1, 2026
//
// Set explicitly because `cssTarget` defaults to `jsTarget`, which Vite maps
// to much older browsers.
export const cssTarget = ["chrome144", "safari16.6"];
