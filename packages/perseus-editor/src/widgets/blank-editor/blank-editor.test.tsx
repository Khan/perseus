import {generateBlankOptions} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {FillInTheBlankEditorContext} from "../fill-in-the-blank-editor/fill-in-the-blank-editor-context";

import BlankEditor from "./blank-editor";

import type {BlankEditorHandle} from "./blank-editor";
import type {FillInTheBlankTile} from "@khanacademy/perseus";
import type {PerseusBlankWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const TILES: ReadonlyArray<FillInTheBlankTile> = [
    {id: "tile-1", content: "djembe", label: "djembe"},
    {id: "tile-2", content: "bongo", label: "bongo"},
];

/** Renders inside a Fill in the Blank, so context supplies the choice bank. */
function renderInFillInTheBlank(
    options: PerseusBlankWidgetOptions,
    onChange: (changes: Partial<PerseusBlankWidgetOptions>) => void = () => {},
    tiles: ReadonlyArray<FillInTheBlankTile> = TILES,
) {
    render(
        <FillInTheBlankEditorContext.Provider value={{tiles}}>
            <BlankEditor {...options} onChange={onChange} />
        </FillInTheBlankEditorContext.Provider>,
    );
}

/**
 * WB `Button` and `SingleSelect` use `aria-disabled` and stay focusable; form
 * inputs use the native `disabled`. `toBeDisabled()` only knows the latter.
 */
function expectNotEditable(element: HTMLElement) {
    const ariaDisabled = element.getAttribute("aria-disabled") === "true";
    // eslint-disable-next-line no-restricted-syntax
    const nativeDisabled = (element as HTMLInputElement).disabled === true;
    expect(ariaDisabled || nativeDisabled).toBe(true);
}

describe("BlankEditor", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("shows the blank's display type", () => {
        // Arrange, Act
        renderInFillInTheBlank(
            generateBlankOptions({displayType: "subscript"}),
        );

        expect(
            screen.getByRole("combobox", {name: "Display"}),
        ).toHaveTextContent("Subscript");
    });

    it("shows the correct answer as a numbered choice", () => {
        // Arrange, Act
        // Numbered because two choices may hold identical content.
        renderInFillInTheBlank(generateBlankOptions({correctId: "tile-2"}));

        expect(
            screen.getByRole("combobox", {name: "Correct answer"}),
        ).toHaveTextContent("2. bongo");
    });

    it("reports the chosen correct answer", async () => {
        const onChange = jest.fn();
        renderInFillInTheBlank(generateBlankOptions({correctId: ""}), onChange);

        await userEvent.click(
            screen.getByRole("combobox", {name: "Correct answer"}),
        );
        await userEvent.click(screen.getByRole("option", {name: "1. djembe"}));

        expect(onChange).toHaveBeenCalledWith({correctId: "tile-1"});
    });

    it("reports the chosen display type", async () => {
        const onChange = jest.fn();
        renderInFillInTheBlank(generateBlankOptions(), onChange);

        await userEvent.click(screen.getByRole("combobox", {name: "Display"}));
        await userEvent.click(screen.getByRole("option", {name: "Subscript"}));

        expect(onChange).toHaveBeenCalledWith({displayType: "subscript"});
    });

    it("shows no correct answer when the choices are unknown", () => {
        // Arrange, Act
        // Outside a Fill in the Blank there is no choice bank to offer.
        render(<BlankEditor {...generateBlankOptions()} onChange={() => {}} />);

        expect(
            screen.queryByRole("combobox", {name: "Correct answer"}),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("combobox", {name: "Display"}),
        ).toBeInTheDocument();
    });

    it("shows no correct answer when it names a choice that was deleted", () => {
        // Arrange, Act
        // The placeholder keeps a dangling id recoverable, not just broken.
        renderInFillInTheBlank(generateBlankOptions({correctId: "tile-99"}));

        expect(
            screen.getByRole("combobox", {name: "Correct answer"}),
        ).toHaveTextContent("Select a choice");
    });

    it("disables both selects when editing is disabled", () => {
        // Arrange, Act
        render(
            <FillInTheBlankEditorContext.Provider value={{tiles: TILES}}>
                <BlankEditor
                    {...generateBlankOptions()}
                    apiOptions={{editingDisabled: true}}
                    onChange={() => {}}
                />
            </FillInTheBlankEditorContext.Provider>,
        );

        expectNotEditable(screen.getByRole("combobox", {name: "Display"}));
        expectNotEditable(
            screen.getByRole("combobox", {name: "Correct answer"}),
        );
    });

    it("serializes the options it was given", () => {
        // `WidgetEditor` calls serialize() on the ref; it is part of the contract.
        const ref = React.createRef<BlankEditorHandle>();
        const options = generateBlankOptions({
            displayType: "subscript",
            correctId: "tile-2",
        });

        render(<BlankEditor {...options} ref={ref} onChange={() => {}} />);

        expect(ref.current?.serialize()).toEqual({
            displayType: "subscript",
            correctId: "tile-2",
        });
    });

    it("defaults a new blank to no correct answer", () => {
        // Arrange, Act
        // `Editor` seeds a new blank from these; "" is what the save warning wants.
        const {defaultProps} = BlankEditor;

        expect(defaultProps.correctId).toBe("");
    });
});
