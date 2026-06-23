import {
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    string,
    union,
    array,
    nullable,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";

import {versionedWidgetOptions} from "./versioned-widget-options";
import {parseWidgetWithVersion} from "./widget";

import type {ParsedValue, Parser} from "../parser-types";

const booleanToZero: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue === "boolean") {
        return ctx.success(0);
    }
    return ctx.failure("boolean", rawValue);
};

const parseMathFormat = enumeration(
    "integer",
    "mixed",
    "improper",
    "proper",
    "decimal",
    "percent",
    "pi",
);

const parseInputNumberWidgetV1 = parseWidgetWithVersion(
    object({major: constant(1), minor: number}),
    constant("input-number"),
    object({
        size: string,
        coefficient: boolean,
        labelText: optional(string),
        rightAlign: optional(boolean),
        answers: array(
            object({
                value: optional(nullable(number)),
                status: string,
                message: string,
                answerForms: optional(array(parseMathFormat)),
                strict: boolean,
                maxError: optional(nullable(number)),
                simplify: enumeration("required", "enforced", "optional"),
            }),
        ),
    }),
);

function migrateV0ToV1(
    v0: ParsedValue<typeof parseInputNumberWidgetV0>,
): ParsedValue<typeof parseInputNumberWidgetV1> {
    const v1Options = convertInputNumberOptionsToNumericInput(v0.options);
    return {
        ...v0,
        version: {major: 1, minor: 0},
        options: v1Options,
    };
}

export type PerseusInputNumberWidgetOptionsV0 = ParsedValue<
    typeof parseInputNumberWidgetV0
>["options"];

const parseInputNumberWidgetV0 = parseWidgetWithVersion(
    optional(object({major: constant(0), minor: number})),
    constant("input-number"),
    object({
        answerType: optional(
            enumeration(
                "number",
                "decimal",
                "integer",
                "rational",
                "improper",
                "mixed",
                "percent",
                "pi",
            ),
        ),
        inexact: optional(boolean),
        maxError: optional(union(number).or(string).parser),
        rightAlign: optional(boolean),
        simplify: enumeration("required", "optional", "enforced"),
        size: enumeration("normal", "small"),
        // TODO(benchristel): there are some content items where value is a
        // boolean, even though that makes no sense. We should figure out if
        // those content items are actually published anywhere, and consider
        // updating them.
        value: defaulted(
            union(number).or(string).or(booleanToZero).parser,
            () => 0,
        ),
    }),
);

function convertInputNumberOptionsToNumericInput(
    inputNumberOptions: ParsedValue<typeof parseInputNumberWidgetV0>["options"],
): ParsedValue<typeof parseInputNumberWidgetV1>["options"] {
    return {
        coefficient: false,
        rightAlign: inputNumberOptions.rightAlign,
        size: inputNumberOptions.size,
        answers: [
            {
                status: "correct",
                value: Number(inputNumberOptions.value),
                simplify: inputNumberOptions.simplify,
                message: "",
                maxError: getMaxError(inputNumberOptions),
                strict: true,
                answerForms: getAnswerForms(inputNumberOptions),
            },
        ],
    };
}

function getMaxError(
    inputNumberOptions: PerseusInputNumberWidgetOptionsV0,
): number | undefined {
    if (!inputNumberOptions.inexact) {
        return 0;
    }

    if (inputNumberOptions.maxError == null) {
        return undefined;
    }

    return Number(inputNumberOptions.maxError);
}

type AnswerType =
    | "number"
    | "decimal"
    | "integer"
    | "rational"
    | "improper"
    | "mixed"
    | "percent"
    | "pi";
type AnswerForm =
    | "integer"
    | "decimal"
    | "proper"
    | "improper"
    | "mixed"
    | "percent"
    | "pi";

const mathFormatsForAnswerType: Record<AnswerType, AnswerForm[]> = {
    number: [],
    decimal: ["decimal"],
    integer: ["integer"],
    rational: ["integer", "proper", "improper", "mixed"],
    improper: ["integer", "proper", "improper"],
    mixed: ["integer", "proper", "mixed"],
    percent: ["integer", "decimal", "proper", "improper", "mixed", "percent"],
    pi: ["pi"],
};

function getAnswerForms(
    options: PerseusInputNumberWidgetOptionsV0,
): AnswerForm[] {
    const value = Number(options.value);
    const {inexact} = options;
    const precision = 1e10;
    const rounded = Math.round(value * precision) / precision;

    const answerType = options.answerType ?? "number";
    if (answerType === "number" && !inexact && !equalFloats(rounded, value)) {
        // Disallow decimal answers when the correct answer has more than 10
        // decimal places. This is for compatibility with legacy input-number
        // behavior.
        return ["proper", "improper", "mixed"];
    }

    return mathFormatsForAnswerType[answerType];
}

function equalFloats(a: number, b: number): boolean {
    return Math.abs(a - b) < Math.pow(2, -42);
}

export const parseInputNumberWidget = versionedWidgetOptions(
    1,
    parseInputNumberWidgetV1,
).withMigrationFrom(0, parseInputNumberWidgetV0, migrateV0ToV1).parser;
