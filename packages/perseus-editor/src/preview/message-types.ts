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
