import {
    ApiOptions,
    Dependencies,
    DependenciesContext,
    Util,
} from "@khanacademy/perseus";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Editor from "../editor";
import {mockImageLoading} from "../testing/image-loader-utils";
import {
    testDependencies,
    testDependenciesV2,
} from "../testing/test-dependencies";
import * as clipboardUtil from "../util/clipboard";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {UserEvent} from "@testing-library/user-event";

const Harnessed = (props: Partial<PropsFor<typeof Editor>>) => {
    return (
        <DependenciesContext.Provider value={testDependenciesV2}>
            <Editor
                apiOptions={ApiOptions.defaults}
                onChange={() => {}}
                content="[[☃ image 1]]"
                widgets={{
                    "image 1": {
                        type: "image",
                        options: {
                            backgroundImage: {
                                url: "http://placekitten.com/200/300",
                                width: 200,
                                height: 300,
                            },
                        },
                    },
                }}
                {...props}
            />
        </DependenciesContext.Provider>
    );
};

describe("Editor", () => {
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
    });

    it("should delete widget if confirmed", async () => {
        const onChangeMock = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(true);

        // Arrange
        render(<Harnessed onChange={onChangeMock} />);

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Remove image widget"}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({content: ""});
    });

    it("should NOT delete widget if not confirmed", async () => {
        const onChangeMock = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(false);

        // Arrange
        render(<Harnessed onChange={onChangeMock} />);

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Remove image widget"}),
        );

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    test("clicking on the widget editor should open it", async () => {
        // Arrange
        // The editor preview uses SvgImage, which uses ImageLoader.
        // We need to mock the image loading in ImageLoader for it to render.
        const unmockImageLoading = mockImageLoading();

        render(<Harnessed />);

        // Act
        const widgetDisclosure = screen.getByText("image 1");
        await userEvent.click(widgetDisclosure);

        // Assert
        const previewImage = screen.getByAltText(/Preview:/);
        await waitFor(() =>
            expect(previewImage).toHaveAttribute(
                "src",
                "http://placekitten.com/200/300",
            ),
        );

        // Cleanup
        unmockImageLoading();
    });

    it("should update values", async () => {
        // Arrange
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([200, 200]);

        const changeFn = jest.fn();
        render(<Harnessed onChange={changeFn} />);

        // Act
        const widgetDisclosure = screen.getByText("image 1");
        await userEvent.click(widgetDisclosure);

        const captionInput = screen.getByLabelText(/Caption/);

        await userEvent.clear(captionInput);
        captionInput.focus();
        await userEvent.paste("kittens");
        await userEvent.tab(); // blurring the input triggers onChange to be called

        // Assert
        expect(changeFn).toHaveBeenCalledWith(
            {
                widgets: {
                    "image 1": expect.objectContaining({
                        type: "image",
                        graded: true,
                        options: expect.objectContaining({
                            caption: "kittens",
                        }),
                    }),
                },
            },
            undefined,
            undefined,
        );
    });

    it("should not log a warning given a widget with an undefined key", () => {
        const consoleErrorSpy = jest.spyOn(console, "error");

        render(
            <Harnessed
                widgets={{
                    "image 1": {
                        type: "image",
                        key: undefined,
                        options: {
                            backgroundImage: {
                                url: "http://placekitten.com/200/300",
                            },
                        },
                    },
                }}
            />,
        );

        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should add the latest expression widget", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__widget-select");
        await userEvent.selectOptions(select, "Expression / Equation");

        expect(cbData?.widgets?.["expression 1"]?.version).toEqual({
            major: 2,
            minor: 0,
        });
    });

    it("should add the latest radio widget", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__widget-select");
        await userEvent.selectOptions(select, "Radio / Multiple choice");

        expect(cbData?.widgets?.["radio 1"]?.version).toEqual({
            major: 3,
            minor: 0,
        });
    });

    it("remembers the configuration of widgets that are removed from the content and then restored", async () => {
        // This test verifies that ctrl+Z / undo will fully restore any
        // deleted widgets.

        let renderer: PerseusRenderer = {
            content: "[[☃ image 1]]",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    options: {
                        backgroundImage: {
                            url: "http://placekitten.com/200/300",
                            width: 200,
                            height: 300,
                        },
                    },
                },
            },
        };

        const handleChange = (changes: any) => {
            renderer = {...renderer, ...changes};
        };

        const {rerender} = render(
            <Harnessed onChange={handleChange} {...renderer} />,
        );

        const contentTextarea = screen.getByLabelText("Markdown content");
        await userEvent.clear(contentTextarea);

        // Pre-assert: clearing the textarea should also delete the image widget
        expect(renderer.widgets).toEqual({});

        rerender(<Harnessed onChange={handleChange} {...renderer} />);

        // Act: restore the widget
        for (const char of "[[☃ image 1]]") {
            // Note: userEvent treats square brackets as special characters.
            // Doubling the bracket escapes it.
            await userEvent.type(contentTextarea, char.replace(/\[/, "[["));
            // We have to re-render after every keystroke because the textarea
            // is controlled. Its value doesn't update otherwise.
            rerender(<Harnessed onChange={handleChange} {...renderer} />);
        }

        expect(renderer.content).toEqual("[[☃ image 1]]");

        // Assert:
        expect(renderer.widgets).toEqual({
            "image 1": {
                type: "image",
                options: {
                    backgroundImage: {
                        url: "http://placekitten.com/200/300",
                        width: 200,
                        height: 300,
                    },
                },
            },
        });
    });

    it("should apply perseus-editor-disabled class when editingDisabled", () => {
        render(<Harnessed apiOptions={{editingDisabled: true}} />);
        expect(screen.queryByTestId("perseus-single-editor")).toHaveClass(
            "perseus-editor-disabled",
        );
    });

    test("default templates work", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__template-select");
        await userEvent.selectOptions(select, "Table");

        expect(cbData?.content).toMatch(/header 1 | header 2 | header 3/i);
    });

    describe("cursor positioning after content-changing handlers", () => {
        // These tests guard against a previous regression where the cursor
        // jumped to the end of the textarea after inserting a widget (PR #3318
        // dropped the cursor-positioning callback parameter from the editor's
        // onChange chain, leaving the cursor logic in editor.tsx orphaned).
        // The fix moved cursor positioning into Editor's own componentDidUpdate
        // via the _pendingCursorPos field.

        // Stateful harness that propagates content/widget changes back to
        // the Editor so the controlled textarea actually updates and we can
        // observe componentDidUpdate's cursor effect.
        const StatefulHarness = (props: {
            initialContent?: string;
            initialWidgets?: PerseusRenderer["widgets"];
        }) => {
            const [content, setContent] = React.useState(
                props.initialContent ?? "",
            );
            const [widgets, setWidgets] = React.useState<
                PerseusRenderer["widgets"]
            >(props.initialWidgets ?? {});
            return (
                <Harnessed
                    content={content}
                    widgets={widgets}
                    onChange={(data: any) => {
                        if (data.content !== undefined) {
                            setContent(data.content);
                        }
                        if (data.widgets !== undefined) {
                            setWidgets(data.widgets);
                        }
                    }}
                />
            );
        };

        beforeEach(() => {
            // jsdom doesn't implement document.execCommand, which the Editor
            // calls in componentDidUpdate to keep programmatic content
            // changes in the browser's undo stack. We stub it with a minimal
            // impl that does what execCommand("insertText") would do in a
            // real browser: replace the focused textarea's current selection
            // with the supplied text. The cast and direct DOM access are
            // intentional for this jsdom polyfill.
            /* eslint-disable no-restricted-syntax, testing-library/no-node-access */
            (document as any).execCommand = jest
                .fn()
                .mockImplementation(
                    (cmd: string, _: unknown, value: string) => {
                        const active = document.activeElement;
                        if (
                            cmd === "insertText" &&
                            active instanceof HTMLTextAreaElement
                        ) {
                            const {selectionStart, selectionEnd} = active;
                            active.value =
                                active.value.slice(0, selectionStart) +
                                value +
                                active.value.slice(selectionEnd);
                            const newPos = selectionStart + value.length;
                            active.setSelectionRange(newPos, newPos);
                        }
                        return true;
                    },
                );
            /* eslint-enable no-restricted-syntax, testing-library/no-node-access */
        });

        it("places the cursor after the inserted widget syntax when adding a widget via the dropdown", async () => {
            // Arrange
            render(<StatefulHarness initialContent="" initialWidgets={{}} />);
            act(() => jest.runOnlyPendingTimers());

            // eslint-disable-next-line no-restricted-syntax -- screen.getByLabelText returns a generic HTMLElement; we know this is a textarea.
            const textarea = screen.getByLabelText(
                "Markdown content",
            ) as HTMLTextAreaElement;

            // Act: insert an inline widget. Expression / Equation is inline
            // so no extra newlines get inserted around it.
            const select = screen.getByTestId("editor__widget-select");
            await userEvent.selectOptions(select, "Expression / Equation");

            // Assert: the textarea should contain the widget syntax and the
            // cursor should land immediately after the closing `]]` (not at
            // the very end of the textarea or somewhere mid-content).
            await waitFor(() => {
                expect(textarea.value).toContain("[[☃ expression 1]]");
            });
            const expectedCursorPos = textarea.value.indexOf("]]") + 2;
            expect(textarea.selectionStart).toBe(expectedCursorPos);
            expect(textarea.selectionEnd).toBe(expectedCursorPos);
        });

        it("places the cursor at the end of pasted content when pasting widget content", async () => {
            // Mock the perseus clipboard helper so the paste handler sees
            // controlled widget data without needing real navigator.clipboard
            // access in jsdom.
            const pastedText = "PASTED";
            jest.spyOn(
                clipboardUtil,
                "getPerseusClipboardData",
            ).mockResolvedValue({text: pastedText, widgets: {}});

            // Arrange: render with some existing text so we can paste into
            // the middle of it.
            const initialContent = "hello world";
            render(
                <StatefulHarness
                    initialContent={initialContent}
                    initialWidgets={{}}
                />,
            );
            act(() => jest.runOnlyPendingTimers());

            // eslint-disable-next-line no-restricted-syntax -- screen.getByLabelText returns a generic HTMLElement; we know this is a textarea.
            const textarea = screen.getByLabelText(
                "Markdown content",
            ) as HTMLTextAreaElement;

            // Act: place cursor in the middle (after "hello") and trigger
            // paste. We use fireEvent.paste rather than userEvent.paste
            // because the perseus paste handler is bound via jQuery and
            // ignores event.clipboardData (it reads from navigator.clipboard
            // via the mocked getPerseusClipboardData above).
            const pasteAt = 5;
            textarea.focus();
            textarea.setSelectionRange(pasteAt, pasteAt);
            // userEvent.paste doesn't go through the jQuery-bound paste listener; fireEvent does.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.paste(textarea);

            // Assert: textarea now has the pasted content inserted at the
            // cursor, and the cursor sits immediately after the pasted text.
            await waitFor(() => {
                expect(textarea.value).toBe(
                    initialContent.slice(0, pasteAt) +
                        pastedText +
                        initialContent.slice(pasteAt),
                );
            });
            const expectedCursorPos = pasteAt + pastedText.length;
            expect(textarea.selectionStart).toBe(expectedCursorPos);
            expect(textarea.selectionEnd).toBe(expectedCursorPos);
        });
    });

    test("custom templates work", async () => {
        // PerseusRenderer but TS is being dumb
        let cbData: any;
        render(
            <Harnessed
                onChange={(data) => {
                    cbData = data;
                }}
                additionalTemplates={{
                    "custom-template": "This is my custom template",
                }}
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        const select = screen.getByTestId("editor__template-select");
        await userEvent.selectOptions(select, "custom-template");

        expect(cbData?.content).toMatch(/This is my custom template/i);
    });
});
