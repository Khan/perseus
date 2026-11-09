import {parse} from "@khanacademy/pure-markdown";

import {runLinter} from "./run-linter";

import type {LinterIssue} from "./rule";
import type {
    PerseusItem,
    PerseusArticle,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

export type ItemLinterIssues = {
    question: LinterIssue[];
    hints: LinterIssue[][];
};
/**
 * Lint a full Perseus item, including the question and all hints.
 *
 * @param parsedPerseusItem - A parsed PerseusItem, typically the output of
 *   `parseAndMigratePerseusItem`.
 * @returns Question issues plus per-hint issue arrays.
 */
export function lintPerseusItem(
    parsedPerseusItem: PerseusItem,
): ItemLinterIssues {
    const questionLint = lintPerseusRenderer(
        parsedPerseusItem.question,
        "exercise",
    );
    const hintLint = parsedPerseusItem.hints.map((hint) =>
        lintPerseusRenderer(hint, "exercise"),
    );

    return {
        question: questionLint,
        hints: hintLint,
    };
}

/**
 * Lint a Perseus article.
 *
 * @remarks A single `PerseusRenderer` is treated as one section, so the outer array
 * has length 1.
 * @param parsedPerseusArticle - A parsed PerseusArticle, typically the output
 *   of `parseAndMigratePerseusArticle`.
 * @returns A nested array with one array of linter issues per article section
 */
export function lintPerseusArticle(
    parsedPerseusArticle: PerseusArticle,
): LinterIssue[][] {
    const articleSections = Array.isArray(parsedPerseusArticle)
        ? parsedPerseusArticle
        : [parsedPerseusArticle];

    return articleSections.map((section) =>
        lintPerseusRenderer(section, "article"),
    );
}

/**
 * Lint a single Perseus renderer block by parsing its markdown content and
 * running the standard lint rules against it.
 *
 * @param parsedPerseusRenderer - Parsed renderer (content and widgets).
 * @param contentType - Lint context: article, exercise, or renderer-only.
 * @returns An array of lint issues found in the content.
 */
export function lintPerseusRenderer(
    parsedPerseusRenderer: PerseusRenderer,
    contentType: "article" | "exercise" | "renderer",
): LinterIssue[] {
    const tree = parse(parsedPerseusRenderer.content);
    const context = {
        content: parsedPerseusRenderer.content,
        widgets: parsedPerseusRenderer.widgets,
        stack: [],
        contentType,
    };

    return [...runLinter(tree, context, false)];
}
