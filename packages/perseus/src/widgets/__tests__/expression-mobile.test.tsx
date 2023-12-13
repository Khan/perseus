import "@testing-library/jest-dom";
import {
    KeypadContext,
    StatefulKeypadContextProvider,
    MobileKeypad,
} from "@khanacademy/math-input";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MathQuill from "mathquill";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import WrappedServerItemRenderer from "../../server-item-renderer";
import {registerWidget} from "../../widgets";
import {expressionItem2} from "../__testdata__/expression.testdata";
import ExpressionExport from "../expression";

const MQ = MathQuill.getInterface(2);

function RendererWithContext({item}) {
    return (
        <KeypadContext.Consumer>
            {({keypadElement}) => {
                return (
                    <WrappedServerItemRenderer
                        apiOptions={{
                            isMobile: true,
                            customKeypad: true,
                        }}
                        item={item}
                        problemNum={0}
                        reviewMode={false}
                        dependencies={testDependenciesV2}
                        keypadElement={keypadElement}
                    />
                );
            }}
        </KeypadContext.Consumer>
    );
}

function KeypadWithContext() {
    return (
        <KeypadContext.Consumer>
            {({setKeypadElement}) => {
                return (
                    <MobileKeypad
                        onElementMounted={setKeypadElement}
                        onDismiss={() => {}}
                        onAnalyticsEvent={async () => {}}
                    />
                );
            }}
        </KeypadContext.Consumer>
    );
}

function ConnectedRenderer({item = expressionItem2}) {
    return (
        <RenderStateRoot>
            <StatefulKeypadContextProvider>
                <RendererWithContext item={item} />
                <KeypadWithContext />
            </StatefulKeypadContextProvider>
        </RenderStateRoot>
    );
}

describe("expression mobile", () => {
    beforeAll(() => {
        registerWidget("expression", ExpressionExport);
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        // The Renderer uses a timer to wait for widgets to complete rendering.
        // If we don't spin the timers here, then the timer fires in the test
        // _after_ and breaks it because we do setState() in the callback,
        // and by that point the component has been unmounted.
        jest.runOnlyPendingTimers();
    });

    it("renders input", () => {
        render(<ConnectedRenderer />);

        expect(
            screen.getByLabelText(
                "Math input box Tap with one or two fingers to open keyboard",
            ),
        ).toBeInTheDocument();
    });

    it("shows the keypad after input interaction", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );
    });

    it("shows keypad after focused input interaction", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("tab", {name: "Dismiss"}));

        // wait for the keypad to close
        await waitFor(() =>
            expect(screen.queryByRole("button", {name: "1"})).toBeNull(),
        );

        fireEvent.touchStart(input);

        // confirm that the keypad has reopened
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );
    });

    it("is possible to use the keypad", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("button", {name: "1"}));

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        const span1 = within(mathquillInput).getByText("1");

        expect(span1).toBeVisible();
    });

    it("is possible to type many numbers", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        const testNumbers = [8, 6, 7, 5, 3, 0, 9];
        testNumbers.forEach((num) => {
            userEvent.click(screen.getByRole("button", {name: `${num}`}));
        });

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;

        testNumbers.forEach((num) => {
            const span = within(mathquillInput).getByText(`${num}`);

            expect(span).toBeVisible();
        });
    });

    it("can handle symbols", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("button", {name: "4"}));
        userEvent.click(screen.getByRole("button", {name: "2"}));
        userEvent.click(screen.getByRole("button", {name: "Percent"}));

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        const span4 = within(mathquillInput).getByText("4");
        const span2 = within(mathquillInput).getByText("2");
        const spanPercent = within(mathquillInput).getByText("%");

        expect(span4).toBeVisible();
        expect(span2).toBeVisible();
        expect(spanPercent).toBeVisible();
    });

    it("can do arithmetic", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("button", {name: "4"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));
        userEvent.click(screen.getByRole("button", {name: "2"}));

        // MathQuill is problematic,
        // this is the only way I know how to test the "input"
        const mathquillInput =
            // eslint-disable-next-line testing-library/no-node-access
            document.getElementsByClassName("mq-root-block")[0] as HTMLElement;
        const span4 = within(mathquillInput).getByText("4");
        const spanPlus = within(mathquillInput).getByText("+");
        const span2 = within(mathquillInput).getByText("2");

        expect(span4).toBeVisible();
        expect(spanPlus).toBeVisible();
        expect(span2).toBeVisible();
    });

    it("can navigate to operators page", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        expect(screen.getByRole("button", {name: "Equals sign"})).toBeVisible();
    });

    it("can navigate to geometry page", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("tab", {name: "Geometry"}));
        expect(screen.getByRole("button", {name: "Sine"})).toBeVisible();
    });

    it("can navigate to extras page", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        expect(screen.getByRole("button", {name: "x"})).toBeVisible();
    });

    it("can write a full equation", async () => {
        render(<ConnectedRenderer />);

        const input = screen.getByLabelText(
            "Math input box Tap with one or two fingers to open keyboard",
        );

        fireEvent.touchStart(input);

        // waiting because `visibility` is animated
        await waitFor(() =>
            expect(screen.getByRole("button", {name: "1"})).toBeVisible(),
        );

        userEvent.click(screen.getByRole("tab", {name: "Extras"}));
        userEvent.click(screen.getByRole("button", {name: "x"}));
        userEvent.click(screen.getByRole("tab", {name: "Operators"}));
        userEvent.click(screen.getByRole("button", {name: "Equals sign"}));
        userEvent.click(screen.getByRole("tab", {name: "Geometry"}));
        userEvent.click(screen.getByRole("button", {name: "Sine"}));
        userEvent.click(screen.getByRole("tab", {name: "Numbers"}));
        userEvent.click(screen.getByRole("button", {name: "9"}));

        // MathQuill is problematic,
        // this is how to get the value of the input directly from MQ
        const mathquillInstance =
            // eslint-disable-next-line testing-library/no-node-access
            MQ(document.getElementsByClassName("mq-editable-field")[0]);

        expect(mathquillInstance.latex()).toBe("x=\\sin\\left(9\\right)");
    });
});
