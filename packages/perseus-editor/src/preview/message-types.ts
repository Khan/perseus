/**
 * This file contains the various message types passed between the editor and
 * the preview iframe.
 */

import type {SerializableApiOptions} from "./sanitize-api-options";
import type {
    Hint,
    PerseusItem,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

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
export type ArticleSectionPreviewData = {
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
 * Data for the interactive exercise preview (drives the exercise editor's
 * "Preview" tab in khan/frontend).
 *
 * Unlike the read-only `question` preview, this signals the iframe to mount the
 * full interactive `ExercisePreview` component (hint controls, answer checking,
 * scoring) rather than a `ServerItemRenderer`. All of that interactivity lives
 * inside the iframe — the parent only sends these fields and never observes or
 * controls the exercise state.
 */
export type ExercisePreviewData = {
    item: PerseusItem;
    apiOptions: SerializableApiOptions;
    showRationales: boolean;
};

/**
 * Union of all preview content types
 */
export type PreviewContent =
    | {type: "question"; data: QuestionPreviewData}
    | {type: "hint"; data: HintPreviewData}
    | {type: "article-section"; data: ArticleSectionPreviewData}
    | {type: "article-all"; data: ArticleAllPreviewData}
    | {type: "exercise"; data: ExercisePreviewData};

// ---- Parent → Iframe messages ----

/**
 * Message from parent sending content data to iframe
 */
interface PreviewDataMessage extends PreviewMessageBase {
    type: "content-data";
    content: PreviewContent;
}

/**
 * Reply from parent to the iframe's `iframe-ready` handshake, carrying the
 * full current preview state in one message. Sent once per `iframe-ready`
 * (including a genuine reload, which re-announces readiness) — this way a
 * freshly (re)loaded iframe never has to rely on messages sent before it was
 * listening.
 */
interface PreviewIframeInitMessage extends PreviewMessageBase {
    type: "iframe-init";
    content: PreviewContent | null;
}

export function createPreviewIframeInitMessage(
    content: PreviewContent | null,
): PreviewIframeInitMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "iframe-init",
        content,
    };
}

/**
 * Union of all messages sent from parent to iframe
 */
export type ParentToIframeMessage =
    | PreviewDataMessage
    | PreviewIframeInitMessage;

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
