import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
// eslint-disable-next-line testing-library/no-manual-cleanup
import {render, screen, cleanup} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import LockedFunctionSettings from "./locked-function-settings";
import {
    getDefaultFigureForType,
    mockedJoinLabelsAsSpokenMathForTests,
} from "./util";

import type {Props} from "./locked-function-settings";
import type {UserEvent} from "@testing-library/user-event";

const defaultProps = {
    ...getDefaultFigureForType("function"),
    onChangeProps: () => {},
    onMove: () => {},
    onRemove: () => {},
} as Props;

const defaultLabel = getDefaultFigureForType("label");

// Mock the async function generateSpokenMathDetails
jest.mock("./util", () => ({
    ...jest.requireActual("./util"),
    joinLabelsAsSpokenMath: (input) =>
        mockedJoinLabelsAsSpokenMathForTests(input),
}));

jest.mock("./locked-function-examples", () => ({
    __esModule: true,
    default: {
        foo: ["bar", "zot"],
    },
}));

describe("Locked Function Settings", () => {
    let userEvent: UserEvent;
    const onChangeProps = jest.fn();

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    test("renders as expected with default values", () => {
        // Act
        render(<LockedFunctionSettings {...defaultProps} />, {
            wrapper: RenderStateRoot,
        });

        // Assert
        const titleText = screen.getByText("Function (y=x^2)");
        expect(titleText).toBeInTheDocument();
    });

    test("renders as expected with partial domain information", () => {
        // Act (max domain is Infinity)
        render(
            <LockedFunctionSettings {...defaultProps} domain={[0, Infinity]} />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        let inputField = screen
            .getByLabelText("domain max")
            // eslint-disable-next-line testing-library/no-node-access
            .querySelector("input");
        expect(inputField?.value).toEqual("");

        // Act (min domain is -Infinity)
        cleanup();
        render(
            <LockedFunctionSettings
                {...defaultProps}
                domain={[-Infinity, 0]}
            />,
            {
                wrapper: RenderStateRoot,
            },
        );

        // Assert
        inputField = screen
            .getByText("domain min")
            // eslint-disable-next-line testing-library/no-node-access
            .querySelector("input");
        expect(inputField?.value).toEqual("");
    });

    describe("Header interactions", () => {
        test("should show the function's color and stroke by default", () => {
            // Arrange
            render(<LockedFunctionSettings {...defaultProps} />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("grayH, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied color in the label", () => {
            // Arrange
            render(<LockedFunctionSettings {...defaultProps} color="green" />, {
                wrapper: RenderStateRoot,
            });

            // Act
            const lineSwatch = screen.getByLabelText("green, solid");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied stroke style in the label", () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    strokeStyle="dashed"
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const lineSwatch = screen.getByLabelText("grayH, dashed");

            // Assert
            expect(lineSwatch).toBeInTheDocument();
        });

        test("should use the supplied equation in the label", () => {
            // Arrange
            render(
                <LockedFunctionSettings {...defaultProps} equation="sin(x)" />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Function (y=sin(x)) grayH, solid",
            });

            // Assert
            expect(header).toBeInTheDocument();
        });

        test("should use the appropriate axis reference in the label", () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    directionalAxis="y"
                    equation="cos(y)"
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Function (x=cos(y)) grayH, solid",
            });

            // Assert
            expect(header).toBeInTheDocument();
        });

        test("calls 'onToggle' when header is clicked", async () => {
            // Arrange
            const onToggle = jest.fn();
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    onToggle={onToggle}
                />,
                {
                    wrapper: RenderStateRoot,
                },
            );

            // Act
            const header = screen.getByRole("button", {
                name: "Function (y=x^2) grayH, solid",
            });
            await userEvent.click(header);

            // Assert
            expect(onToggle).toHaveBeenCalled();
        });
    });

    describe("Settings interactions", () => {
        test("calls 'onChangeProps' when color is changed", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the color
            const colorSwitch = screen.getByLabelText("color");
            await userEvent.click(colorSwitch);
            const colorOption = screen.getByText("green");
            await userEvent.click(colorOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({
                color: "green",
                labels: [],
            });
        });

        test("calls 'onChangeProps' when stroke style is changed", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the stroke
            const strokeSwitch = screen.getByLabelText("stroke");
            await userEvent.click(strokeSwitch);
            const strokeOption = screen.getByText("dashed");
            await userEvent.click(strokeOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({strokeStyle: "dashed"});
        });

        test("calls 'onChangeProps' when stroke style is changed", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the stroke
            const weightSwitch = screen.getByLabelText("weight");
            await userEvent.click(weightSwitch);
            const weightOption = screen.getByText("thick");
            await userEvent.click(weightOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({weight: "thick"});
        });

        test("calls 'onChangeProps' when equation is changed (as keys are pressed)", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                    equation=""
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the equation
            const equationField = screen.getByLabelText("equation");
            await userEvent.type(equationField, "zot");

            // Assert
            expect(onChangeProps).toHaveBeenCalledTimes(3);
            // NOTE: Since the 'onChangeProps' function is being mocked,
            //           the equation doesn't get updated,
            //           and therefore the keystrokes don't accumulate.
            //       This is reflected in the calls to 'onChangeProps' being just 1 character at a time.
            expect(onChangeProps).toHaveBeenNthCalledWith(1, {equation: "z"});
            expect(onChangeProps).toHaveBeenNthCalledWith(2, {equation: "o"});
            expect(onChangeProps).toHaveBeenNthCalledWith(3, {equation: "t"});
        });

        test("calls 'onChangeProps' when directional axis is changed", async () => {
            // Arrange
            render(
                <LockedFunctionSettings
                    {...defaultProps}
                    expanded={true}
                    onChangeProps={onChangeProps}
                />,
                {wrapper: RenderStateRoot},
            );

            // Act
            // Change the axis direction
            const directionalAxisSwitch =
                screen.getByLabelText("equation prefix");
            await userEvent.click(directionalAxisSwitch);
            const axisOption = screen.getByText("x =");
            await userEvent.click(axisOption);

            // Assert
            expect(onChangeProps).toHaveBeenCalledWith({directionalAxis: "y"});
        });

        describe("Domain/Range interactions", () => {
            test("valid entries update component properties", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(domainMinField, "1");
                const domainMaxField = screen.getByLabelText("domain max");
                await userEvent.type(domainMaxField, "5");

                // Assert
                expect(onChangeProps).toHaveBeenCalledTimes(2);
                expect(onChangeProps).toHaveBeenNthCalledWith(1, {
                    domain: [1, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(2, {
                    domain: [-Infinity, 5],
                });
            });

            test("negative entries are handled appropriately", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(domainMinField, "-5");
                await userEvent.type(domainMinField, "[Backspace/]4");
                await userEvent.type(
                    domainMinField,
                    "[Backspace/][Backspace/]-3",
                );
                const domainMaxField = screen.getByLabelText("domain max");
                await userEvent.type(domainMaxField, "-2");

                // Assert
                expect(onChangeProps).toHaveBeenNthCalledWith(1, {
                    domain: [-5, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(3, {
                    domain: [-4, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(5, {
                    domain: [-3, Infinity],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(6, {
                    domain: [-Infinity, -2],
                });
            });

            test("invalid entries don't update component properties", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                // Try different invalid entries (not numbers)
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(domainMinField, " ");
                await userEvent.type(domainMinField, "e");

                // Assert
                expect(onChangeProps).toHaveBeenCalledTimes(0);
            });

            test("deleted values are replaced with +/- Infinity", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        domain={[3, 5]}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const domainMinField = screen.getByLabelText("domain min");
                await userEvent.type(
                    domainMinField,
                    "[ArrowRight/][Backspace/]", // ensure that the cursor is on the right side of the digit before deleting it
                );
                const domainMaxField = screen.getByLabelText("domain max");
                await userEvent.type(
                    domainMaxField,
                    "[ArrowRight/][Backspace/]",
                );

                // Assert
                expect(onChangeProps).toHaveBeenCalledTimes(2);
                expect(onChangeProps).toHaveBeenNthCalledWith(1, {
                    domain: [-Infinity, 5],
                });
                expect(onChangeProps).toHaveBeenNthCalledWith(2, {
                    domain: [3, Infinity],
                });
            });
        });

        describe("Example equation interactions", () => {
            test("shows example equations based upon the category chosen", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Assert - initial state (no category selected)
                let copyButtons = screen.queryAllByLabelText("copy example");
                expect(copyButtons.length).toEqual(0);

                // Act - choose a category of examples
                const categoryDropdown =
                    screen.getByLabelText("Choose a category");
                await userEvent.click(categoryDropdown);
                const categoryOption = screen.getAllByRole("option")[0];
                await userEvent.click(categoryOption);

                // Assert - modified state
                copyButtons = screen.queryAllByLabelText("copy example");
                expect(copyButtons.length).toBeGreaterThan(0);
            });

            test("example equation is copied to the clipboard when 'copy' icon button is activated", async () => {
                // Arrange
                const writeTextMock = jest.fn();
                const clipboardFnMock = jest.fn();
                jest.spyOn(
                    global.navigator,
                    "clipboard",
                    "get",
                ).mockReturnValue({
                    // Only interested in the "writeText" function.
                    writeText: writeTextMock,
                    // The other functions are here to avoid TS from complaining.
                    read: clipboardFnMock,
                    readText: clipboardFnMock,
                    write: clipboardFnMock,
                    addEventListener: clipboardFnMock,
                    dispatchEvent: clipboardFnMock,
                    removeEventListener: clipboardFnMock,
                });

                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act - choose a category to get a listing of examples
                const categoryDropdown =
                    screen.getByLabelText("Choose a category");
                await userEvent.click(categoryDropdown);
                const categoryOption = screen.getAllByRole("option")[0];
                await userEvent.click(categoryOption);

                // Act - click the copy button for the first example
                const copyButton = screen.getAllByLabelText("copy example")[0];
                await userEvent.click(copyButton);

                // Assert - clipboard receives example text
                expect(writeTextMock).toHaveBeenCalledWith("bar");
            });

            test("example equation is copied to the equation field when 'paste' icon button is activated", async () => {
                // Arrange
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        expanded={true}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act - choose a category to get a listing of examples
                const categoryDropdown =
                    screen.getByLabelText("Choose a category");
                await userEvent.click(categoryDropdown);
                const categoryOption = screen.getAllByRole("option")[0];
                await userEvent.click(categoryOption);

                // Act - click the copy button for the first example
                const pasteButton =
                    screen.getAllByLabelText("paste example")[0];
                await userEvent.click(pasteButton);

                // Assert - clipboard receives example text
                expect(onChangeProps).toHaveBeenCalledWith({equation: "bar"});
            });
        });

        describe("Labels", () => {
            test("Updates the label color when the function color changes", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        color="green"
                        labels={[
                            {
                                ...defaultLabel,
                                color: "green",
                            },
                        ]}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const colorSelect = screen.getAllByLabelText("color")[0];
                await userEvent.click(colorSelect);
                const colorOption = screen.getByText("pink");
                await userEvent.click(colorOption);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    color: "pink",
                    labels: [
                        {
                            ...defaultLabel,
                            color: "pink",
                        },
                    ],
                });
            });

            test("Updates the label when the label text changes", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        labels={[
                            {
                                ...defaultLabel,
                                text: "label text",
                            },
                        ]}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const labelText = screen.getByLabelText("text");
                await userEvent.type(labelText, "!");

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    labels: [{...defaultLabel, text: "label text!"}],
                });
            });

            test("Removes label when delete button is clicked", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        labels={[
                            {
                                ...defaultLabel,
                                text: "label text",
                            },
                        ]}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const deleteButton = screen.getByRole("button", {
                    name: "Delete locked label",
                });
                await userEvent.click(deleteButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    labels: [],
                });
            });

            test("Adds a new label when the add label button is clicked", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        labels={[
                            {
                                ...defaultLabel,
                                text: "label text",
                            },
                        ]}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const addLabelButton = screen.getByRole("button", {
                    name: "Add visible label",
                });
                await userEvent.click(addLabelButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    labels: [
                        {
                            ...defaultLabel,
                            text: "label text",
                        },
                        {
                            ...defaultLabel,
                            // One unit down vertically from the first label.
                            coord: [0, -1],
                        },
                    ],
                });
            });
        });

        describe("Aria label", () => {
            test("Renders with aria label", () => {
                // Arrange

                // Act
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel="Function x^2"
                    />,
                    {wrapper: RenderStateRoot},
                );

                const input = screen.getByRole("textbox", {name: "Aria label"});

                // Assert
                expect(input).toHaveValue("Function x^2");
            });

            test("calls onChangeProps when the aria label is updated", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const input = screen.getByRole("textbox", {name: "Aria label"});
                await userEvent.clear(input);
                await userEvent.type(input, "A");

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel: "A",
                });
            });

            test("aria label auto-generates (no labels)", async () => {
                // Arrange
                const onChangeProps = jest.fn();

                // Act
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                    />,
                    {wrapper: RenderStateRoot},
                );

                const autoGenButton = screen.getByRole("button", {
                    name: "Auto-generate",
                });
                await userEvent.click(autoGenButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel:
                        "Function with equation y=x^2. Appearance solid gray.",
                });
            });

            test("aria label auto-generates with directional axis", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                        directionalAxis="y"
                        equation="y^2"
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const autoGenButton = screen.getByRole("button", {
                    name: "Auto-generate",
                });
                await userEvent.click(autoGenButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel:
                        "Function with equation x=y^2. Appearance solid gray.",
                });
            });

            test("aria label auto-generates with domain", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                        domain={[1, 2]}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const autoGenButton = screen.getByRole("button", {
                    name: "Auto-generate",
                });
                await userEvent.click(autoGenButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel:
                        "Function with equation y=x^2, domain from 1 to 2. Appearance solid gray.",
                });
            });

            test("aria label does not auto-generate with domain when it is -Infinity to Infinity", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                        domain={[-Infinity, Infinity]}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const autoGenButton = screen.getByRole("button", {
                    name: "Auto-generate",
                });
                await userEvent.click(autoGenButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel:
                        "Function with equation y=x^2. Appearance solid gray.",
                });
            });

            test.each`
                domainValue       | domainAria
                ${[1, Infinity]}  | ${"1 to Infinity"}
                ${[-Infinity, 2]} | ${"-Infinity to 2"}
            `(
                "aria label auto-generates with partial domain info: $domainValue",
                async ({domainValue, domainAria}) => {
                    // Arrange
                    const onChangeProps = jest.fn();
                    render(
                        <LockedFunctionSettings
                            {...defaultProps}
                            ariaLabel={undefined}
                            onChangeProps={onChangeProps}
                            domain={domainValue}
                        />,
                        {wrapper: RenderStateRoot},
                    );

                    // Act
                    const autoGenButton = screen.getByRole("button", {
                        name: "Auto-generate",
                    });
                    await userEvent.click(autoGenButton);

                    // Assert
                    expect(onChangeProps).toHaveBeenCalledWith({
                        ariaLabel: `Function with equation y=x^2, domain from ${domainAria}. Appearance solid gray.`,
                    });
                },
            );

            test("aria label auto-generates (one label)", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                        labels={[
                            {
                                ...defaultLabel,
                                text: "A",
                            },
                        ]}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const autoGenButton = screen.getByRole("button", {
                    name: "Auto-generate",
                });
                await userEvent.click(autoGenButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel:
                        "Function spoken A with equation y=x^2. Appearance solid gray.",
                });
            });

            test("aria label auto-generates (multiple labels)", async () => {
                // Arrange
                const onChangeProps = jest.fn();
                render(
                    <LockedFunctionSettings
                        {...defaultProps}
                        ariaLabel={undefined}
                        onChangeProps={onChangeProps}
                        labels={[
                            {
                                ...defaultLabel,
                                text: "A",
                            },
                            {
                                ...defaultLabel,
                                text: "B",
                            },
                        ]}
                    />,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const autoGenButton = screen.getByRole("button", {
                    name: "Auto-generate",
                });
                await userEvent.click(autoGenButton);

                // Assert
                expect(onChangeProps).toHaveBeenCalledWith({
                    ariaLabel:
                        "Function spoken A, spoken B with equation y=x^2. Appearance solid gray.",
                });
            });
        });
    });
});
