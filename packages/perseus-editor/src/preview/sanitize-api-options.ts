import type {APIOptions} from "@khanacademy/perseus";

/**
 * The `APIOptions` fields that can't survive `postMessage`'s structured-clone
 * algorithm — function callbacks and React nodes. `sanitizeApiOptions` strips
 * exactly these, so keep this list and the destructuring below in sync.
 */
type NonSerializableApiOptionKey =
    | "onFocusChange"
    | "answerableCallback"
    | "getAnotherHint"
    | "interactionCallback"
    | "trackInteraction"
    | "baseElements"
    | "imagePlaceholder"
    | "widgetPlaceholder";

/**
 * `APIOptions` with the non-serializable fields removed. This is the shape that
 * actually crosses the preview postMessage bridge, so the preview message types
 * describe their `apiOptions` with this rather than the full `APIOptions`.
 */
export type SerializableApiOptions = Omit<
    APIOptions,
    NonSerializableApiOptionKey
>;

/**
 * Removes non-serializable functions and React components from APIOptions
 * before sending via postMessage.
 *
 * All function callbacks and React components are removed as they cannot be
 * cloned by the structured clone algorithm used by postMessage.
 *
 * Serializable options (booleans, strings, numbers) are preserved.
 */
export function sanitizeApiOptions(
    apiOptions: APIOptions,
): SerializableApiOptions {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
        onFocusChange: _,
        answerableCallback: __,
        getAnotherHint: ___,
        interactionCallback: ____,
        trackInteraction: _____,
        baseElements: _______,
        // Remove React nodes (placeholders)
        imagePlaceholder: _________,
        widgetPlaceholder: __________,
        ...serializableOptions
    } = apiOptions;

    return serializableOptions;
}
