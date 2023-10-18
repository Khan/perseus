import {render, screen} from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom";

import MobileKeypad from "../mobile-keypad";

describe("mobile keypad", () => {
    it("should render keypad when active", () => {
        // Arrange
        // Act
        const {container} = render(
            <MobileKeypad
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
            <MobileKeypad
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
            <MobileKeypad
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={false}
            />,
        );

        expect(screen.queryAllByRole("button")).toHaveLength(0);

        // Act
        rerender(
            <MobileKeypad
                onAnalyticsEvent={async () => undefined}
                setKeypadActive={(keypadActive: boolean) => undefined}
                keypadActive={true}
            />,
        );

        // Assert
        expect(screen.queryAllByRole("tab")).not.toHaveLength(0);
    });
});
