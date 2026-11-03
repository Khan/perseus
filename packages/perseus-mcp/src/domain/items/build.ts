import {
    CoreWidgetRegistry,
    isFailure,
    parseAndMigratePerseusRenderer,
} from "@khanacademy/perseus-core";

import {validateItem} from "./validate";

import type {Issue} from "./validate";
import type {WidgetCatalog} from "./widgets";
import type {
    PerseusItem,
    PerseusRenderer,
    PerseusWidget,
} from "@khanacademy/perseus-core";

/** A widget to build: its options are merged over the type's defaults. */
export type WidgetInput = {
    /** As placed in the content, e.g. "radio 1". */
    id: string;
    type: string;
    options?: Record<string, unknown>;
    graded?: boolean;
    static?: boolean;
    alignment?: string;
};

/** Content plus a list of widgets, rather than Perseus's widgets map. */
export type RendererInput = {
    content: string;
    widgets?: ReadonlyArray<WidgetInput>;
    images?: Record<string, unknown>;
};

export type ItemInput = {
    question: RendererInput;
    hints?: ReadonlyArray<RendererInput & {replace?: boolean}>;
    answerArea?: Record<string, unknown>;
};

export type BuildResult =
    | {ok: true; item: PerseusItem; issues: Issue[]}
    | {ok: false; issues: Issue[]};

type WidgetResult =
    | {ok: true; widget: PerseusWidget}
    | {ok: false; error: string};

/**
 * Builds a complete widget: the registry's default options with `options`
 * merged over them, at the widget's current version. The result goes through
 * the renderer parser, so it's checked and always in its latest form; some
 * widgets' defaults don't parse on their own (free-response's lack required
 * fields), which comes back as an error.
 */
export function buildWidget(input: WidgetInput): WidgetResult {
    const {id, type} = input;
    const parsed = parseAndMigratePerseusRenderer({
        content: `[[☃ ${id}]]`,
        widgets: {
            [id]: {
                type,
                graded: input.graded ?? true,
                static: input.static ?? false,
                alignment: input.alignment ?? "default",
                version: CoreWidgetRegistry.getCurrentVersion(type),
                options: {
                    ...CoreWidgetRegistry.getDefaultWidgetOptions(type),
                    ...input.options,
                },
            },
        },
        images: {},
    });
    if (isFailure(parsed)) {
        return {ok: false, error: parsed.detail.message};
    }
    const widget = parsed.value.widgets[id];
    return widget == null
        ? {ok: false, error: `The parser dropped widget "${id}".`}
        : {ok: true, widget};
}

/**
 * A renderer with its widgets built but its images still unchecked, until
 * validateItem parses the whole item.
 */
type UnparsedRenderer = {
    content: string;
    widgets: PerseusRenderer["widgets"];
    images: Record<string, unknown>;
};

function buildRenderer(
    input: RendererInput,
    path: string,
    widgets: WidgetCatalog,
): {renderer: UnparsedRenderer; issues: Issue[]} {
    const issues: Issue[] = [];
    const widgetMap: PerseusRenderer["widgets"] = {};
    for (const widgetInput of input.widgets ?? []) {
        const widgetPath = `${path}.widgets["${widgetInput.id}"]`;
        if (widgetMap[widgetInput.id] != null) {
            issues.push({
                severity: "error",
                code: "duplicate-widget-id",
                path: widgetPath,
                message: `Two widgets have the id "${widgetInput.id}".`,
            });
            continue;
        }
        if (!widgets.isKnownType(widgetInput.type)) {
            issues.push({
                severity: "error",
                code: "unknown-widget-type",
                path: widgetPath,
                message: `"${widgetInput.type}" isn't a widget type Perseus supports. See list_widgets.`,
            });
            continue;
        }
        const built = buildWidget(widgetInput);
        if (!built.ok) {
            issues.push({
                severity: "error",
                code: "invalid-widget",
                path: widgetPath,
                message: built.error,
            });
            continue;
        }
        widgetMap[widgetInput.id] = built.widget;
    }
    return {
        renderer: {
            content: input.content,
            widgets: widgetMap,
            images: input.images ?? {},
        },
        issues,
    };
}

/**
 * Assembles an item from content and widget lists, then validates it. The
 * build succeeds only if every widget builds and the item has no errors, so
 * a draft saved from it always parses. Warnings don't block it.
 */
export function buildItem(
    input: ItemInput,
    widgets: WidgetCatalog,
): BuildResult {
    const question = buildRenderer(input.question, "question", widgets);
    const hints = (input.hints ?? []).map((hint, i) => {
        const built = buildRenderer(hint, `hints[${i}]`, widgets);
        return {
            hint: {...built.renderer, replace: hint.replace},
            issues: built.issues,
        };
    });
    const buildIssues = [
        ...question.issues,
        ...hints.flatMap((hint) => hint.issues),
    ];
    if (buildIssues.length > 0) {
        return {ok: false, issues: buildIssues};
    }

    const {valid, issues, item} = validateItem(
        {
            question: question.renderer,
            hints: hints.map(({hint}) => hint),
            answerArea: input.answerArea ?? {},
        },
        widgets,
    );
    if (!valid || item == null) {
        return {ok: false, issues};
    }
    return {ok: true, item, issues};
}
