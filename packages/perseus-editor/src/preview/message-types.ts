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
 * Base type for all preview messages
 */
interface PreviewMessageBase {
    source: "perseus-preview";
    id: string | number;
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
    bold: boolean;
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

/**
 * Message from iframe requesting data from parent
 * (iframe sends its ID as a string)
 */
export type PreviewDataRequestMessage = string;

/**
 * Message from parent sending data to iframe
 * (parent sends iframe ID as a string, iframe looks up data in iframeDataStore)
 */
export type PreviewDataResponseMessage = string | number;

/**
 * Message from iframe reporting its content height
 */
export type PreviewHeightUpdateMessage = PreviewMessageBase & {
    type: "height-update";
    height: number;
};

/**
 * Message from iframe reporting lint warnings
 */
export type PreviewLintReportMessage = PreviewMessageBase & {
    type: "lint-report";
    lintWarnings: ReadonlyArray<any>;
};

/**
 * Union of all messages sent from iframe to parent
 */
export type IframeToParentMessage =
    | PreviewDataRequestMessage
    | PreviewHeightUpdateMessage
    | PreviewLintReportMessage;

/**
 * Union of all messages sent from parent to iframe
 */
export type ParentToIframeMessage = PreviewDataResponseMessage;
