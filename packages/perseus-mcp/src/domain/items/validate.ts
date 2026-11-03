import {
    CoreWidgetRegistry,
    getWidgetIdsFromContent,
} from "@khanacademy/perseus-core";
import {lintPerseusItem} from "@khanacademy/perseus-linter";

import {checklistLinkFor} from "../review/checklist";

import {parseItem} from "./parse";

import type {WidgetCatalog} from "./widgets";
import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";
import type {LinterIssue} from "@khanacademy/perseus-linter";

export type IssueSeverity = "error" | "warning" | "info";

export type Issue = {
    severity: IssueSeverity;
    /** A stable, machine-readable name for the kind of problem. */
    code: string;
    /** Where the problem is, e.g. `question.widgets["radio 1"]`. */
    path: string;
    message: string;
    /** The review checklist entry that explains this kind of issue. */
    see?: string;
};

export type ValidationResult = {
    /** True when there are no "error" issues. */
    valid: boolean;
    issues: Issue[];
    /** The parsed, migrated item; null if it couldn't be parsed. */
    item: PerseusItem | null;
};

// The markdown parser only turns placeholders of this form into widgets
// (see pure-markdown's widget rule); anything else renders as plain text.
const RENDERABLE_WIDGET_ID = /^[a-z-]+ [0-9]+$/;

type RendererAtPath = {renderer: PerseusRenderer; path: string};

/**
 * Lists every renderer in the item, including those nested inside widgets
 * such as group and graded-group.
 *
 * perseus-core's `traverse` visits nested renderers too, but doesn't say
 * where they are, and every issue needs a path.
 */
function collectRenderers(item: PerseusItem): RendererAtPath[] {
    const out: RendererAtPath[] = [];
    const visit = (renderer: PerseusRenderer, path: string) => {
        out.push({renderer, path});
        for (const [id, widget] of Object.entries(renderer.widgets ?? {})) {
            let n = 0;
            CoreWidgetRegistry.traverseChildWidgets(
                widget,
                (child: PerseusRenderer) => {
                    visit(child, `${path}.widgets["${id}"] (nested #${++n})`);
                    return child;
                },
            );
        }
    };
    visit(item.question, "question");
    item.hints.forEach((hint, i) => visit(hint, `hints[${i}]`));
    return out;
}

function checkRenderer(
    {renderer, path}: RendererAtPath,
    widgets: WidgetCatalog,
): Issue[] {
    const issues: Issue[] = [];
    const widgetMap = renderer.widgets ?? {};
    const placeholderIds = getWidgetIdsFromContent(renderer.content);

    const seen = new Set<string>();
    for (const id of placeholderIds) {
        if (seen.has(id)) {
            issues.push({
                severity: "error",
                code: "duplicate-placeholder",
                path: `${path}.content`,
                message: `[[☃ ${id}]] appears more than once; each widget can be placed only once.`,
            });
        }
        seen.add(id);

        if (!RENDERABLE_WIDGET_ID.test(id)) {
            issues.push({
                severity: "error",
                code: "unrenderable-widget-id",
                path: `${path}.content`,
                message: `Widget id "${id}" won't render: ids must look like "<type> <number>" in lowercase, e.g. "radio 1".`,
            });
        }
        if (widgetMap[id] == null) {
            issues.push({
                severity: "error",
                code: "missing-widget",
                path: `${path}.content`,
                message: `[[☃ ${id}]] has no matching entry in widgets.`,
            });
        }
    }

    for (const [id, widget] of Object.entries(widgetMap)) {
        const widgetPath = `${path}.widgets["${id}"]`;
        if (!seen.has(id)) {
            issues.push({
                severity: "warning",
                code: "orphaned-widget",
                path: widgetPath,
                message: `Widget "${id}" isn't placed in the content (no [[☃ ${id}]]), so it won't show or be scored.`,
            });
        }
        const type = widget?.type;
        if (type == null || !widgets.isKnownType(type)) {
            issues.push({
                severity: "error",
                code: "unknown-widget-type",
                path: widgetPath,
                message: `"${type}" isn't a widget type Perseus supports. See list_widgets.`,
            });
            continue;
        }
        const status = widgets.status(type);
        if (status === "do-not-use") {
            issues.push({
                severity: "warning",
                code: "unfinished-widget",
                path: widgetPath,
                message: `The ${type} widget isn't finished and shouldn't be used yet.`,
            });
        } else if (status === "avoid") {
            issues.push({
                severity: "info",
                code: "deprecated-widget",
                path: widgetPath,
                message: `The ${type} widget is deprecated; avoid it if possible (see get_widget_spec).`,
            });
        }
    }
    return issues;
}

function lintIssues(item: PerseusItem): Issue[] {
    const lint = lintPerseusItem(item);
    const toIssue =
        (path: string) =>
        (issue: LinterIssue): Issue => ({
            // Linter severity 1 is an error; 2 and above are warnings and
            // guidelines.
            severity: issue.severity === 1 ? "error" : "warning",
            code: `lint:${issue.rule}`,
            path: `${path}.content`,
            message: issue.message,
        });
    return [
        ...lint.question.map(toIssue("question")),
        ...lint.hints.flatMap((issues, i) =>
            issues.map(toIssue(`hints[${i}]`)),
        ),
    ];
}

function withChecklistLink(issue: Issue): Issue {
    const see = checklistLinkFor(issue.code);
    return see == null ? issue : {...issue, see};
}

/**
 * Checks an item (any Perseus version, as an object or JSON string): it must
 * parse, every widget placeholder must have a widget and vice versa, and the
 * content is linted.
 */
export function validateItem(
    input: unknown,
    widgets: WidgetCatalog,
): ValidationResult {
    const parsed = parseItem(input);
    if (!parsed.ok) {
        return {
            valid: false,
            item: null,
            issues: [
                {
                    severity: "error",
                    code: "parse-error",
                    path: "(root)",
                    message: parsed.error,
                },
            ],
        };
    }

    const issues = [
        ...collectRenderers(parsed.item).flatMap((renderer) =>
            checkRenderer(renderer, widgets),
        ),
        ...lintIssues(parsed.item),
    ].map(withChecklistLink);
    return {
        valid: !issues.some((issue) => issue.severity === "error"),
        issues,
        item: parsed.item,
    };
}
