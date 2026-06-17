import type {PerseusFeatureFlags} from "@khanacademy/perseus-core";

const DEFAULT_FEATURE_FLAGS: Record<
    | "perseus-test-flag-1"
    | "perseus-test-flag-2"
    | (typeof PerseusFeatureFlags)[number],
    boolean
> = {
    // Flags for testing.
    "perseus-test-flag-1": false,
    "perseus-test-flag-2": false,
    // Real production flags.
    "input-number-to-numeric-input": false,
    "perseus-renderer-upgrade": false,
    "grapher-to-interactive-graph": false,
    // ...add new flags here
};

/** Utility to get feature flags with optional overrides for testing.
 *  sample usage:
 *  getFeatureFlags({"image-widget-upgrade": true})
 */
export function getFeatureFlags(
    overrides: Partial<typeof DEFAULT_FEATURE_FLAGS> = {},
) {
    return {...DEFAULT_FEATURE_FLAGS, ...overrides};
}
