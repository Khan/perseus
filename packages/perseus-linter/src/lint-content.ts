import {parse} from "@khanacademy/pure-markdown";

import {runLinter} from "./run-linter";

import type {LinterWarning} from "./rule";
import type {
    PerseusItem,
    PerseusArticle,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

/**
 * Lint a full Perseus exercise item, including the question and all hints.
 *
 * @param parsedPerseusItem - A parsed PerseusItem, typically the output of
 *   `parseAndMigratePerseusItem`.
 * @returns An array of lint warnings found across the question and hints.
 */
export function lintPerseusItem(
    parsedPerseusItem: PerseusItem,
): ReadonlyArray<LinterWarning> {
    const questionLint = lintPerseusRenderer(parsedPerseusItem.question);
    const hintLint = parsedPerseusItem.hints.flatMap((hint) =>
        lintPerseusRenderer(hint, "exercise"),
    );

    return [...questionLint, ...hintLint];
}

/**
 * Lint a Perseus article, which may be a single renderer or an array of
 * renderer sections.
 *
 * @param parsedPerseusArticle - A parsed PerseusArticle, typically the output
 *   of `parseAndMigratePerseusArticle`.
 * @returns An array of lint warnings found across all sections.
 */
export function lintPerseusArticle(
    parsedPerseusArticle: PerseusArticle,
): ReadonlyArray<LinterWarning> {
    const articleSections = Array.isArray(parsedPerseusArticle)
        ? parsedPerseusArticle
        : [parsedPerseusArticle];

    return articleSections.flatMap((section) =>
        lintPerseusRenderer(section, "article"),
    );
}

/**
 * Lint a single Perseus renderer block by parsing its markdown content and
 * running the standard lint rules against it.
 *
 * @param parsedPerseusRenderer - A parsed PerseusRenderer, typically the
 *   output of `parseAndMigratePerseusRenderer` or a sub-field of a
 *   PerseusItem/PerseusArticle.
 * @returns An array of lint warnings found in the content.
 */
export function lintPerseusRenderer(
    parsedPerseusRenderer: PerseusRenderer,
    contentType?: "article" | "exercise",
): ReadonlyArray<LinterWarning> {
    const tree = parse(parsedPerseusRenderer.content);
    const context = {
        content: parsedPerseusRenderer.content,
        widgets: parsedPerseusRenderer.widgets,
        stack: [],
        contentType,
    };

    return runLinter(tree, context, false);
}
