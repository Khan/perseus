/**
 * This file contains the various message types passed between the editor and
 * the preview iframe.
 */

import type {APIOptions, DeviceType} from "@khanacademy/perseus";
import type {
    Hint,
    PerseusArticle,
    PerseusItem,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

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
 * Data for question preview (full item with question, answer area, and hints)
 */
export type QuestionPreviewData = {
    item: PerseusItem;
    apiOptions: APIOptions;
    initialHintsVisible: number;
    device: DeviceType;
    linterContext: LinterContextProps;
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
    apiOptions: APIOptions;
    linterContext: LinterContextProps;
};

/**
 * Data for article section preview
 */
export type ArticlePreviewData = {
    apiOptions: APIOptions;
    json: PerseusArticle;
    linterContext: LinterContextProps;
    legacyPerseusLint?: ReadonlyArray<string>;
};

/**
 * Union of all preview content types
 */
export type PreviewContent =
    | {type: "question"; data: QuestionPreviewData}
    | {type: "hint"; data: HintPreviewData}
    | {type: "article"; data: ArticlePreviewData}
    | {type: "article-all"; data: ArticlePreviewData[]};

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
 * Message from iframe requesting data from parent
 */
interface PreviewDataRequestMessage extends PreviewMessageBase {
    type: "request-data";
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
    | PreviewDataRequestMessage
    | PreviewHeightUpdateMessage;
