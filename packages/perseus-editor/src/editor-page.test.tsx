import {Dependencies, Util} from "@khanacademy/perseus";
import {
    type PerseusOrdererWidgetOptions,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {
    generateOrdererOption,
    getDefaultAnswerArea,
} from "@khanacademy/perseus-core";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {earthMoonImage} from "../../perseus/src/widgets/image/utils";

import EditorPage from "./editor-page";
import {
    testDependencies,
    testDependenciesV2,
} from "./testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "./util/register-all-widgets-and-editors-for-testing";

import type {UserEvent} from "@testing-library/user-event";

describe("EditorPage", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        Dependencies.setDependencies(testDependencies);
    });

    // Regression (LEMS-3252)
    it("updates static toggle correctly", async () => {
        let callbackValue: any = null;

        const question: PerseusRenderer = {
            content: "[[☃ categorizer 1]]",
            images: {},
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    static: false, // <= important
                    options: {
                        static: false, // <= maybe important?
                        items: ["Zero", "One", "Uno"],
                        categories: ["Column 0", "Column 1"],
                        values: [0, 1, 1],
                        randomizeItems: false,
                    },
                },
            },
        };

        const {rerender} = render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={question}
                onChange={(next) => (callbackValue = next)}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        const staticSwitch = screen.getByRole("switch", {name: "Static"});
        await userEvent.click(staticSwitch);

        expect(staticSwitch).not.toBeChecked();
        expect(question.widgets["categorizer 1"].static).toBe(false);
        expect(callbackValue.question.widgets["categorizer 1"].static).toBe(
            true,
        );

        rerender(
            <EditorPage
                dependencies={testDependenciesV2}
                question={callbackValue.question}
                onChange={(next) => (callbackValue = next)}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        expect(staticSwitch).toBeChecked();
    });

    it("updates Orderer state correctly", async () => {
        const onChangeMock = jest.fn();

        const imageUrl =
            "https://ka-perseus-graphie.s3.amazonaws.com/6e68574abb61d2b4a12644d777006fcfa8a73cff.png";
        const noAltImage = `![](${imageUrl})`;
        const altImage = `![a fox](${imageUrl})`;
        // "[" is a special char in UserEvent, so I need to do it twice when typing
        const altImageTyped = `![[a fox](${imageUrl})`;

        const startWidgetOptions: PerseusOrdererWidgetOptions = {
            options: [
                {
                    content: noAltImage,
                    widgets: {},
                    images: {},
                },
            ],
            correctOptions: [
                {
                    content: noAltImage,
                    widgets: {},
                    images: {},
                },
            ],
            otherOptions: [],
            height: "normal",
            layout: "horizontal",
        };

        const startRenderer: PerseusRenderer = {
            content: "[[☃ orderer 1]]",
            widgets: {
                "orderer 1": {
                    type: "orderer",
                    options: startWidgetOptions,
                },
            },
            images: {},
        };

        render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={startRenderer}
                onChange={onChangeMock}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        const input = screen.getByDisplayValue(noAltImage);
        await userEvent.clear(input);
        await userEvent.type(input, altImageTyped);

        // Verify the mock was called
        expect(onChangeMock).toHaveBeenCalled();

        // Get the widget options directly to avoid having to mock the entire PerseusItem
        const widgetOptions =
            onChangeMock.mock.lastCall[0].question.widgets["orderer 1"].options;

        // Verify the options were updated correctly
        expect(widgetOptions).toEqual(
            expect.objectContaining({
                correctOptions: [generateOrdererOption(altImage)],
                options: [generateOrdererOption(altImage)],
            }),
        );
    });

    it("should disable editor components when editingDisabled is set", () => {
        const question: PerseusRenderer = {
            content: "[[☃ categorizer 1]]",
            images: {},
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    static: false, // <= important
                    options: {
                        static: false, // <= maybe important?
                        items: ["Zero", "One", "Uno"],
                        categories: ["Column 0", "Column 1"],
                        values: [0, 1, 1],
                        randomizeItems: false,
                    },
                },
            },
        };

        render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={question}
                onChange={() => {}}
                apiOptions={{editingDisabled: true}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        // Check that main textarea is disabled
        const textarea = screen.getByPlaceholderText(
            "Type your question here...",
        );
        expect(textarea).toBeDisabled();

        // Check that add widget button is disabled
        const widgetSelect = screen.getByTestId("editor__widget-select");
        expect(widgetSelect).toBeDisabled();
    });

    it("should sync json state when props change in JSON mode", async () => {
        // Arrange
        const initialQuestion: PerseusRenderer = {
            content: "Initial content",
            images: {},
            widgets: {},
        };

        const updatedQuestion: PerseusRenderer = {
            content: "Updated content from parent",
            images: {},
            widgets: {},
        };

        const onChangeMock = jest.fn();

        const {rerender} = render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={initialQuestion}
                onChange={onChangeMock}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={true}
                jsonMode={true}
                widgetsAreOpen={true}
            />,
        );

        // Act
        rerender(
            <EditorPage
                dependencies={testDependenciesV2}
                question={updatedQuestion}
                onChange={onChangeMock}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={true}
                jsonMode={true}
                widgetsAreOpen={true}
            />,
        );

        // Assert
        expect(
            screen.getByDisplayValue(/Updated content from parent/),
        ).toBeInTheDocument();
    });

    it("does not crash when toggling JSON mode with a widget whose stored type has no editor", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        const question: PerseusRenderer = {
            content:
                "Find the area of a circle with a radius of 3.\n\n" +
                "[[☃ expression 1]] \\text{ units}^2",
            images: {},
            // The content marker resolves to the (real) "expression" editor, but
            // the stored widget's type does not resolve to any editor, so the
            // inner widget editor never mounts and its ref stays null.
            // eslint-disable-next-line no-restricted-syntax
            widgets: {
                "expression 1": {
                    type: "unknown-widget",
                    options: {},
                },
            } as any,
        };

        render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={question}
                onChange={onChangeMock}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={true}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        // Act
        // Clicking the toggle runs EditorPage.serialize() synchronously in the
        // event handler, walking down to the widget editor with the null ref.
        await userEvent.click(
            screen.getByRole("checkbox", {name: /Developer JSON Mode/i}),
        );

        // Assert
        // Pre-fix the click threw inside serialize; now the toggle completes.
        expect(onChangeMock).toHaveBeenCalledWith({jsonMode: true});
    });

    it("should call initializeWidgetOptions if available", async () => {
        const onChangeMock = jest.fn();

        const startRenderer: PerseusRenderer = {
            content: "That's an onomatopoeia!",
            widgets: {},
            images: {},
        };

        render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={startRenderer}
                onChange={onChangeMock}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        // eslint-disable-next-line no-restricted-syntax
        const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
        expect(textarea).toBeInTheDocument();

        textarea.setSelectionRange(10, 22);

        const select = screen.getByTestId("editor__widget-select");
        await userEvent.selectOptions(select, "Definition");

        expect(onChangeMock).toHaveBeenCalledWith({
            hints: [],
            answerArea: getDefaultAnswerArea(),
            question: {
                content: "That's an [[☃ definition 1]]!",
                images: {},
                widgets: {
                    "definition 1": {
                        options: {
                            definition: "",
                            togglePrompt: "onomatopoeia",
                        },
                        type: "definition",
                        version: {
                            major: 0,
                            minor: 0,
                        },
                    },
                },
            },
        });
    });

    it("converts image markdown to an image widget when the issue CTA is clicked", async () => {
        // Arrange
        const imageUrl = earthMoonImage.url;
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([
            earthMoonImage.width,
            earthMoonImage.height,
        ]);

        const onChangeMock = jest.fn();
        const question: PerseusRenderer = {
            content: `Which planet is this? ![The Earth](${imageUrl})`,
            images: {
                [earthMoonImage.url]: {
                    width: earthMoonImage.width,
                    height: earthMoonImage.height,
                },
            },
            widgets: {},
        };

        render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={question}
                onChange={onChangeMock}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        // The panel starts collapsed, so open it to reach the issue's CTA.
        await userEvent.click(screen.getByText("Issues"));

        // Act
        await userEvent.click(
            screen.getByRole("button", {
                name: "Convert all image markdown to widget",
            }),
        );

        // Assert
        // The conversion awaits the image's dimensions before it reports back.
        await waitFor(() => expect(onChangeMock).toHaveBeenCalled());
        expect(onChangeMock.mock.lastCall[0].question).toEqual(
            expect.objectContaining({
                content: "Which planet is this? [[☃ image 1]]",
                widgets: expect.objectContaining({
                    "image 1": expect.objectContaining({
                        type: "image",
                        options: expect.objectContaining({
                            alt: "The Earth",
                            backgroundImage: {
                                url: imageUrl,
                                width: earthMoonImage.width,
                                height: earthMoonImage.height,
                            },
                        }),
                    }),
                }),
            }),
        );
    });
});

/**********************************************************/
/* NOTE: snapshot tests are in found in
/* packages/perseus-editor/src/editor-page-snapshot.test.tsx
/*
/* Please add new snapshot tests there instead of this file!
/**********************************************************/
