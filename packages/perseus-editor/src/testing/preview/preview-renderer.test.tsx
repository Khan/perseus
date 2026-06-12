import {Dependencies} from "@khanacademy/perseus";
import {
    generateExpressionWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import {testDependencies} from "../test-dependencies";

import {PreviewRenderer} from "./preview-renderer";

import type {PreviewContent} from "../../preview/message-types";
import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// The expression widget renders its mobile (keypad) input when
// `apiOptions.customKeypad` is set, which is what the editor preview does when
// the "Mobile Viewport" toggle is on.
const mobileApiOptions: APIOptions = {
    isMobile: true,
    customKeypad: true,
};

const itemWithExpression: PerseusItem = generateTestPerseusItem({
    question: generateTestPerseusRenderer({
        content: "[[☃ expression 1]]",
        widgets: {
            "expression 1": generateExpressionWidget(),
        },
    }),
});

function questionData(item: PerseusItem): PreviewContent {
    return {
        type: "question",
        data: {
            item,
            apiOptions: mobileApiOptions,
            initialHintsVisible: 0,
            device: "phone",
            linterContext: {contentType: "exercise", highlightLint: false},
            reviewMode: true,
        },
    };
}

describe("PreviewRenderer (mobile keypad)", () => {
    let originalFrameElement: Element | null;
    let userEvent: UserEvent;

    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // The preview reads `isMobile` from the iframe's data attribute. In
        // tests there's no real iframe, so we stub `window.frameElement`.
        originalFrameElement = window.frameElement;
        Object.defineProperty(window, "frameElement", {
            configurable: true,
            value: {dataset: {mobile: "true"}},
        });
    });

    afterEach(() => {
        Object.defineProperty(window, "frameElement", {
            configurable: true,
            value: originalFrameElement,
        });
        // The Renderer uses a timer to wait for widgets to finish rendering.
        act(() => jest.runOnlyPendingTimers());
    });

    it("enters keypad button presses into the focused math input", async () => {
        // Arrange
        render(
            <RenderStateRoot>
                <PreviewRenderer data={questionData(itemWithExpression)} />
            </RenderStateRoot>,
        );
        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        // Act: focus the input to open the keypad, then press a key. This is
        // the exact flow that was broken in LEMS-3899 — the keypad rendered
        // but presses never reached the input because it was handed a null
        // keypadElement from the default (no-op) context.
        fireEvent.touchStart(input);
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );
        await userEvent.click(screen.getByRole("button", {name: "1"}));

        // Assert: the pressed key appears in the MathQuill input.
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access, no-restricted-syntax
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        expect(within(mathquillInput).getByText("1")).toBeVisible();
    });
});
