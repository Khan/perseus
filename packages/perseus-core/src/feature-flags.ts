/**
 * IMPORTANT:
 * 1. Do not delete this file or the variable below.
 *    This will be the definition of the active feature flags in Perseus
 *    that will hide features/changes under development. This will be used
 *    by flags of APIOptions type.
 * 2. Do clean up unused feature flags.
 * 3. When no active feature flag is available value will be:
 *    export const PerseusFeatureFlags = [];
 * 4. Also update the testing/feature-flags-util.ts for testing purpose
 */
const PerseusFeatureFlags = [
    "input-number-to-numeric-input", // TODO(LEMS-4085): clean up feature flag
    "perseus-renderer-upgrade", // TODO(LEMS-4304): clean up feature flag
    "grapher-to-interactive-graph", // TODO(LEMS-4259): clean up feature flag
] as const;

export default PerseusFeatureFlags;

/**
 * Checks if a feature flag is enabled in the given props.
 */
export function isFeatureOn(
    props: {apiOptions?: {flags?: Record<string, boolean>}},
    flag: string,
): boolean {
    return props.apiOptions?.flags?.[flag] ?? false;
}
