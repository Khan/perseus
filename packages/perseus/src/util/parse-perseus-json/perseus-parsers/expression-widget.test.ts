import {parseExpressionWidget} from "./expression-widget";
import {parse} from "../parse";
import {success} from "../result";

describe("parseExpressionWidget", () => {
    it("migrates v0 options to v1", () => {
        const widget = {
            "type": "expression",
            "graded": true,
            "options": {
                "value": "the value",
                "form": false,
                "simplify": false,
                "times": false,
                "buttonsVisible": "never",
                "buttonSets": [
                    "basic"
                ],
                "functions": [
                    "f",
                    "g",
                    "h"
                ],
            },
            "version": {
                "major": 0,
                "minor": 1
            }
        }

        expect(parse(widget, parseExpressionWidget)).toEqual(success({
            "type": "expression",
            "graded": true,
            static: undefined,
            key: undefined,
            "alignment": undefined,
            "options": {
                "times": false,
                ariaLabel: undefined,
                visibleLabel: undefined,
                "buttonsVisible": "never",
                "buttonSets": [
                    "basic"
                ],
                "functions": [
                    "f",
                    "g",
                    "h"
                ],
                "answerForms": [
                    {
                        considered: "correct",
                        form: false,
                        simplify: false,
                        value: "the value",
                    },
                ],
            },
            "version": {
                "major": 1,
                "minor": 0
            }
        }))
    })
})
