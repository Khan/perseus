// @flow
import _ from "underscore";

import NumericInput from "./numeric-input.jsx";

import type {
    PerseusNumericInputWidgetOptions,
    PerseusInputNumberWidgetOptions,
} from "../perseus-types";
import type {WidgetExports} from "../types.js";

const mapAnswerTypeToMathFormat = (
    answerType: PerseusInputNumberWidgetOptions["answerType"],
): PerseusNumericInputWidgetOptions["answers"][0]["answerForms"] => {
    // These follow what's from `answerTypes` above
    switch (answerType) {
        case "number":
            return ["integer", "decimal", "proper", "improper", "mixed"];
        case "decimal":
            return ["decimal"];
        case "integer":
            return ["integer"];
        case "rational":
            return ["integer", "proper", "improper", "mixed"];
        case "improper":
            return ["integer", "proper", "improper"];
        case "mixed":
            return ["integer", "proper", "mixed"];
        case "percent":
            return [
                "integer",
                "decimal",
                "proper",
                "improper",
                "mixed",
                "percent",
            ];
        case "pi":
            return ["pi"];
    }
};

const inputNumberToNumericInputPropUpgrades = {
    "1": (
        v0props: ?PerseusInputNumberWidgetOptions,
    ): PerseusNumericInputWidgetOptions => {
        const options = {
            answers: [
                {
                    // input-number never had any sort of message like this
                    message: "",
                    // STOPSHIP: verify this isn't "lossy" in transition
                    value: parseFloat(v0props?.value ?? 0),
                    status: "correct",
                    answerForms: mapAnswerTypeToMathFormat(v0props?.answerType),
                    strict: false,
                    maxError: 0,
                    simplify: v0props?.simplify,
                },
            ],
            // input-number never had a property to explain the input. It
            // seems the its relatively common for numeric-inputs to not
            // have a labelText either (152 as of Mar 16, 2023).
            labelText: "",
            size: v0props?.size ?? "normal",
            // input-number never supports a coefficient answer style
            coefficient: false,
            multipleNumberInput: false,
            rightAlign: v0props?.rightAlign,
            static: false,

            // The option notes on this key say it's unused except for
            // examples (which is a feature we suspect is completely
            // unused). I'm making it undefined for now.
            answerForms: undefined,
        };

        return options;
    },
};

// This widget is a special widget config that redirects old, deprecated
// `input-number` widget references to use `numeric-input`. These two widgets
// accomplish the same task and so we've removed `input-number` and now use
// `numeric-input` anywhere it's requested.
// New content will always use `numeric-input` as we've marked _this_ widget as
// hidden.
export default ({
    name: "input-number",
    displayName: "Deprecated alias for numeric-input - a Number text box",
    defaultAlignment: NumericInput.defaultAlignment,
    hidden: true,
    widget: NumericInput.widget,
    // This propUpgrades function is special because it migrates `input-number`
    // usages to `numeric-input` usages. This allows us to delete the
    // `input-number` widget but keep using all of the old content that
    // references the `input-number`.
    // We prefer `propUpgrades` over `transform` because `transform` doesn't
    // affect the rubric which is used to score the guess and that would mean
    // we are passing `input-number` options to the `numeric-input`'s
    // `validate()` function and that wouldn't work!
    propUpgrades: inputNumberToNumericInputPropUpgrades,
    isLintable: true,
    version: {major: 1, minor: 0},
}: WidgetExports<typeof NumericInput.widget>);
