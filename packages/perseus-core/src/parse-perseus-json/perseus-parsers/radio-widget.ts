import {deriveNumCorrect} from "../../widgets/radio/derive-num-correct";
import {
    any,
    array,
    boolean,
    constant,
    number,
    object,
    optional,
    string,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";
import {parseWidgetsMap} from "./widgets-map";

import type {ParsedValue} from "../parser-types";

const parseWidgetsMapOrUndefined = defaulted(
    // There is an import cycle between radio-widget.ts and
    // widgets-map.ts. The anonymous function below ensures that we
    // don't refer to parseWidgetsMap before it's defined.
    optional((rawVal, ctx) => parseWidgetsMap(rawVal, ctx)),
    () => undefined,
);

function getDefaultOptions() {
    // See parse-perseus-json/README.md for why we want these defaults here.
    return {
        choices: [{content: ""}, {content: ""}, {content: ""}, {content: ""}],
    };
}

const version2 = optional(object({major: constant(2), minor: number}));
const parseRadioWidgetV2 = parseWidgetWithVersion(
    version2,
    constant("radio"),
    defaulted(
        object({
            numCorrect: optional(number),
            choices: array(
                object({
                    content: defaulted(string, () => ""),
                    clue: optional(string),
                    correct: optional(boolean),
                    isNoneOfTheAbove: optional(boolean),
                    // deprecated
                    widgets: parseWidgetsMapOrUndefined,
                }),
            ),
            hasNoneOfTheAbove: optional(boolean),
            countChoices: optional(boolean),
            randomize: optional(boolean),
            multipleSelect: optional(boolean),
            deselectEnabled: optional(boolean),
            // deprecated
            onePerLine: optional(boolean),
            // deprecated
            displayCount: optional(any),
            // v0 props
            // `noneOfTheAbove` is still in use (but only set to `false`).
            noneOfTheAbove: optional(constant(false)),
        }),
        getDefaultOptions,
    ),
);

const version1 = optional(object({major: constant(1), minor: number}));
const parseRadioWidgetV1 = parseWidgetWithVersion(
    version1,
    constant("radio"),
    defaulted(
        object({
            choices: array(
                object({
                    content: defaulted(string, () => ""),
                    clue: optional(string),
                    correct: optional(boolean),
                    isNoneOfTheAbove: optional(boolean),
                    // deprecated
                    widgets: parseWidgetsMapOrUndefined,
                }),
            ),
            hasNoneOfTheAbove: optional(boolean),
            countChoices: optional(boolean),
            randomize: optional(boolean),
            multipleSelect: optional(boolean),
            deselectEnabled: optional(boolean),
            // deprecated
            onePerLine: optional(boolean),
            // deprecated
            displayCount: optional(any),
            // v0 props
            // `noneOfTheAbove` is still in use (but only set to `false`).
            noneOfTheAbove: optional(constant(false)),
        }),
        getDefaultOptions,
    ),
);

function migrateV1ToV2(
    widget: ParsedValue<typeof parseRadioWidgetV1>,
): ParsedValue<typeof parseRadioWidgetV2> {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 2, minor: 0},
        options: {
            ...options,
            numCorrect: deriveNumCorrect(options),
        },
    };
}

const version0 = optional(object({major: constant(0), minor: number}));
const parseRadioWidgetV0 = parseWidgetWithVersion(
    version0,
    constant("radio"),
    defaulted(
        object({
            choices: array(
                object({
                    content: defaulted(string, () => ""),
                    clue: optional(string),
                    correct: optional(boolean),
                    isNoneOfTheAbove: optional(boolean),
                    // deprecated
                    widgets: parseWidgetsMapOrUndefined,
                }),
            ),
            hasNoneOfTheAbove: optional(boolean),
            countChoices: optional(boolean),
            randomize: optional(boolean),
            multipleSelect: optional(boolean),
            deselectEnabled: optional(boolean),
            // deprecated
            onePerLine: optional(boolean),
            // deprecated
            displayCount: optional(any),
            // v0 props
            // `noneOfTheAbove` is still in use (but only set to `false`).
            noneOfTheAbove: optional(constant(false)),
        }),
        getDefaultOptions,
    ),
);

function migrateV0ToV1(
    widget: ParsedValue<typeof parseRadioWidgetV0>,
): ParsedValue<typeof parseRadioWidgetV1> {
    const {options} = widget;
    const {noneOfTheAbove: _, ...rest} = options;
    return {
        ...widget,
        version: {major: 1, minor: 0},
        options: {
            ...rest,
            hasNoneOfTheAbove: false,
            noneOfTheAbove: undefined,
        },
    };
}

export const parseRadioWidget = versionedWidgetOptions(2, parseRadioWidgetV2)
    .withMigrationFrom(1, parseRadioWidgetV1, migrateV1ToV2)
    .withMigrationFrom(0, parseRadioWidgetV0, migrateV0ToV1).parser;
