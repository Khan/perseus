import type {APIOptions} from "@khanacademy/perseus";

/**
 * Removes non-serializable functions from apiOptions before sending via postMessage.
 *
 * These functions are not needed in the preview iframe:
 * - GroupMetadataEditor: Only used in exercise editing UI
 * - groupAnnotator: Only used in exercise editing UI
 * - onFocusChange: Focus tracking not needed in preview
 */
export function sanitizeApiOptions(
    apiOptions: APIOptions,
): Omit<APIOptions, "GroupMetadataEditor" | "groupAnnotator" | "onFocusChange"> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {GroupMetadataEditor, groupAnnotator, onFocusChange, ...rest} =
        apiOptions;
    return rest;
}
