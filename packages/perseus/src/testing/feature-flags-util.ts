const DEFAULT_FEATURE_FLAGS = {
    // Flags for testing.
    "perseus-test-flag-1": false,
    "perseus-test-flag-2": false,
    // Real production flags.
    "new-radio-widget": false,
    "image-widget-upgrade-gif-controls": false,
    "image-widget-upgrade-scale": false,
    "interactive-graph-absolute-value": false,
    "interactive-graph-tangent": false,
    "interactive-graph-logarithm": false,
    "interactive-graph-exponent": false,
    "interactive-graph-vector": false,
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
