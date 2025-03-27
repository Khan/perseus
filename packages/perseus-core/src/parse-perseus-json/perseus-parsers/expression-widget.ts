import type {
    ExpressionWidget,
    PerseusExpressionAnswerForm,
} from "../../data-schema";
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
import type {ParsedValue, Parser} from "../parser-types";
import {parseLegacyButtonSets} from "./legacy-button-sets";
import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

const stringOrNumberOrNullOrUndefined = union(string)
    .or(number)
    .or(constant(null))
    .or(constant(undefined)).parser;

const parsePossiblyInvalidAnswerForm = object({
    // `value` is the possibly invalid part of this. It should always be a
    // string, but some answer forms don't have it. The Expression widget
    // ignores invalid values, so we can safely filter them out during parsing.
    value: optional(string),
    form: defaulted(boolean, () => false),
    simplify: defaulted(boolean, () => false),
    considered: enumeration("correct", "wrong", "ungraded"),
    key: pipeParsers(stringOrNumberOrNullOrUndefined).then(convert(String))
        .parser,
});

function removeInvalidAnswerForms(
    possiblyInvalid: Array<ParsedValue<typeof parsePossiblyInvalidAnswerForm>>,
): PerseusExpressionAnswerForm[] {
    const valid: PerseusExpressionAnswerForm[] = [];
    for (const answerForm of possiblyInvalid) {
        const {value} = answerForm;
        if (value != null) {
            // Copying the object seems to be needed to make TypeScript happy
            valid.push({...answerForm, value});
        }
    }
    return valid;
}

const version2 = object({major: constant(2), minor: number});
const parseExpressionWidgetV2: Parser<ExpressionWidget> =
    parseWidgetWithVersion(
        version2,
        constant("expression"),
        object({
            answerForms: pipeParsers(
                array(parsePossiblyInvalidAnswerForm),
            ).then(convert(removeInvalidAnswerForms)).parser,
            functions: array(string),
            times: boolean,
            visibleLabel: optional(string),
            ariaLabel: optional(string),
            buttonSets: parseLegacyButtonSets,
            buttonsVisible: optional(enumeration("always", "never", "focused")),
            extraKeys: array(enumeration(...KeypadKeys)),
        }),
    );

const version1 = object({major: constant(1), minor: number});
const parseExpressionWidgetV1 = parseWidgetWithVersion(
    version1,
    constant("expression"),
    object({
        answerForms: pipeParsers(array(parsePossiblyInvalidAnswerForm)).then(
            convert(removeInvalidAnswerForms),
        ).parser,
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
): ExpressionWidget {
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
            extraKeys: deriveExtraKeys(options),
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

export const parseExpressionWidget: Parser<ExpressionWidget> =
    versionedWidgetOptions(2, parseExpressionWidgetV2)
        .withMigrationFrom(1, parseExpressionWidgetV1, migrateV1ToV2)
        .withMigrationFrom(0, parseExpressionWidgetV0, migrateV0ToV1).parser;
