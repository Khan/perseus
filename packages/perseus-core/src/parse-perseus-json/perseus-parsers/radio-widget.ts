import {deriveNumCorrect} from "../../widgets/radio/derive-num-correct";
import {
    any,
    array,
    arrayWithIndex,
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
        choices: [
            {content: "", id: generateChoiceId(0)},
            {content: "", id: generateChoiceId(1)},
            {content: "", id: generateChoiceId(2)},
            {content: "", id: generateChoiceId(3)},
        ],
    };
}

const parseOnePerLine = defaulted(optional(boolean), () => undefined);
const parseNoneOfTheAbove = defaulted(
    optional(constant(false)),
    () => undefined,
);

function generateChoiceId(index: number): string {
    return `radio-choice-${index}`;
}

const version3 = optional(object({major: constant(3), minor: number}));
const parseRadioWidgetV3 = parseWidgetWithVersion(
    version3,
    constant("radio"),
    object({
        numCorrect: optional(number),
        choices: arrayWithIndex((index) =>
            object({
                content: defaulted(string, () => ""),
                rationale: optional(string),
                correct: optional(boolean),
                isNoneOfTheAbove: optional(boolean),
                id: (rawValue, ctx) => {
                    console.log(`🔧 Parsing choice ${index} ID:`, rawValue);
                    const result = defaulted(string, () => generateChoiceId(index))(rawValue, ctx);
                    console.log(`✅ Choice ${index} ID result:`, result);
                    return result;
                },
            }),
        ),
        hasNoneOfTheAbove: optional(boolean),
        countChoices: optional(boolean),
        randomize: optional(boolean),
        multipleSelect: optional(boolean),
        deselectEnabled: optional(boolean),
    }),
);

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
            onePerLine: parseOnePerLine,
            // deprecated
            displayCount: optional(any),
            // v0 props
            // `noneOfTheAbove` is still in use (but only set to `false`).
            noneOfTheAbove: parseNoneOfTheAbove,
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
            onePerLine: parseOnePerLine,
            // deprecated
            displayCount: optional(any),
            // v0 props
            // `noneOfTheAbove` is still in use (but only set to `false`).
            noneOfTheAbove: parseNoneOfTheAbove,
        }),
        getDefaultOptions,
    ),
);

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
            onePerLine: parseOnePerLine,
            // deprecated
            displayCount: optional(any),
            // v0 props
            // `noneOfTheAbove` is still in use (but only set to `false`).
            noneOfTheAbove: parseNoneOfTheAbove,
        }),
        getDefaultOptions,
    ),
);

// migrate functions
export function migrateV2toV3(
    widget: ParsedValue<typeof parseRadioWidgetV2>,
): ParsedValue<typeof parseRadioWidgetV3> {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 3, minor: 0},
        options: {
            numCorrect: options.numCorrect,
            hasNoneOfTheAbove: options.hasNoneOfTheAbove,
            countChoices: options.countChoices,
            randomize: options.randomize,
            multipleSelect: options.multipleSelect,
            deselectEnabled: options.deselectEnabled,
            choices: options.choices.map((choice, index) => ({
                content: choice.content,
                rationale: choice.clue,
                correct: choice.correct,
                isNoneOfTheAbove: choice.isNoneOfTheAbove,
                id: generateChoiceId(index),
            })),
        },
    };
}

export function migrateV1ToV2(
    widget: ParsedValue<typeof parseRadioWidgetV1>,
): ParsedValue<typeof parseRadioWidgetV2> {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 2, minor: 0},
        options: {
            ...options,
            numCorrect: deriveNumCorrect(options.choices),
        },
    };
}

export function migrateV0ToV1(
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

export const parseRadioWidget = versionedWidgetOptions(3, parseRadioWidgetV3)
    .withMigrationFrom(2, parseRadioWidgetV2, migrateV2toV3)
    .withMigrationFrom(1, parseRadioWidgetV1, migrateV1ToV2)
    .withMigrationFrom(0, parseRadioWidgetV0, migrateV0ToV1).parser;
