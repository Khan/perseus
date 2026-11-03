import {buildWidget} from "./build";
import {validateItem} from "./validate";

import type {WidgetInput} from "./build";
import type {Issue} from "./validate";
import type {WidgetCatalog} from "./widgets";
import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

export type AddWidgetInput = Omit<WidgetInput, "id"> & {
    /** Defaults to the next free "<type> <n>" id in that content. */
    id?: string;
    /** The hint to add it to, by index; the question if omitted. */
    hint?: number;
    /**
     * Text already in the content; the placeholder goes right after its
     * first occurrence. Appended as a new paragraph if omitted.
     */
    after?: string;
};

export type AddWidgetResult =
    | {ok: true; item: PerseusItem; widgetId: string; issues: Issue[]}
    | {ok: false; issues: Issue[]};

/**
 * The next free widget id for `type`, in the `"<type> <n>"` form Perseus's
 * markdown requires (e.g. "radio 2").
 */
export function nextWidgetId(
    type: string,
    existingIds: Iterable<string>,
): string {
    const taken = new Set(existingIds);
    let n = 1;
    while (taken.has(`${type} ${n}`)) {
        n++;
    }
    return `${type} ${n}`;
}

function failure(path: string, code: string, message: string): AddWidgetResult {
    return {ok: false, issues: [{severity: "error", code, path, message}]};
}

function placeholderInserted(
    content: string,
    placeholder: string,
    after: string | undefined,
): string | null {
    if (after == null) {
        return content.trim() === ""
            ? placeholder
            : `${content.trimEnd()}\n\n${placeholder}`;
    }
    const at = content.indexOf(after);
    if (at === -1) {
        return null;
    }
    const end = at + after.length;
    return content.slice(0, end) + placeholder + content.slice(end);
}

/**
 * Adds a widget to the question or a hint: builds it from its type's defaults
 * (see buildWidget), places its placeholder in the content and validates the
 * result. The edit succeeds only if the widget builds and the item has no
 * errors. `item` itself is never changed.
 */
export function addWidget(
    item: PerseusItem,
    input: AddWidgetInput,
    widgets: WidgetCatalog,
): AddWidgetResult {
    const path = input.hint == null ? "question" : `hints[${input.hint}]`;
    const renderer: PerseusRenderer | undefined =
        input.hint == null ? item.question : item.hints[input.hint];
    if (renderer == null) {
        return failure(
            path,
            "no-such-hint",
            `The item has ${item.hints.length} hints, so there's no ${path}.`,
        );
    }
    if (!widgets.isKnownType(input.type)) {
        return failure(
            path,
            "unknown-widget-type",
            `"${input.type}" isn't a widget type Perseus supports. See list_widgets.`,
        );
    }

    const widgetId =
        input.id ?? nextWidgetId(input.type, Object.keys(renderer.widgets));
    const widgetPath = `${path}.widgets["${widgetId}"]`;
    if (renderer.widgets[widgetId] != null) {
        return failure(
            widgetPath,
            "duplicate-widget-id",
            `There's already a widget "${widgetId}".`,
        );
    }
    const built = buildWidget({...input, id: widgetId});
    if (!built.ok) {
        return failure(widgetPath, "invalid-widget", built.error);
    }
    const content = placeholderInserted(
        renderer.content,
        `[[☃ ${widgetId}]]`,
        input.after,
    );
    if (content == null) {
        return failure(
            `${path}.content`,
            "after-text-not-found",
            `The content doesn't contain ${JSON.stringify(input.after)}.`,
        );
    }

    const changed: PerseusRenderer = {
        ...renderer,
        content,
        widgets: {...renderer.widgets, [widgetId]: built.widget},
    };
    const {
        valid,
        issues,
        item: migrated,
    } = validateItem(
        input.hint == null
            ? {...item, question: changed}
            : {
                  ...item,
                  hints: item.hints.map((hint, i) =>
                      i === input.hint ? {...hint, ...changed} : hint,
                  ),
              },
        widgets,
    );
    if (!valid || migrated == null) {
        return {ok: false, issues};
    }
    return {ok: true, item: migrated, widgetId, issues};
}
