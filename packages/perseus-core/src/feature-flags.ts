/**
 * IMPORTANT:
 * 1. Do not delete this file or the variable below.
 *    This will be the definition of the active feature flags in Perseus
 *    that will hide features/changes under development. This will be used
 *    by flags of APIOptions type.
 * 2. Do cleanup unused feature flags
 * 3. When no active feature flag is available value will be:
 *    export const PerseusFeatureFlags = [];
 */
const PerseusFeatureFlags = ["new-radio-widget"] as const;

export default PerseusFeatureFlags;
