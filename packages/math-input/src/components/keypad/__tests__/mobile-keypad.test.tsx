import {render, screen} from "@testing-library/react";
import * as React from "react";

import MobileKeypadInternals from "../mobile-keypad-internals";

describe("mobile keypad", () => {
    it("should render keypad when active", () => {
        // Arrange
        // Act
        const {container} = render(
            <MobileKeypadInternals
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
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={false}
            />,
        );

        expect(screen.queryAllByRole("button")).toHaveLength(0);

        // Act
        rerender(
            <MobileKeypadInternals
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Assert
        expect(screen.queryAllByRole("button")).not.toHaveLength(0);
    });

    it("should fire an 'opened' event when activated", () => {
        // Arrange
        const onAnalyticsEvent = jest.fn();

        // Act
        render(
            <MobileKeypadInternals
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
                onAnalyticsEvent={onAnalyticsEvent}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Act
        rerender(
            <MobileKeypadInternals
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
