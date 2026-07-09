import {PerseusMarkdown} from "@khanacademy/perseus";
import * as PerseusLinter from "@khanacademy/perseus-linter";

import {WARNINGS} from "../messages";

import {detectTexErrors} from "./tex-error-detector";

import type {Issue} from "../components/issues-panel";
import type {
    Hint,
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

function lintRenderer(content: string, widgets?: PerseusWidgetsMap): Issue[] {
    const parsed = PerseusMarkdown.parse(content, {});
    const linterContext = {content, widgets, stack: []};

    const linterIssues = (
        PerseusLinter.runLinter(parsed, linterContext, false) ?? []
    ).map((warning) => {
        if (warning.rule === "inaccessible-widget") {
            return WARNINGS.inaccessibleWidget(
                warning.metadata?.widgetType ?? "unknown",
                warning.metadata?.widgetId ?? "unknown",
            );
        }
        return WARNINGS.genericLinterWarning(
            warning.rule,
            warning.message,
            warning.severity,
        );
    });

    const texIssues = detectTexErrors(content).map((error, i) =>
        WARNINGS.texError(error.math, error.message, i),
    );

    return [...linterIssues, ...texIssues];
}

export function gatherLinterIssues(
    question: PerseusRenderer | undefined,
    hints: Hint[],
    hostIssues?: Issue[],
): Issue[] {
    const questionIssues = lintRenderer(
        question?.content ?? "",
        question?.widgets,
    );

    const hintIssues = hints.flatMap((hint, i) =>
        lintRenderer(hint.content ?? "", hint.widgets ?? undefined).map(
            (issue) => ({
                ...issue,
                id: `hint-${i + 1}-${issue.id}`,
                message: `Hint ${i + 1}: ${issue.message}`,
            }),
        ),
    );

    return [...(hostIssues ?? []), ...questionIssues, ...hintIssues];
}
