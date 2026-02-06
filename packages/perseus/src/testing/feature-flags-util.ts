const DEFAULT_FEATURE_FLAGS = {
    "new-radio-widget": false,
    "image-widget-upgrade": false,
    "image-widget-upgrade-alignment": false,
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
