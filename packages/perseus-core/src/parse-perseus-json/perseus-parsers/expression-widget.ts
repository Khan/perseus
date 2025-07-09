import {KeypadKeys} from "../../keypad";
import deriveExtraKeys from "../../widgets/expression/derive-extra-keys";
import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {parseLegacyButtonSets} from "./legacy-button-sets";
import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

import type {ParsedValue} from "../parser-types";

const stringOrNumberOrNullOrUndefined = union(string)
    .or(number)
    .or(constant(null))
    .or(constant(undefined)).parser;

function numberOrNullToString(v: string | number | null | undefined) {
    return typeof v === "number" || v === null ? String(v) : v;
}

const parsePossiblyInvalidAnswerForm = object({
    // `value` is the possibly invalid part of this. It should always be a
    // string, but some answer forms don't have it. The Expression widget
    // ignores invalid values, so we can safely filter them out during parsing.
    value: optional(string),
    form: defaulted(boolean, () => false),
    simplify: defaulted(boolean, () => false),
    considered: enumeration("correct", "wrong", "ungraded"),
    key: pipeParsers(stringOrNumberOrNullOrUndefined).then(
        convert(numberOrNullToString),
    ).parser,
});

function removeInvalidAnswerForms(
    possiblyInvalid: Array<ParsedValue<typeof parsePossiblyInvalidAnswerForm>>,
) {
    return possiblyInvalid.flatMap((answerForm) => {
        const {value} = answerForm;
        if (value != null) {
            return [{...answerForm, value}];
        }
        return [];
    });
}

const parseAnswerForms = pipeParsers(
    defaulted(array(parsePossiblyInvalidAnswerForm), () => []),
).then(convert(removeInvalidAnswerForms)).parser;

const version2 = object({major: constant(2), minor: number});
const parseExpressionWidgetV2 = parseWidgetWithVersion(
    version2,
    constant("expression"),
    object({
        answerForms: parseAnswerForms,
        functions: array(string),
        times: boolean,
        visibleLabel: optional(string),
        ariaLabel: optional(string),
        buttonSets: parseLegacyButtonSets,
        buttonsVisible: optional(enumeration("always", "never", "focused")),
        extraKeys: optional(array(enumeration(...KeypadKeys))),
    }),
);

const version1 = object({major: constant(1), minor: number});
const parseExpressionWidgetV1 = parseWidgetWithVersion(
    version1,
    constant("expression"),
    object({
        answerForms: parseAnswerForms,
        functions: array(string),
        times: boolean,
        visibleLabel: optional(string),
        ariaLabel: optional(string),
        buttonSets: parseLegacyButtonSets,
        buttonsVisible: optional(enumeration("always", "never", "focused")),
    }),
);

function migrateV1ToV2(
    widget: ParsedValue<typeof parseExpressionWidgetV1>,
): ParsedValue<typeof parseExpressionWidgetV2> {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 2, minor: 0},
        options: {
            times: options.times,
            buttonSets: options.buttonSets,
            functions: options.functions,
            buttonsVisible: options.buttonsVisible,
            visibleLabel: options.visibleLabel,
            ariaLabel: options.ariaLabel,
            answerForms: options.answerForms,
            extraKeys: deriveExtraKeys(options) ?? [],
        },
    };
}

const version0 = optional(object({major: constant(0), minor: number}));
const parseExpressionWidgetV0 = parseWidgetWithVersion(
    version0,
    constant("expression"),
    object({
        functions: array(string),
        times: boolean,
        visibleLabel: optional(string),
        ariaLabel: optional(string),
        form: boolean,
        simplify: boolean,
        value: string,
        buttonSets: parseLegacyButtonSets,
        buttonsVisible: optional(enumeration("always", "never", "focused")),
    }),
);

function migrateV0ToV1(
    widget: ParsedValue<typeof parseExpressionWidgetV0>,
): ParsedValue<typeof parseExpressionWidgetV1> {
    const {options} = widget;
    return {
        ...widget,
        version: {major: 1, minor: 0},
        options: {
            times: options.times,
            buttonSets: options.buttonSets as any,
            functions: options.functions,
            buttonsVisible: options.buttonsVisible,
            visibleLabel: options.visibleLabel,
            ariaLabel: options.ariaLabel,

            answerForms: [
                {
                    considered: "correct",
                    form: options.form,
                    simplify: options.simplify,
                    value: options.value,
                },
            ],
        },
    };
}

export const parseExpressionWidget = versionedWidgetOptions(
    2,
    parseExpressionWidgetV2,
)
    .withMigrationFrom(1, parseExpressionWidgetV1, migrateV1ToV2)
    .withMigrationFrom(0, parseExpressionWidgetV0, migrateV0ToV1).parser;
