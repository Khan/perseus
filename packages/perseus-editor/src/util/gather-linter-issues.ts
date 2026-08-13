import {PerseusMarkdown} from "@khanacademy/perseus";
import * as PerseusLinter from "@khanacademy/perseus-linter";

import {getIssueKey} from "../components/issues-panel";
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

    // A linter warning is identified by its rule name, so several occurrences
    // of one rule in the same renderer arrive sharing an `id`. Stamp an
    // occurrence ordinal to make each issue's key unique within this renderer,
    // leaving alone the ids that are already unique (`inaccessible-widget-*`).
    //
    // The ordinal counts per rule rather than across the whole list, so a new
    // warning of one rule doesn't renumber every issue after it.
    const ruleCounts = new Map<string, number>();
    return [...linterIssues, ...texIssues].map((issue) => {
        const ordinal = ruleCounts.get(issue.id) ?? 0;
        ruleCounts.set(issue.id, ordinal + 1);
        return {
            ...issue,
            instanceId: issue.instanceId ?? `${issue.id}-${ordinal}`,
        };
    });
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
                instanceId: `hint-${i + 1}-${getIssueKey(issue)}`,
                message: `Hint ${i + 1}: ${issue.message}`,
            }),
        ),
    );

    return [...(hostIssues ?? []), ...questionIssues, ...hintIssues];
}
