import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {
    generateBlankWidget,
    generateFillInTheBlankOptions,
    generateFillInTheBlankTile,
} from "@khanacademy/perseus-core";
import {render, screen, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {getFeatureFlags} from "../../testing/feature-flags-util";
import {testDependencies} from "../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors.testutils";
import * as WidgetEditorRegistry from "../../widget-editor-registry";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const apiOptions = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({"dnd-widget-fitb": true}),
};

function optionsWithOneBlank(
    overrides?: Partial<PerseusFillInTheBlankWidgetOptions>,
): PerseusFillInTheBlankWidgetOptions {
    return generateFillInTheBlankOptions({
        content: "The [[☃ blank 1]] drum.",
        widgets: {
            "blank 1": generateBlankWidget({
                options: {displayType: "normal", correctId: "tile-1"},
            }),
        },
        tiles: [
            generateFillInTheBlankTile({
                id: "tile-1",
                content: "djembe",
                label: "djembe",
                maxUses: 1,
            }),
            generateFillInTheBlankTile({
                id: "tile-2",
                content: "tabla",
                label: "tabla",
                maxUses: 1,
            }),
        ],
        ...overrides,
    });
}

function renderEditor(
    options: PerseusFillInTheBlankWidgetOptions,
    onChange: jest.Mock = jest.fn(),
) {
    return render(
        <FillInTheBlankEditor
            {...options}
            apiOptions={apiOptions}
            onChange={onChange}
        />,
    );
}

describe("fill-in-the-blank-editor", () => {
    let userEvent: UserEvent;

    /** Expands a choice's settings and returns the region holding them. */
    async function openChoice(name: string): Promise<HTMLElement> {
        await userEvent.click(screen.getByRole("button", {name}));
        return screen.getByRole("region", {name});
    }

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
    });

    // TODO(LEMS-4396): clean up feature flag
    it("renders the editor when the dnd-widget-fitb flag is on", () => {
        // Arrange, Act
        renderEditor(generateFillInTheBlankOptions());

        // Assert
        expect(
            screen.getByRole("textbox", {name: "Markdown content"}),
        ).toBeInTheDocument();
    });

    it("renders nothing when the dnd-widget-fitb flag is off", () => {
        // Arrange, Act
        const {container} = render(
            <FillInTheBlankEditor
                {...generateFillInTheBlankOptions()}
                apiOptions={{
                    ...ApiOptions.defaults,
                    flags: getFeatureFlags({"dnd-widget-fitb": false}),
                }}
                onChange={() => {}}
            />,
        );

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    it("is registered as the editor for the fill-in-the-blank widget", () => {
        // Arrange, Act
        const editor = WidgetEditorRegistry.getEditor("fill-in-the-blank");

        // Assert
        expect(editor).not.toBeNull();
    });

    it("does not offer the add-a-widget select in the content editor", () => {
        // Arrange, Act
        renderEditor(optionsWithOneBlank());

        // Assert
        expect(
            screen.queryByRole("option", {name: "Add a widget…"}),
        ).not.toBeInTheDocument();
    });

    describe("content", () => {
        it("inserts a blank with default options at the cursor", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(
                generateFillInTheBlankOptions({
                    content: "AB",
                    tiles: [],
                    randomize: false,
                }),
                onChange,
            );
            const textarea = screen.getByRole("textbox", {
                name: "Markdown content",
            });
            await userEvent.click(textarea);
            // eslint-disable-next-line no-restricted-syntax
            (textarea as HTMLTextAreaElement).setSelectionRange(1, 1);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Insert blank"}),
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith({
                content: "A[[☃ blank 1]]B",
                widgets: {
                    "blank 1": expect.objectContaining({
                        type: "blank",
                        options: {displayType: "normal", correctId: ""},
                    }),
                },
                tiles: [],
                randomize: false,
            });
        });

        // The widget editor container replaces the widget's options with
        // what onChange receives, so dropping a field here would erase it.
        it("keeps the tiles and randomize setting when inserting a blank", async () => {
            // Arrange
            const onChange = jest.fn();
            const options = optionsWithOneBlank({randomize: true});
            renderEditor(options, onChange);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Insert blank"}),
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    tiles: options.tiles,
                    randomize: true,
                }),
            );
        });

        it("keeps the tiles and randomize setting when typing", async () => {
            // Arrange
            const onChange = jest.fn();
            const options = optionsWithOneBlank({randomize: true});
            renderEditor(options, onChange);

            // Act
            await userEvent.type(
                screen.getByRole("textbox", {name: "Markdown content"}),
                "x",
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    tiles: options.tiles,
                    randomize: true,
                }),
            );
        });

        it("numbers a new blank after the existing ones", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Insert blank"}),
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    widgets: expect.objectContaining({
                        "blank 2": expect.objectContaining({type: "blank"}),
                    }),
                }),
            );
        });

        it("disables Insert blank when editing is disabled", () => {
            // Arrange, Act
            render(
                <FillInTheBlankEditor
                    {...optionsWithOneBlank()}
                    apiOptions={{...apiOptions, editingDisabled: true}}
                    onChange={() => {}}
                />,
            );

            // Assert
            // Wonder Blocks buttons use aria-disabled, not the disabled
            // attribute.
            expect(
                screen.getByRole("button", {name: "Insert blank"}),
            ).toHaveAttribute("aria-disabled", "true");
        });
    });

    describe("choices", () => {
        it("disables Add a choice when editing is disabled", () => {
            // Arrange, Act
            render(
                <FillInTheBlankEditor
                    {...optionsWithOneBlank()}
                    apiOptions={{...apiOptions, editingDisabled: true}}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("button", {name: "Add a choice"}),
            ).toHaveAttribute("aria-disabled", "true");
        });

        it("adds an empty, single-use choice", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(generateFillInTheBlankOptions({tiles: []}), onChange);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Add a choice"}),
            );

            // Assert
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    tiles: [
                        {
                            id: expect.any(String),
                            content: "",
                            label: "",
                            maxUses: 1,
                        },
                    ],
                }),
            );
        });

        // The widget editor container replaces the widget's options with
        // what onChange receives, so dropping a field here would erase it.
        it("keeps the content, blanks and randomize setting when editing a choice", async () => {
            // Arrange
            const onChange = jest.fn();
            const options = optionsWithOneBlank({randomize: true});
            renderEditor(options, onChange);
            const choice = await openChoice("Choice 1: djembe");

            // Act
            await userEvent.type(
                within(choice).getByRole("textbox", {name: "Answer"}),
                "s",
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    content: options.content,
                    widgets: options.widgets,
                    randomize: true,
                }),
            );
        });

        it("updates a choice's answer text", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);
            const choice = await openChoice("Choice 2: tabla");

            // Act
            await userEvent.type(
                within(choice).getByRole("textbox", {name: "Answer"}),
                "s",
            );

            // Assert
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    tiles: [
                        expect.objectContaining({
                            id: "tile-1",
                            content: "djembe",
                        }),
                        expect.objectContaining({
                            id: "tile-2",
                            content: "tablas",
                        }),
                    ],
                }),
            );
        });

        it("updates a choice's aria label", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);
            const choice = await openChoice("Choice 1: djembe");

            // Act
            await userEvent.type(
                within(choice).getByRole("textbox", {name: "Aria label"}),
                "s",
            );

            // Assert
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    tiles: [
                        expect.objectContaining({
                            id: "tile-1",
                            label: "djembes",
                        }),
                        expect.objectContaining({id: "tile-2", label: "tabla"}),
                    ],
                }),
            );
        });

        it("updates a choice's max uses", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);
            const choice = await openChoice("Choice 1: djembe");
            const maxUses = within(choice).getByRole("spinbutton", {
                name: "Max uses",
            });

            // Act
            await userEvent.clear(maxUses);
            await userEvent.type(maxUses, "3");

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    tiles: [
                        expect.objectContaining({id: "tile-1", maxUses: 3}),
                        expect.objectContaining({id: "tile-2", maxUses: 1}),
                    ],
                }),
            );
        });

        it("makes a choice unlimited-use", async () => {
            // Arrange
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);
            const choice = await openChoice("Choice 1: djembe");

            // Act
            await userEvent.click(
                within(choice).getByRole("checkbox", {name: "Unlimited uses"}),
            );

            // Assert
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    tiles: [
                        expect.objectContaining({
                            id: "tile-1",
                            maxUses: "unlimited",
                        }),
                        expect.objectContaining({id: "tile-2", maxUses: 1}),
                    ],
                }),
            );
        });

        it("hides the max uses field for an unlimited-use choice", async () => {
            // Arrange
            renderEditor(
                optionsWithOneBlank({
                    tiles: [
                        generateFillInTheBlankTile({
                            id: "tile-1",
                            content: "djembe",
                            maxUses: "unlimited",
                        }),
                    ],
                }),
            );

            // Act
            const choice = await openChoice("Choice 1: djembe");

            // Assert
            expect(
                within(choice).queryByRole("spinbutton", {name: "Max uses"}),
            ).not.toBeInTheDocument();
        });

        it("removes a choice", async () => {
            // Arrange
            jest.spyOn(window, "confirm").mockReturnValue(true);
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);
            const choice = await openChoice("Choice 1: djembe");

            // Act
            await userEvent.click(
                within(choice).getByRole("button", {name: "Remove choice"}),
            );

            // Assert
            expect(onChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    tiles: [expect.objectContaining({id: "tile-2"})],
                }),
            );
        });

        it("keeps a choice when removal is not confirmed", async () => {
            // Arrange
            jest.spyOn(window, "confirm").mockReturnValue(false);
            const onChange = jest.fn();
            renderEditor(optionsWithOneBlank(), onChange);
            const choice = await openChoice("Choice 1: djembe");

            // Act
            await userEvent.click(
                within(choice).getByRole("button", {name: "Remove choice"}),
            );

            // Assert
            expect(onChange).not.toHaveBeenCalled();
        });
    });
});
