/**
 * This file contains the various message types passed between the editor and
 * the preview iframe.
 */

import type {SerializableApiOptions} from "./sanitize-api-options";
import type {Hint, PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * The subset of `LinterContextProps` that's meaningful to send across the
 * preview bridge. The receiver wraps this in `pushContextStack(...)` before
 * passing it to the renderer, which fills in the `stack`.
 */
// TODO(jeremy): Remove this type and inline it into the messages that use it.
type PreviewLinterContext = {
    contentType: string;
    highlightLint: boolean;
};

/**
 * Constant identifier for all Perseus preview messages
 */
export const PREVIEW_MESSAGE_SOURCE = "perseus-preview" as const;

/**
 * Base type for all preview messages
 */
interface PreviewMessageBase {
    source: typeof PREVIEW_MESSAGE_SOURCE;
}

/**
 * Data for the read-only question preview shown while editing an exercise.
 *
 * This carries just the question's `PerseusRenderer` — the content under edit —
 * rather than a full `PerseusItem`. The answer widgets live inside the question
 * renderer itself; the legacy answer-area tools and hints are previewed
 * elsewhere.
 */
export type QuestionPreviewData = {
    question: PerseusRenderer;
    apiOptions: SerializableApiOptions;
    linterContext: PreviewLinterContext;
    reviewMode?: boolean;
    legacyPerseusLint?: ReadonlyArray<string>;
    problemNum?: number;
};

/**
 * Data for single hint preview (used in hint editor)
 */
export type HintPreviewData = {
    hint: Hint;
    pos: number;
    apiOptions: SerializableApiOptions;
    linterContext: PreviewLinterContext;
};

/**
 * Data for a single article section preview (used in edit mode for one section)
 */
export type ArticlePreviewData = {
    article: PerseusRenderer;
    apiOptions: SerializableApiOptions;
    linterContext: PreviewLinterContext;
    legacyPerseusLint?: ReadonlyArray<string>;
};

/**
 * Data for article-all preview (used in preview mode to render all sections at once)
 */
export type ArticleAllPreviewData = {
    article: ReadonlyArray<PerseusRenderer>;
    apiOptions: SerializableApiOptions;
};

/**
 * Union of all preview content types
 */
export type PreviewContent =
    | {type: "question"; data: QuestionPreviewData}
    | {type: "hint"; data: HintPreviewData}
    | {type: "article"; data: ArticlePreviewData}
    | {type: "article-all"; data: ArticleAllPreviewData};

// ---- Parent → Iframe messages ----

/**
 * Message from parent sending content data to iframe
 */
interface PreviewDataMessage extends PreviewMessageBase {
    type: "content-data";
    content: PreviewContent;
}

/**
 * Union of all messages sent from parent to iframe
 */
export type ParentToIframeMessage = PreviewDataMessage;

// ---- Iframe → Parent messages ----

/**
 * Message from iframe to parent telling it the iframe is ready
 */
interface PreviewIframeReadyMessage extends PreviewMessageBase {
    type: "iframe-ready";
}

/**
 * Message from iframe reporting its content height
 */
interface PreviewHeightUpdateMessage extends PreviewMessageBase {
    type: "height-update";
    height: number;
}

/**
 * Union of all messages sent from iframe to parent
 */
export type IframeToParentMessage =
    | PreviewIframeReadyMessage
    | PreviewHeightUpdateMessage;

export function createPreviewIframeReadyMessage(): PreviewIframeReadyMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "iframe-ready",
    };
}
