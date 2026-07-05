/**
 * This file contains the various message types passed between the editor and
 * the preview iframe.
 */

import type {SerializableApiOptions} from "./sanitize-api-options";
import type {A11yIssue} from "../components/issues-panel";
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
    a11yEnabled: boolean;
}

export function createPreviewIframeInitMessage(
    content: PreviewContent | null,
    a11yEnabled: boolean,
): PreviewIframeInitMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "iframe-init",
        content,
        a11yEnabled,
    };
}

/**
 * Command from parent telling the iframe to enable or disable axe-core
 * accessibility scanning. When enabled, the iframe runs scans and reports back;
 * when disabled, it neither imports nor runs axe-core.
 */
interface PreviewSetA11yEnabledMessage extends PreviewMessageBase {
    type: "set-a11y-enabled";
    enabled: boolean;
}

export function createPreviewSetA11yEnabledMessage(
    enabled: boolean,
): PreviewSetA11yEnabledMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "set-a11y-enabled",
        enabled,
    };
}

/**
 * Command from parent telling the iframe to highlight the elements for the
 * given previewIds (the "Show Me" overlays drawn inside the iframe).
 */
interface PreviewHighlightIssuesMessage extends PreviewMessageBase {
    type: "highlight-issues";
    previewIds: string[];
}

export function createPreviewHighlightIssuesMessage(
    previewIds: string[],
): PreviewHighlightIssuesMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "highlight-issues",
        previewIds,
    };
}

/**
 * Command from parent telling the iframe to remove any "Show Me" highlight
 * overlays it is currently drawing.
 */
interface PreviewClearHighlightsMessage extends PreviewMessageBase {
    type: "clear-highlights";
}

export function createPreviewClearHighlightsMessage(): PreviewClearHighlightsMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "clear-highlights",
    };
}

/**
 * Union of all messages sent from parent to iframe
 */
export type ParentToIframeMessage =
    | PreviewDataMessage
    | PreviewIframeInitMessage
    | PreviewSetA11yEnabledMessage
    | PreviewHighlightIssuesMessage
    | PreviewClearHighlightsMessage;

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
 * Message from iframe reporting axe-core accessibility scan results back to the
 * parent. `violations` are confirmed issues; `incompletes` need manual review.
 */
interface PreviewA11yReportMessage extends PreviewMessageBase {
    type: "a11y-report";
    violations: A11yIssue[];
    incompletes: A11yIssue[];
}

/**
 * Union of all messages sent from iframe to parent
 */
export type IframeToParentMessage =
    | PreviewIframeReadyMessage
    | PreviewHeightUpdateMessage
    | PreviewA11yReportMessage;

export function createPreviewIframeReadyMessage(): PreviewIframeReadyMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "iframe-ready",
    };
}

export function createPreviewA11yReportMessage(
    violations: A11yIssue[],
    incompletes: A11yIssue[],
): PreviewA11yReportMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "a11y-report",
        violations,
        incompletes,
    };
}
