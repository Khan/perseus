import {Dependencies, Util} from "@khanacademy/perseus";
import {render, screen, waitFor, fireEvent} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import GraphSettings from "../graph-settings";

import type {UserEvent} from "@testing-library/user-event";

import "@testing-library/jest-dom"; // Imports custom matchers

/**
 * userEvent vs. userEventLib - which to use?
 *
 * This file contains tests that use real timers (by default, the Perseus Jest
 * tests are set to use fake timers).
 *
 * By default, the @testing-library/user-event library only knows how to
 * advance real timers. It does, however, contain a setup() function that we
 * can use to tell it how to advance Jest's fake timers (see the beforeEach()
 * in this file).
 *
 * So, if your test calls `jest.useRealTimers()` you should use the
 * `userEventLib` import. If it does not, you should use the configured
 * `userEvent` variable.
 *
 * The failure mode for running tests with fake timers is that they'll fail by
 * timing out. If you get that error, you most likely need to switch to using
 * the configured `userEvent` instance.
 */

describe("GraphSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("displays canvas settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["canvas"]} onChange={() => {}} />,
        );

        // Assert
        expect(
            screen.getByText("Canvas size (x,y pixels)"),
        ).toBeInTheDocument();
    });

    test("displays graph settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["graph"]} onChange={() => {}} />,
        );

        // Assert
        expect(screen.getByText("x Label")).toBeInTheDocument();
        expect(screen.getByText("y Label")).toBeInTheDocument();
        expect(screen.getByText("Markings:")).toBeInTheDocument();
    });

    test("displays nothing if snap is by itself", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["snap"]} onChange={() => {}} />,
        );

        // Assert
        expect(screen.queryByText("Snap Step")).not.toBeInTheDocument();
    });

    test("displays snap settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings
                editableSettings={["graph", "snap"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Snap Step")).toBeInTheDocument();
    });

    test("displays image settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings editableSettings={["image"]} onChange={() => {}} />,
        );

        // Assert
        expect(screen.getByText("Background image:")).toBeInTheDocument();
    });

    test("displays measure settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings
                editableSettings={["measure"]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByText("Show ruler")).toBeInTheDocument();
        expect(screen.getByText("Show protractor")).toBeInTheDocument();
    });

    test("displays all settings", () => {
        // Arrange

        // Act
        render(
            <GraphSettings
                editableSettings={[
                    "canvas",
                    "graph",
                    "snap",
                    "image",
                    "measure",
                ]}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(
            screen.getByText("Canvas size (x,y pixels)"),
        ).toBeInTheDocument();
        expect(screen.getByText("x Label")).toBeInTheDocument();
        expect(screen.getByText("y Label")).toBeInTheDocument();
        expect(screen.getByText("Markings:")).toBeInTheDocument();
        expect(screen.getByText("Snap Step")).toBeInTheDocument();
        expect(screen.getByText("Background image:")).toBeInTheDocument();
        expect(screen.getByText("Show ruler")).toBeInTheDocument();
        expect(screen.getByText("Show protractor")).toBeInTheDocument();
    });

    test("calls onChange when markings are changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const button = screen.getByRole("button", {name: "Grid"});
        await userEvent.click(button);

        // Assert
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({markings: "grid"}),
            undefined,
        );
    });

    test("calls onChange when ruler label is changed", async () => {
        // Arrange
        const onChange = jest.fn();

        render(
            <GraphSettings
                editableSettings={["measure"]}
                showRuler={true}
                onChange={onChange}
            />,
        );

        // Act
        const select = screen.getByRole("combobox", {name: "Ruler label:"});
        await userEvent.selectOptions(select, ["cm"]);

        // Assert
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({rulerLabel: "cm"}),
            undefined,
        );
    });

    test("calls onChange when rulerTicks is changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <GraphSettings
                editableSettings={["measure"]}
                showRuler={true}
                onChange={onChange}
            />,
        );

        // Act
        const select = screen.getByRole("combobox", {name: "Ruler ticks:"});
        await userEvent.selectOptions(select, ["4"]);

        // Assert
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({rulerTicks: 4}),
            undefined,
        );
    });

    test("calls onChange when background image is changed", async () => {
        // Arrange
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        const mockGetImageSize = (url, cb: (width, height) => void) => {
            cb(100, 100);
        };
        jest.spyOn(Util, "getImageSize").mockImplementation(mockGetImageSize);

        render(
            <GraphSettings editableSettings={["image"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox");
        await userEventLib.type(input, "https://example.com/image.png");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        const mockGetImageSize = (url, cb: (width, height) => void) => {
            // Large image should be invalid
            cb(1000, 1000);
        };
        jest.spyOn(Util, "getImageSize").mockImplementation(mockGetImageSize);

        render(
            <GraphSettings editableSettings={["image"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox");
        await userEventLib.type(input, "https://example.com/image.png");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        const mockGetImageSize = (url, cb: (width, height) => void) => {};
        jest.spyOn(Util, "getImageSize").mockImplementation(mockGetImageSize);

        render(
            <GraphSettings editableSettings={["image"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox") as HTMLInputElement;
        await userEventLib.clear(input);
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();

        render(
            <GraphSettings editableSettings={["image"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox");
        input.focus();
        // Disabling this because we need to test keypress events that are
        // unfortunately being used in legacy code.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyPress(input, {key: "a", code: "KeyA", charCode: 97});

        // Assert
        expect(onChange).not.toHaveBeenCalled();
    });

    test("calls onChange when protractor label is changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <GraphSettings
                editableSettings={["measure"]}
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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "x Range"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "0");

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "y Range"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "0");

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "x Range"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "20");

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Tick Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "2");

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Tick Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "20");

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings
                editableSettings={["graph"]}
                range={[
                    [-100, 100],
                    [-100, 100],
                ]}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Tick Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "2");

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings
                editableSettings={["graph", "snap"]}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Snap Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "2");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings
                editableSettings={["graph", "snap"]}
                onChange={onChange}
            />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Snap Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "100");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Grid Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "2");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "Grid Step"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "100");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "x Label"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "time");
        await userEventLib.tab();

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
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["graph"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {name: "y Label"});
        await userEventLib.clear(input);
        await userEventLib.type(input, "count");
        await userEventLib.tab();

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

    test("Calls onChange when the canvas size is changed and valid", async () => {
        // Arrange
        // TODO(nisha): Figure out how to use fake timers for this.
        jest.useRealTimers();
        const onChange = jest.fn();
        render(
            <GraphSettings editableSettings={["canvas"]} onChange={onChange} />,
        );

        // Act
        const input = screen.getByRole("textbox", {
            name: "Canvas size (x,y pixels)",
        });

        await userEventLib.clear(input);
        await userEventLib.paste("300");
        await userEventLib.tab();

        // Assert
        await waitFor(() =>
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    box: [300, 288],
                }),
                undefined,
            ),
        );
    });
});
