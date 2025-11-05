import type {APIOptions} from "@khanacademy/perseus";

/**
 * Removes non-serializable functions from apiOptions before sending via postMessage.
 *
 * These functions are not needed in the preview iframe:
 * - onFocusChange: Focus tracking not needed in preview
 */
export function sanitizeApiOptions(
    apiOptions: APIOptions,
): Omit<APIOptions, "onFocusChange"> {
    const {onFocusChange: _, ...rest} = apiOptions;
    return rest;
}
