/**
 * This file contains the various message types passed between the editor and
 * the preview iframe.
 */

import type {HintsState} from "./hints-state";
import type {A11yIssue} from "./issues";
import type {SerializableApiOptions} from "./sanitize-api-options";
import type {
    Hint,
    PerseusItem,
    PerseusRenderer,
    ShowSolutions,
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
 * How the preview iframe should render its content. The parent sends these in
 * `iframe-init` and changes them with `set-preview-options`; the iframe never
 * reads them from its own element, which it can't reach when the parent is on
 * another origin.
 *
 * The presenter acts on `a11yScanningEnabled` itself. The other options are
 * for the preview page to apply as it renders.
 */
export type PreviewOptions = {
    /** Render as on a phone or tablet. */
    isMobile: boolean;
    /** Leave room in the right margin for lint indicators. */
    hasLintGutter: boolean;
    /** Run axe-core accessibility scans and report the results. */
    a11yScanningEnabled: boolean;
    /** Render as after the learner has answered: widgets show their state. */
    reviewMode: boolean;
    /** Which choices' correctness to show. */
    showSolutions: ShowSolutions;
    /** Show rationales (choice explanations). */
    showRationales: boolean;
    /** Render without the answers, as learners receive the item. */
    answerless: boolean;
    /** The locale to render in, e.g. "en" or "ar". */
    locale: string;
    colorScheme: "light" | "dark";
    /** Show the content but don't accept input. */
    readOnly: boolean;
};

export const DEFAULT_PREVIEW_OPTIONS: PreviewOptions = {
    isMobile: false,
    hasLintGutter: false,
    a11yScanningEnabled: false,
    reviewMode: false,
    showSolutions: "none",
    showRationales: false,
    answerless: false,
    locale: "en",
    colorScheme: "light",
    readOnly: false,
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
 * Base type for messages tied to a specific version of the preview content.
 *
 * `contentVersion` is a monotonic counter owned by the parent controller,
 * stamped onto every content update and echoed back on the scan report and
 * highlight commands it produces. It lets both sides discard results computed
 * against content that has since been superseded by a newer edit — see the
 * gating in `use-preview-controller.ts` / `use-preview-presenter.ts`.
 */
interface PreviewMessageVersioned extends PreviewMessageBase {
    contentVersion: number;
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
interface PreviewDataMessage extends PreviewMessageVersioned {
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
interface PreviewIframeInitMessage extends PreviewMessageVersioned {
    type: "iframe-init";
    content: PreviewContent | null;
    previewOptions: PreviewOptions;
}

export function createPreviewIframeInitMessage(
    content: PreviewContent | null,
    previewOptions: PreviewOptions,
    contentVersion: number,
): PreviewIframeInitMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "iframe-init",
        content,
        previewOptions,
        contentVersion,
    };
}

/**
 * Command from parent changing some of the preview options; the rest keep
 * their current values. Turning `a11yScanningEnabled` off stops the iframe
 * from importing or running axe-core.
 */
interface PreviewSetPreviewOptionsMessage extends PreviewMessageBase {
    type: "set-preview-options";
    options: Partial<PreviewOptions>;
}

export function createPreviewSetPreviewOptionsMessage(
    options: Partial<PreviewOptions>,
): PreviewSetPreviewOptionsMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "set-preview-options",
        options,
    };
}

/**
 * Command from parent telling the iframe which of an exercise's hints to show.
 * `hintsVisible` is a count, as in HintsRenderer's prop of that name: 0 for
 * none, n for the first n, -1 for all. Leave it out to reveal the next hint.
 * Revealing more than one hint at once enters final-help-page mode (see
 * {@link HintsState}); showing fewer hints than before remounts the preview,
 * which also clears the learner's answers.
 */
interface PreviewRevealHintMessage extends PreviewMessageBase {
    type: "reveal-hint";
    hintsVisible?: number;
}

export function createPreviewRevealHintMessage(
    hintsVisible?: number,
): PreviewRevealHintMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "reveal-hint",
        ...(hintsVisible == null ? {} : {hintsVisible}),
    };
}

/**
 * Command from parent telling the iframe to highlight the elements for the
 * given instanceIds (the "Show Me" overlays drawn inside the iframe).
 */
interface PreviewHighlightIssuesMessage extends PreviewMessageVersioned {
    type: "highlight-issues";
    instanceIds: string[];
}

export function createPreviewHighlightIssuesMessage(
    instanceIds: string[],
    contentVersion: number,
): PreviewHighlightIssuesMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "highlight-issues",
        instanceIds,
        contentVersion,
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
    | PreviewSetPreviewOptionsMessage
    | PreviewRevealHintMessage
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
 * parent.
 */
interface PreviewA11yReportMessage extends PreviewMessageVersioned {
    type: "a11y-report";
    /** Violations are issues that are confirmed by the a11y scanner. **/
    violations: A11yIssue[];
    /**
     * NeedsReview are issues that the scanner cannot definitively say is a
     * violation or not. Requires manual review.
     */
    needsReview: A11yIssue[];
}

/**
 * Message from iframe reporting which of the exercise's hints it shows. Sent
 * whenever that changes, including when new content has a different number
 * of hints.
 */
interface PreviewHintsStateMessage extends PreviewMessageBase {
    type: "hints-state";
    hintsState: HintsState;
}

export function createPreviewHintsStateMessage(
    hintsState: HintsState,
): PreviewHintsStateMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "hints-state",
        hintsState,
    };
}

/**
 * How the iframe's render of the content went. The parent starts each new
 * content at "rendering"; the iframe reports "done" once the content and its
 * images and math have finished rendering, or "error" if it couldn't render.
 */
export type RenderState =
    | {status: "rendering"}
    | {status: "done"}
    | {status: "error"; message: string};

/**
 * Message from iframe reporting how its render of the content went, for the
 * content version it rendered.
 */
interface PreviewRenderStateMessage extends PreviewMessageVersioned {
    type: "render-state";
    renderState: RenderState;
}

export function createPreviewRenderStateMessage(
    renderState: RenderState,
    contentVersion: number,
): PreviewRenderStateMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "render-state",
        renderState,
        contentVersion,
    };
}

/**
 * Union of all messages sent from iframe to parent
 */
export type IframeToParentMessage =
    | PreviewIframeReadyMessage
    | PreviewHeightUpdateMessage
    | PreviewA11yReportMessage
    | PreviewHintsStateMessage
    | PreviewRenderStateMessage;

export function createPreviewIframeReadyMessage(): PreviewIframeReadyMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "iframe-ready",
    };
}

/**
 * @public just to appease knip until the next PR.
 */
export function createPreviewA11yReportMessage(
    violations: A11yIssue[],
    needsReview: A11yIssue[],
    contentVersion: number,
): PreviewA11yReportMessage {
    return {
        source: PREVIEW_MESSAGE_SOURCE,
        type: "a11y-report",
        violations,
        needsReview,
        contentVersion,
    };
}
