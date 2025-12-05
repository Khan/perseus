import {
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
} from "../../utils/generators/expression-widget-generator";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseExpressionWidget} from "./expression-widget";

describe("parseExpressionWidget", () => {
    it("migrates v1 options to v2", () => {
        const widget = generateExpressionWidget({
            options: generateExpressionOptions({
                buttonsVisible: "never",
                answerForms: [
                    generateExpressionAnswerForm({
                        considered: "correct",
                        form: true,
                        value: "88x",
                        key: "undefined",
                    }),
                ],
            }),
            version: {
                major: 1,
                minor: 0,
            },
            alignment: undefined,
            key: undefined,
            static: undefined,
        });

        expect(parse(widget, parseExpressionWidget)).toEqual(
            success(
                generateExpressionWidget({
                    static: undefined,
                    alignment: undefined,
                    key: undefined,
                    options: generateExpressionOptions({
                        buttonsVisible: "never",
                        extraKeys: ["x"],
                        answerForms: [
                            generateExpressionAnswerForm({
                                considered: "correct",
                                form: true,
                                value: "88x",
                                key: "undefined",
                            }),
                        ],
                    }),
                    version: {
                        major: 2,
                        minor: 0,
                    },
                }),
            ),
        );
    });

    it("migrates v0 options to v2", () => {
        const widget = {
            type: "expression",
            graded: true,
            options: {
                value: "88x",
                form: true,
                simplify: false,
                times: false,
                buttonsVisible: "never",
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
            },
            version: {
                major: 0,
                minor: 1,
            },
        };

        expect(parse(widget, parseExpressionWidget)).toEqual(
            success({
                type: "expression",
                graded: true,
                static: undefined,
                key: undefined,
                alignment: undefined,
                options: {
                    times: false,
                    ariaLabel: undefined,
                    visibleLabel: undefined,
                    buttonsVisible: "never",
                    buttonSets: ["basic"],
                    functions: ["f", "g", "h"],
                    extraKeys: ["x"],
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            simplify: false,
                            value: "88x",
                        },
                    ],
                },
                version: {
                    major: 2,
                    minor: 0,
                },
            }),
        );
    });

    it("rejects a widget with unrecognized version", () => {
        const widget = generateExpressionWidget({
            version: {
                major: -1,
                minor: 0,
            },
        });

        expect(parse(widget, parseExpressionWidget)).toEqual(
            failure(
                expect.stringContaining(
                    "At (root) -- expected widget options with a known version number",
                ),
            ),
        );
    });
});
