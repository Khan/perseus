import {Dependencies, Util} from "@khanacademy/perseus";
import {render, screen, waitFor, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import InteractiveGraphSettings from "../interactive-graph-settings";

import type {UserEvent} from "@testing-library/user-event";

import "@testing-library/jest-dom"; // Imports custom matchers

function userEventForFakeTimers() {
    return userEventLib.setup({
        advanceTimers: jest.advanceTimersByTime,
    });
}

function userEventForRealTimers() {
    return userEventLib.setup({
        advanceTimers: () => {},
    });
}

describe("InteractiveGraphSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventForFakeTimers();
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("common graph settings are shown, by default", async () => {
        // Arrange
        // Act
        render(<InteractiveGraphSettings onChange={() => {}} />);

        // Assert
        expect(screen.getByText("x Label")).toBeVisible();
    });

    test("hides common graph settings when heading clicked", async () => {
        // Arrange
        render(<InteractiveGraphSettings onChange={() => {}} />);

        // Act
        await userEvent.click(screen.getByText("Common Graph Settings"));

        // Assert
        expect(screen.queryByText("x Label")).not.toBeInTheDocument();
    });

    test("shows common graph settings when heading clicked a second time", async () => {
        // Arrange
        render(<InteractiveGraphSettings onChange={() => {}} />);
        await userEvent.click(screen.getByText("Common Graph Settings"));

        // Act
        await userEvent.click(screen.getByText("Common Graph Settings"));

        // Assert
        expect(screen.getByText("x Label")).toBeVisible();
    });

    test("displays graph, snap, image, and measure settings when common settings shown", async () => {
        // Arrange
        // Act
        render(<InteractiveGraphSettings onChange={() => {}} />);

        // Assert
        expect(screen.getByText("x Label")).toBeInTheDocument();
        expect(screen.getByText("y Label")).toBeInTheDocument();
        expect(screen.getByText("Markings:")).toBeInTheDocument();
        expect(screen.getByText("Snap Step")).toBeInTheDocument();
        expect(screen.getByText("Background image URL:")).toBeInTheDocument();
        expect(screen.getByText("Show protractor")).toBeInTheDocument();
    });

    test("calls onChange when markings are changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const button = screen.getByRole("button", {name: "Grid"});
        await userEvent.click(button);

        // Assert
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({markings: "grid"}),
            undefined,
        );
    });

    test("calls onChange when background image is changed", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        const mockGetImageSize = (url, cb: (width, height) => void) => {
            cb(100, 100);
        };
        jest.spyOn(Util, "getImageSize").mockImplementation(mockGetImageSize);

        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {
            name: "Background image URL:",
        });
        await userEvent.type(input, "https://example.com/image.png");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    backgroundImage: expect.objectContaining({
                        url: "https://example.com/image.png",
                    }),
                }),
                undefined,
            ),
        );
    });

    test("validates background image size", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        const mockGetImageSize = (url, cb: (width, height) => void) => {
            // Large image should be invalid
            cb(1000, 1000);
        };
        jest.spyOn(Util, "getImageSize").mockImplementation(mockGetImageSize);

        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {
            name: "Background image URL:",
        });
        await userEvent.type(input, "https://example.com/image.png");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    valid: "Image must be smaller than 450px x 450px.",
                }),
                undefined,
            ),
        );
    });

    test("calls onChange with null background image if background image input is empty", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        const mockGetImageSize = (url, cb: (width, height) => void) => {};
        jest.spyOn(Util, "getImageSize").mockImplementation(mockGetImageSize);

        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {
            name: "Background image URL:",
        });
        await userEvent.clear(input);
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    backgroundImage: expect.objectContaining({
                        url: null,
                    }),
                }),
                undefined,
            ),
        );
    });

    test("does not update background image until input is blurred", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();

        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {
            name: "Background image URL:",
        });
        input.focus();
        // Disabling this because we need to test keypress events that are
        // unfortunately being used in legacy code.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyPress(input, {key: "a", code: "KeyA", charCode: 97});

        // Assert
        expect(onChange).not.toHaveBeenCalled();
    });

    test("displays a11y warning banner when protractor enabled", () => {
        // Arrange
        render(
            <InteractiveGraphSettings
                showProtractor
                onChange={() => undefined}
            />,
        );

        // Act
        const banner = screen.getByRole("alert");

        // Assert
        expect(banner).toHaveTextContent(/The protractor is not accessible/);
    });

    test("hides a11y warning banner when protractor disabled", () => {
        // Arrange
        const {rerender} = render(
            <InteractiveGraphSettings
                showProtractor
                onChange={() => undefined}
            />,
        );

        // Act
        rerender(<InteractiveGraphSettings onChange={() => undefined} />);

        // Assert
        const banner = screen.queryByRole("alert");
        expect(banner).not.toBeInTheDocument();
    });

    test("calls onChange when protractor label is changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <InteractiveGraphSettings
                showProtractor={true}
                onChange={onChange}
            />,
        );

        // Act
        const checkbox = screen.getByRole("checkbox", {
            name: "Show protractor",
        });
        await userEvent.click(checkbox);

        // Assert
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({showProtractor: false}),
            undefined,
        );
    });

    test("Calls onChange when x range is changed and valid", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        // Note: The textbox's `name` attribute is "x Range 10" because it's
        // encased in a <label> element, which applies everything surrounding
        // the first element to the first element's label. This means it
        // includes the "10" from the second textbox. Same for the other
        // RangeInput tests below.
        const input = screen.getByRole("textbox", {name: "x Range 10"});
        await userEvent.clear(input);
        await userEvent.type(input, "0");

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    range: [
                        [0, 10],
                        [-10, 10],
                    ],
                    valid: true,
                }),
                undefined,
            ),
        );
    });

    test("Calls onChange when y range is changed and valid", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "y Range 10"});
        await userEvent.clear(input);
        await userEvent.type(input, "0");

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    range: [
                        [-10, 10],
                        [0, 10],
                    ],
                    valid: true,
                }),
                undefined,
            ),
        );
    });

    test("validates range input when left is bigger than right", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "x Range 10"});
        await userEvent.clear(input);
        await userEvent.type(input, "20");

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    valid: "Range must have a higher number on the right",
                }),
                undefined,
            ),
        );
    });

    test("Calls onChange when step value is changed and valid", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "Tick Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "2");

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    step: [2, 1],
                    valid: true,
                }),
                undefined,
            ),
        );
    });

    test("validates step value when tick step is too large", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "Tick Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "20");

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    step: [1, 1],
                    valid: "Step is too large, there must be at least 3 ticks.",
                }),
                undefined,
            ),
        );
    });

    test("validates step value when tick step is too small", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(
            <InteractiveGraphSettings
                range={[
                    [-100, 100],
                    [-100, 100],
                ]}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Tick Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "2");

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    step: [1, 1],
                    valid: "Step is too small, there can be at most 20 ticks.",
                }),
                undefined,
            ),
        );
    });

    test("Calls onChange when snap step is changed and valid", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "Snap Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "2");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    snapStep: [2, 1],
                    valid: true,
                }),
                undefined,
            ),
        );
    });

    test("validates when the snap step is too large", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "Snap Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "100");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    snapStep: [1, 1],
                    valid: "Snap step is too large, there must be at least 5 ticks.",
                }),
                undefined,
            ),
        );
    });

    test("Calls onChange when grid step is changed and valid", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "Grid Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "2");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    gridStep: [2, 1],
                    valid: true,
                }),
                undefined,
            ),
        );
    });

    test("validates when the grid step is too large", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "Grid Step 1"});
        await userEvent.clear(input);
        await userEvent.type(input, "100");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    gridStep: [1, 1],
                    valid: "Grid step is too large, there must be at least 3 ticks.",
                }),
                undefined,
            ),
        );
    });

    test("Calls onChange when the x label is changed", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "x Label"});
        await userEvent.clear(input);
        await userEvent.type(input, "time");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    labels: ["time", "y"],
                }),
                undefined,
            ),
        );
    });

    test("Calls onChange when the y label is changed", async () => {
        // Arrange
        jest.useRealTimers();
        userEvent = userEventForRealTimers();
        const onChange = jest.fn();
        render(<InteractiveGraphSettings onChange={onChange} />);

        // Act
        const input = screen.getByRole("textbox", {name: "y Label"});
        await userEvent.clear(input);
        await userEvent.type(input, "count");
        await userEvent.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    labels: ["x", "count"],
                }),
                undefined,
            ),
        );
    });
});
