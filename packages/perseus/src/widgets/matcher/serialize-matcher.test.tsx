import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {act} from "@testing-library/react";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {renderQuestion} from "../../__tests__/test-utils";
import * as Dependencies from "../../dependencies";
import {registerAllWidgetsForTesting} from "../../util/register-all-widgets-for-testing";

import type {Matcher} from "./matcher";
import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * [LEMS-3185] These are tests for the legacy Serialization API.
 *
 * This API is not built in a way that supports migrating data
 * between versions of Perseus JSON. In fact serialization
 * doesn't use WidgetOptions, but RenderProps; it's leveraging
 * what is considered an internal implementation detail to support
 * rehydrating previous state.
 *
 * The API is very fragile and likely broken. We have a ticket to remove it.
 * However we don't have the bandwidth to implement an alternative right now,
 * so I'm adding tests to make sure we're roughly still able to support
 * what little we've been supporting so far.
 *
 * This API needs to be removed and these tests need to be removed with it.
 */
describe("Matcher serialization", () => {
    function generateBasicMatcher(): PerseusItem {
        const question = generateTestPerseusRenderer({
            content: "[[☃ matcher 1]]",
            widgets: {
                "matcher 1": {
                    type: "matcher",
                    options: {
                        labels: ["English", "Spanish"],
                        padding: true,
                        orderMatters: false,
                        right: ["One", "Two", "Three"],
                        left: ["Uno", "Dos", "Tres"],
                    },
                },
            },
        });
        const item = generateTestPerseusItem({question});
        return item;
    }

    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    beforeEach(() => {
        jest.useRealTimers();

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue({
            ...testDependencies,
            TeX: ({
                children,
                onRender: onLoad,
            }: {
                children: React.ReactNode;
                onRender?: () => unknown;
            }) => {
                React.useLayoutEffect(() => {
                    onLoad?.();
                }, [onLoad]);
                return <span className="tex-mock">{children}</span>;
            },
        });
    });

    it("should serialize the current state", async () => {
        // Arrange
        const {renderer} = renderQuestion(
            generateBasicMatcher(),
            {},
            {startAnswerless: false},
        );

        const matcher: Matcher =
            renderer.questionRenderer.findWidgets("matcher 1")[0];
        act(() => {
            // these don't seem to do anything
            // but I think they're supposed to?
            // seems like Matcher isn't serializing user input...
            matcher.moveLeftOptionToIndex("Dos", 2);
            matcher.moveRightOptionToIndex("Two", 0);
        });

        // Act
        const state = renderer.getSerializedState();

        // Assert
        expect(state).toEqual({
            question: {
                "matcher 1": {
                    left: ["Uno", "Dos", "Tres"],
                    right: ["One", "Two", "Three"],
                    labels: ["English", "Spanish"],
                    orderMatters: false,
                    padding: true,
                },
            },
            hints: [],
        });
    });

    it("should restore serialized state", () => {
        // Arrange
        const {renderer} = renderQuestion(generateBasicMatcher());

        // Act
        act(() =>
            renderer.restoreSerializedState({
                question: {
                    "matcher 1": {
                        left: ["Uno", "Dos", "Tres"],
                        right: ["One", "Two", "Three"],
                        labels: ["English", "Spanish"],
                        orderMatters: false,
                        padding: true,
                    },
                },
                hints: [],
            }),
        );

        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toEqual({
            "matcher 1": {
                left: ["Uno", "Dos", "Tres"],
                right: ["One", "Two", "Three"],
            },
        });
    });
});
