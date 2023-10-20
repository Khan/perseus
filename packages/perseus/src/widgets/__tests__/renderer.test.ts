import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {expressionItem2} from "../__testdata__/expression.testdata";
import {Expression} from "../expression";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";

describe("renderer", () => {
    beforeEach(() => {
        jest.spyOn(testDependenciesV2.analytics, "onAnalyticsEvent");
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
        jest.spyOn(Expression, "validate").mockReturnValue({
            type: "points",
            earned: 1,
            total: 1,
        });
    });

    describe("analytics", () => {
        const assertKeypadVersion = (
            apiOptions: APIOptions,
            virtualKeypadVersion: string,
        ) => {
            const {renderer} = renderQuestion(
                expressionItem2.question,
                apiOptions,
            );

            renderer.guessAndScore();

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:expression-evaluated",
                payload: {
                    // We're not interested in validating that the expression
                    // widget did anything useful or that the keypad worked. We
                    // just want to make sure the code that derives which
                    // keypad version it detected is correct.
                    result: "correct",
                    virtualKeypadVersion,
                },
            });
        };

        it("should set the virtual keypad version to REACT_NATIVE_KEYPAD when nativeKeypadProxy is provided", () => {
            assertKeypadVersion(
                {nativeKeypadProxy: jest.fn()},
                "REACT_NATIVE_KEYPAD",
            );
        });

        it("should set the virtual keypad version to MATH_INPUT_KEYPAD_V1 when customKeypad is set and useV2Keypad is unset", () => {
            assertKeypadVersion({customKeypad: true}, "MATH_INPUT_KEYPAD_V1");
        });

        it("should set the virtual keypad version to MATH_INPUT_KEYPAD_V2 when customKeypad is set and useV2Keypad is true", () => {
            assertKeypadVersion(
                {customKeypad: true, useV2Keypad: true},
                "MATH_INPUT_KEYPAD_V2",
            );
        });

        it("should default the virtual keypad version to PERSEUS_MATH_INPUT", () => {
            assertKeypadVersion(Object.freeze({}), "PERSEUS_MATH_INPUT");
        });
    });
});
