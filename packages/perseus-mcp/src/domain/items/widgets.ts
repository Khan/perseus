import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import type {SchemaIndex} from "../schema/schema-index";

/**
 * How agents should treat a widget type:
 * - "supported": fine to use.
 * - "avoid": deprecated; use only when nothing else fits.
 * - "do-not-use": not finished; items containing it get a warning.
 */
export type WidgetStatus = "supported" | "avoid" | "do-not-use";

type WidgetNotes = {status?: WidgetStatus; notes: string};

/**
 * Hand-written guidance on top of what the types say. Widgets without an
 * entry are "supported" with no extra notes.
 */
const WIDGET_NOTES: Record<string, WidgetNotes> = {
    radio: {
        notes:
            "Multiple choice. Give every choice a unique `id` and mark the " +
            "right ones with `correct: true`. Set `multipleSelect: true` when " +
            "more than one choice is correct. User input: " +
            '`{"selectedChoiceIds": ["<choice id>"]}`.',
    },
    "numeric-input": {
        notes:
            "A single number. `answers` is checked in order and the first " +
            'match decides, so list `status: "correct"` answers (and any ' +
            '"wrong" ones with feedback) carefully. `answerForms` plus ' +
            "`strict: true` restricts which formats (e.g. decimal, proper " +
            "fraction) are accepted. User input: " +
            '`{"currentValue": "3/4"}`.',
    },
    expression: {
        notes:
            "A math expression. Each entry in `answerForms` has a TeX " +
            '`value` and `considered` ("correct", "wrong" or "ungraded"); ' +
            "`form: true` requires the learner's answer to match that form, " +
            "`simplify: true` requires it to be simplified. User input is " +
            'the TeX string itself, e.g. `"2x+2"`.',
    },
    dropdown: {
        notes:
            "Choose from a list. Each choice is `{content, correct}`. User " +
            "input is the 1-based position of the chosen choice: " +
            '`{"value": 2}` (0 means nothing chosen).',
    },
    image: {
        notes:
            "Shows an image; no answer. Set `backgroundImage.url` (any https " +
            "URL) and `alt` text, unless the image is `decorative`. The " +
            "linter flags missing alt text.",
    },
    "interactive-graph": {
        notes:
            "The graphing widget to use for any graph. Its `none` graph type " +
            "shows a static, accessible graph with no interaction.",
    },
    "free-response": {
        status: "do-not-use",
        notes:
            "Not finished yet: it can't be scored (every answer scores 0 of " +
            "0). Don't use it.",
    },
    grapher: {
        status: "avoid",
        notes: "Deprecated. Use interactive-graph instead if at all possible.",
    },
    plotter: {
        status: "avoid",
        notes:
            "Deprecated and not accessible. Avoid if possible; " +
            "interactive-graph covers many uses.",
    },
    group: {
        notes: "Holds its own content and widgets (a nested renderer).",
    },
    "graded-group": {
        notes: "A nested renderer scored on its own.",
    },
    "graded-group-set": {
        notes: "A sequence of graded groups.",
    },
};

export type WidgetSummary = {
    type: string;
    status: WidgetStatus;
    accessible: boolean;
    notes?: string;
};

export type WidgetSpec = WidgetSummary & {
    /** The options a new widget starts with. */
    defaultOptions: unknown;
    /** The documented TypeScript definition of the options. */
    optionsType: string | null;
    /** The documented TypeScript definition of the user input, if any. */
    userInputType: string | null;
};

/** What this server knows about each widget type. */
export interface WidgetCatalog {
    /**
     * Every widget type Perseus currently supports, alphabetically: the types
     * in the schema's `PerseusWidgetTypes`, which is what the parser accepts.
     * (The core widget registry lacks some, such as free-response.)
     */
    types(): string[];
    isKnownType(type: string): boolean;
    status(type: string): WidgetStatus;
    summary(type: string): WidgetSummary;
    spec(type: string): WidgetSpec;
}

/**
 * Combines the schema's types with the core widget registry, which must be
 * filled first (`CoreWidgetRegistry.registerCoreWidgets()`).
 */
export function createWidgetCatalog(schema: SchemaIndex): WidgetCatalog {
    const types = schema.widgetTypes().sort();
    const status = (type: string) => WIDGET_NOTES[type]?.status ?? "supported";
    const summary = (type: string): WidgetSummary => ({
        type,
        status: status(type),
        accessible: CoreWidgetRegistry.isAccessible(
            type,
            CoreWidgetRegistry.getDefaultWidgetOptions(type),
        ),
        notes: WIDGET_NOTES[type]?.notes,
    });

    return {
        types: () => [...types],
        isKnownType: (type) => types.includes(type),
        status,
        summary,
        spec: (type) => ({
            ...summary(type),
            defaultOptions: CoreWidgetRegistry.getDefaultWidgetOptions(type),
            optionsType: schema.widgetOptionsSource(type),
            userInputType: schema.userInputSource(type),
        }),
    };
}
