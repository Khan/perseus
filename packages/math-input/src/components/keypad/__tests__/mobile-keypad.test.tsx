import {render, screen} from "@testing-library/react";
import * as React from "react";

import {strings} from "../../../../../../testing/mock-strings";
import MobileKeypadInternals from "../mobile-keypad-internals";

describe("mobile keypad", () => {
    it("should render keypad when active", () => {
        // Arrange
        // Act
        const {container} = render(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should not render the keypad when not active", () => {
        // Arrange
        // Act
        const {container} = render(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={false}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should render the keypad when going from keypadActive=false to keypadActive=true", () => {
        // Arrange
        const {rerender} = render(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={false}
            />,
        );

        expect(screen.queryAllByRole("button")).toHaveLength(0);

        // Act
        rerender(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Assert
        expect(screen.queryAllByRole("tab")).not.toHaveLength(0);
    });

    it("should fire an 'opened' event when activated", () => {
        // Arrange
        const onAnalyticsEvent = jest.fn();

        // Act
        render(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={onAnalyticsEvent}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Assert
        expect(onAnalyticsEvent).toHaveBeenCalledWith({
            type: "math-input:keypad-opened",
            payload: {
                virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2",
            },
        });
    });

    it("should fire an 'closed' event when dismissed", async () => {
        const onAnalyticsEvent = jest.fn();

        // Arrange
        const {rerender, unmount} = render(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={onAnalyticsEvent}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Act
        rerender(
            <MobileKeypadInternals
                locale="en"
                strings={strings}
                onAnalyticsEvent={onAnalyticsEvent}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={false}
            />,
        );
        unmount();

        // Assert
        expect(onAnalyticsEvent).toHaveBeenCalledWith({
            type: "math-input:keypad-closed",
            payload: {
                virtualKeypadVersion: "MATH_INPUT_KEYPAD_V2",
            },
        });
    });
});
