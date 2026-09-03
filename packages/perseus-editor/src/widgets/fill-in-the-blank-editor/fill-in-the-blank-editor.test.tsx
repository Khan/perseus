import {Dependencies} from "@khanacademy/perseus";
import {
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";
import {fireEvent, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

import type {FillInTheBlankEditorOptions} from "./types";
import type {UserEvent} from "@testing-library/user-event";

function generateOptions(
    overrides: Partial<FillInTheBlankEditorOptions> = {},
): FillInTheBlankEditorOptions {
    return {
        content: "The [[☃ blank 1]] drum, and the [[☃ blank 2]].",
        widgets: {
            "blank 1": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-1"}),
            }),
            "blank 2": generateBlankWidget({
                options: generateBlankOptions({correctId: "tile-2"}),
            }),
        },
        tiles: [
            {id: "tile-1", content: "djembe", label: "djembe"},
            {id: "tile-2", content: "bongo", label: "bongo"},
        ],
        tileUsage: "single",
        randomizeTiles: false,
        ...overrides,
    };
}

/**
 * Feeds every change back in as props, the way the content editor does. Any
 * test that edits and then looks at the result needs this rather than `render`.
 * The getter exposes the authored result, not individual `onChange` calls.
 */
function renderControlled(options: FillInTheBlankEditorOptions) {
    let current = options;

    function Controlled() {
        const [currentOptions, setCurrentOptions] = React.useState(options);
        current = currentOptions;

        return (
            <FillInTheBlankEditor
                {...currentOptions}
                onChange={(changes) =>
                    setCurrentOptions((previous) => ({
                        ...previous,
                        ...changes,
                    }))
                }
            />
        );
    }

    render(<Controlled />);
    return {getOptions: () => current};
}

/**
 * Neither user-event API fits blank markers: `type` reads `[` as a key
 * descriptor, and `paste` goes through `Editor._maybePasteWidgets`, which
 * renames pasted widgets — the very ids these tests assert on.
 */
function typeAnswerZone(value: string) {
    // eslint-disable-next-line testing-library/prefer-user-event
    fireEvent.change(screen.getByRole("textbox", {name: "Markdown content"}), {
        target: {value},
    });
}

/** Image markdown contains `[`, which `userEvent.type` mangles. */
function typeChoiceContent(choiceNumber: number, value: string) {
    // eslint-disable-next-line testing-library/prefer-user-event
    fireEvent.change(
        screen.getByRole("textbox", {name: `Choice ${choiceNumber} Content`}),
        {target: {value}},
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

describe("FillInTheBlankEditor", () => {
    let userEvent: UserEvent;

    // The answer zone is Perseus's `Editor`, which looks widgets up to render
    // a panel per embedded blank.
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

        // Removing a choice asks for confirmation, as in the radio editor.
        jest.spyOn(window, "confirm").mockReturnValue(true);

        // jsdom has no document.execCommand, which `Editor`'s undo-stack path
        // uses — and "Insert blank" goes down it. Same stub as
        // `src/__tests__/editor.test.tsx`.
        document.execCommand = (cmd: string, _: unknown, value: string) => {
            // eslint-disable-next-line testing-library/no-node-access
            const active = document.activeElement;
            if (cmd === "insertText" && active instanceof HTMLTextAreaElement) {
                const {selectionStart, selectionEnd} = active;
                active.value =
                    active.value.slice(0, selectionStart) +
                    value +
                    active.value.slice(selectionEnd);
                const newPos = selectionStart + value.length;
                active.setSelectionRange(newPos, newPos);
            }
            return true;
        };
    });

    it("names the usage control from its visible label", () => {
        // Arrange, Act
        // The label is a sibling `BodyText`, so the name comes from
        // `aria-labelledby` — which `SegmentedControl` silently dropped once.
        renderControlled(generateOptions());

        expect(
            screen.getByRole("radiogroup", {name: "Usage"}),
        ).toBeInTheDocument();
    });

    it("disables every control when editing is disabled", () => {
        // Arrange, Act
        // A read-only context must leave nothing usable — the choice fields
        // and Remove especially, since those lose authored work.
        // Three choices: the minimum-choices guard hides Remove at two.
        render(
            <FillInTheBlankEditor
                {...generateOptions({
                    tiles: [
                        {id: "tile-1", content: "djembe", label: "djembe"},
                        {id: "tile-2", content: "bongo", label: "bongo"},
                        {id: "tile-3", content: "snare", label: "snare"},
                    ],
                })}
                apiOptions={{editingDisabled: true}}
                onChange={() => {}}
            />,
        );

        for (const name of [
            "Insert blank",
            "Add a choice",
            "Remove choice 1",
            "Move choice 1 down",
            "Add image to choice 1",
        ]) {
            expectNotEditable(screen.getByRole("button", {name}));
        }
        expectNotEditable(
            screen.getByRole("textbox", {name: "Choice 1 Content"}),
        );
        expectNotEditable(
            screen.getByRole("textbox", {name: "Choice 1 Screen reader text"}),
        );
        // `SegmentedControl` disables the options, not the group.
        expectNotEditable(screen.getByRole("radio", {name: "Single use"}));
        expectNotEditable(screen.getByRole("radio", {name: "Multi use"}));
    });

    it("adds a blank to the content when Insert blank is clicked", async () => {
        const {getOptions} = renderControlled(
            generateOptions({content: "No blanks here.", widgets: {}}),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Insert blank"}),
        );

        expect(getOptions().content).toContain("[[☃ blank 1]]");
        expect(getOptions().widgets["blank 1"]).toEqual(
            expect.objectContaining({type: "blank"}),
        );
    });

    it("gives a newly inserted blank no correct answer", async () => {
        // The generator's placeholder default would read as a real answer.
        const {getOptions} = renderControlled(
            generateOptions({content: "No blanks here.", widgets: {}}),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Insert blank"}),
        );

        const widget = getOptions().widgets["blank 1"];
        expect(widget?.type === "blank" && widget.options.correctId).toBe("");
    });

    it("removes a blank's widget when its marker is deleted from the content", async () => {
        const {getOptions} = renderControlled(generateOptions());

        typeAnswerZone("The [[☃ blank 1]] drum.");

        expect(getOptions().widgets["blank 2"]).toBeUndefined();
    });

    it("adds a choice with an id that has not been used before", async () => {
        const {getOptions} = renderControlled(generateOptions());

        await userEvent.click(
            screen.getByRole("button", {name: "Add a choice"}),
        );

        expect(getOptions().tiles.map((tile) => tile.id)).toEqual([
            "tile-1",
            "tile-2",
            "tile-3",
        ]);
    });

    it("leaves blanks unanswered when a replacement choice reuses a freed id", async () => {
        // Deleting the last choice frees its id, so the replacement is
        // "tile-3" again — and no blank may inherit it as a correct answer.
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "djembe", label: "djembe"},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                    {id: "tile-3", content: "snare", label: "snare"},
                ],
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: "tile-3"}),
                    }),
                },
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Remove choice 3"}),
        );
        await userEvent.click(
            screen.getByRole("button", {name: "Add a choice"}),
        );

        expect(getOptions().tiles.map((tile) => tile.id)).toEqual([
            "tile-1",
            "tile-2",
            "tile-3",
        ]);
        const widget = getOptions().widgets["blank 2"];
        expect(widget?.type === "blank" && widget.options.correctId).toBe("");
    });

    it.each([
        ["to the top", ["tile-3", "tile-1", "tile-2"]],
        ["up", ["tile-1", "tile-3", "tile-2"]],
    ])("moves the last choice %s", async (direction, expected) => {
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "djembe", label: "djembe"},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                    {id: "tile-3", content: "snare", label: "snare"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: `Move choice 3 ${direction}`}),
        );

        expect(getOptions().tiles.map((tile) => tile.id)).toEqual(expected);
    });

    it.each([
        ["to the bottom", ["tile-2", "tile-3", "tile-1"]],
        ["down", ["tile-2", "tile-1", "tile-3"]],
    ])("moves the first choice %s", async (direction, expected) => {
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "djembe", label: "djembe"},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                    {id: "tile-3", content: "snare", label: "snare"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: `Move choice 1 ${direction}`}),
        );

        expect(getOptions().tiles.map((tile) => tile.id)).toEqual(expected);
    });

    it("clears a blank's correct answer when that choice is deleted", async () => {
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "djembe", label: "djembe"},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                    {id: "tile-3", content: "snare", label: "snare"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Remove choice 2"}),
        );

        const widget = getOptions().widgets["blank 2"];
        expect(widget?.type === "blank" && widget.options.correctId).toBe("");
    });

    it("keeps correct answers pointing at the same choice after reordering", async () => {
        const {getOptions} = renderControlled(generateOptions());

        await userEvent.click(
            screen.getByRole("button", {name: "Move choice 2 up"}),
        );

        expect(getOptions().tiles.map((tile) => tile.id)).toEqual([
            "tile-2",
            "tile-1",
        ]);
        const widget = getOptions().widgets["blank 1"];
        expect(widget?.type === "blank" && widget.options.correctId).toBe(
            "tile-1",
        );
    });

    it("drops the maximum-uses cap when returning to single use", async () => {
        // A leftover cap would resurface on switching back to multi use.
        const {getOptions} = renderControlled(
            generateOptions({tileUsage: "multi", maxUsesPerTile: 3}),
        );

        await userEvent.click(screen.getByRole("radio", {name: "Single use"}));

        expect(getOptions().maxUsesPerTile).toBeUndefined();
    });

    it("turns a choice into an image, with a default height", async () => {
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "", label: "empty"},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Add image to choice 1"}),
        );

        expect(getOptions().tiles[0]).toEqual(
            expect.objectContaining({content: "![]()", imageHeight: 48}),
        );
    });

    it("hides the content field once a choice holds an image", async () => {
        // Text or an image, never both — the editor replaces, not appends.
        renderControlled(generateOptions());
        expect(
            screen.getByRole("textbox", {name: "Choice 1 Content"}),
        ).toBeInTheDocument();

        typeChoiceContent(1, "![a djembe](https://cdn.kastatic.org/d.png)");

        expect(
            screen.queryByRole("textbox", {name: "Choice 1 Content"}),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("combobox", {name: "Choice 1 Height"}),
        ).toBeInTheDocument();
    });

    it("hides both text fields once a choice holds an image", async () => {
        // An image's alt text is its screen reader text.
        renderControlled(
            generateOptions({
                tiles: [
                    {id: "tile-1", content: "", label: ""},
                    {id: "tile-2", content: "bongo", label: "bongo"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Add image to choice 1"}),
        );

        expect(
            screen.queryByRole("textbox", {name: "Choice 1 Content"}),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("textbox", {
                name: "Choice 1 Screen reader text",
            }),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("textbox", {name: "Choice 1 image alt text"}),
        ).toBeInTheDocument();
    });

    it("uses an image choice's alt text as its screen reader text", async () => {
        // Two places to describe an image is two places to disagree.
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {
                        id: "tile-1",
                        content: "![](https://cdn.kastatic.org/p.png)",
                        label: "",
                        imageHeight: 48,
                    },
                    {id: "tile-2", content: "", label: "empty"},
                ],
            }),
        );

        await userEvent.type(
            screen.getByRole("textbox", {name: "Choice 1 image alt text"}),
            "a penny",
        );

        expect(getOptions().tiles[0].label).toBe("a penny");
    });

    it("asks before replacing a choice's text with an image", async () => {
        // Losing authored text to a mis-click would be silent otherwise.
        const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(false);
        const {getOptions} = renderControlled(generateOptions());

        await userEvent.click(
            screen.getByRole("button", {name: "Add image to choice 1"}),
        );

        expect(confirmSpy).toHaveBeenCalled();
        expect(getOptions().tiles[0].content).toBe("djembe");
    });

    it("returns a choice to text when its image is deleted", async () => {
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {
                        id: "tile-1",
                        content: "![a djembe](https://cdn.kastatic.org/d.png)",
                        label: "djembe",
                        imageHeight: 48,
                    },
                    {id: "tile-2", content: "", label: "empty"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("button", {name: "Delete choice 1 image"}),
        );

        expect(getOptions().tiles[0]).toEqual(
            expect.objectContaining({content: "", imageHeight: undefined}),
        );
    });

    it("sets an image choice's display height", async () => {
        const {getOptions} = renderControlled(
            generateOptions({
                tiles: [
                    {
                        id: "tile-1",
                        content: "![a djembe](https://cdn.kastatic.org/d.png)",
                        label: "djembe",
                        imageHeight: 48,
                    },
                    {id: "tile-2", content: "", label: "empty"},
                ],
            }),
        );

        await userEvent.click(
            screen.getByRole("combobox", {name: "Choice 1 Height"}),
        );
        await userEvent.click(screen.getByRole("option", {name: "72px"}));

        expect(getOptions().tiles[0].imageHeight).toBe(72);
    });

    it("reports save warnings through the imperative handle", () => {
        // `WidgetEditor` calls getSaveWarnings() on the ref; part of the contract.
        const ref =
            React.createRef<React.ElementRef<typeof FillInTheBlankEditor>>();
        const options = generateOptions({
            widgets: {
                "blank 1": generateBlankWidget({
                    options: generateBlankOptions({correctId: "tile-1"}),
                }),
                "blank 2": generateBlankWidget({
                    options: generateBlankOptions({correctId: ""}),
                }),
            },
        });

        render(
            <FillInTheBlankEditor {...options} ref={ref} onChange={() => {}} />,
        );

        expect(ref.current?.getSaveWarnings()).toContain(
            "Blank 2 has no correct answer.",
        );
    });
});
