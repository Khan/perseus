import {describe, beforeAll, beforeEach, afterEach, it} from "@jest/globals";
import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {act, screen, waitFor, within} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testWidgetIdExtraction} from "../../../../testing/extract-widget-ids-contract-tests";
import {mockImageLoading} from "../../../../testing/image-loader-utils";
import {clone} from "../../../../testing/object-utils";
import {testDependencies} from "../../../../testing/test-dependencies";
import {
    dropdownWidget,
    imageWidget,
    mockWidget,
    question1,
    question2,
    definitionItem,
    mockedRandomItem,
} from "../__testdata__/renderer.testdata";
import * as Dependencies from "../dependencies";
import {
    isDifferentQuestion,
    type DifferentQuestionPartialProps,
} from "../renderer";
import {registerWidget} from "../widgets";
import {renderQuestion} from "../widgets/__testutils__/renderQuestion";
import {simpleGroupQuestion} from "../widgets/group/group.testdata";
import MockWidgetExport from "../widgets/mock-widgets/mock-widget";

import type {PerseusRenderer, DropdownWidget} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// NOTE(jeremy): We can't use an automatic mock for the translation linter,
// because one of it's "instance" methods is created using `debounce` and Jest
// doesn't provide a mocked instance method for it (I suspect that Jest doesn't
// see that symbol as an instance method).
const mockRunLinter = jest.fn();
const mockApplyLintErrors = jest.fn();
jest.mock("../translation-linter", () => {
    // We mock the TranslationLinter constructor here setting things up so we
    // can spy/verify calls to instances of TranslationLinter
    return function () {
        return {
            runLinter: mockRunLinter,
            applyLintErrors: mockApplyLintErrors,
        };
    };
});

describe("renderer", () => {
    beforeAll(() => {
        registerWidget("mock-widget", MockWidgetExport);
    });

    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    describe("snapshots", () => {
        it("initial render", () => {
            // Arrange and Act
            const {container} = renderQuestion(question1);

            // Assert
            expect(container).toMatchSnapshot("initial render");
        });

        it("correct answer", async () => {
            // Arrange
            const {container} = renderQuestion(question1);

            // Act
            await userEvent.click(screen.getByRole("combobox"));
            await userEvent.click(screen.getAllByRole("option")[2]);

            // Assert
            expect(container).toMatchSnapshot("correct answer");
        });

        it("incorrect answer", async () => {
            // Arrange
            const {container} = renderQuestion(question1);

            // Act
            await userEvent.click(screen.getByRole("combobox"));
            await userEvent.click(screen.getAllByRole("option")[1]);

            // Assert
            expect(container).toMatchSnapshot("incorrect answer");
        });

        it("renders a placeholder for a deprecated widget", () => {
            // Arrange
            const question: PerseusRenderer = {
                content: "[[☃ sequence 1]]",
                images: {},
                widgets: {
                    "sequence 1": {
                        type: "deprecated-standin",
                        version: {major: 0, minor: 0},
                        graded: true,
                        options: {
                            json: [
                                {
                                    content: "",
                                    images: {},
                                    widgets: {},
                                },
                            ],
                        },
                    },
                },
            };

            // Act
            const {container} = renderQuestion(question);

            // Assert
            expect(container).toMatchSnapshot("deprecated widget");
        });
    });

    describe("linting (TranslationLinter)", () => {
        const extraProps = {
            linterContext: {
                contentType: "exercise",
                highlightLint: true,
                // TODO(CP-4838): is it okay to use [] as a default?
                paths: [],
                stack: [],
            },
        } as const;

        it("should run the linter on mount", () => {
            // Arrange and Act
            renderQuestion(question1, {}, extraProps);

            // Assert
            expect(mockRunLinter).toHaveBeenCalledWith(
                "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
                expect.any(Function),
            );
        });

        it("should do nothing in linter callback if component is already unmounted", () => {
            // Arrange
            const {unmount} = renderQuestion(question1, {}, extraProps);
            unmount();
            mockApplyLintErrors.mockClear();

            // Act - Call the linter callback
            // `.calls` is an array of calls to this mock.
            // Each call is an array of the parameters passed to that call.
            // So `[0][1]` is the first call's second parameter.
            mockRunLinter.mock.calls[0][1]([]);

            // Assert
            expect(mockApplyLintErrors).not.toHaveBeenCalled();
        });

        it("should run linter on update", () => {
            // Arrange
            const {rerender} = renderQuestion(question1, {}, extraProps);

            mockRunLinter.mockClear();

            // Act
            rerender(question1, {...extraProps, problemNum: 1});

            // Assert
            expect(mockRunLinter).toHaveBeenCalled();
        });
    });

    describe("initial render", () => {
        it("should build initial state from props passed in", () => {
            // Arrange and Act
            const {renderer} = renderQuestion(question1);

            // Assert
            expect(renderer.state.jiptContent).toBeNull();
            expect(renderer.state.translationLintErrors).toHaveLength(0);

            expect(renderer.state.widgetInfo).toStrictEqual(question1.widgets);
        });

        it("should default alignment if missing", () => {
            // Arrange/Act
            const {renderer} = renderQuestion({
                ...question1,
                widgets: {
                    ...question1.widgets,
                    "dropdown 1": {
                        ...question1.widgets["dropdown 1"],
                        alignment: undefined,
                    },
                },
            });

            // Assert
            expect(renderer.state.widgetInfo["dropdown 1"]?.alignment).toBe(
                "default",
            );
        });

        it("should build default widget info if widget ID missing from widget props", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question1,
                content:
                    "[[☃ dropdown 1]] exists.\n\n" +
                    "[[☃ dropdown 2]] does not!",
            });
            expect(question1.widgets["dropdown 2"]).toBeUndefined();
            let sawDropdown2 = false;

            // Act
            const widgets = renderer.findInternalWidgets((id, info, widget) => {
                // We should see the Renderer dealing with `dropdown 2` even if
                // no widget options/props were provided in the Perseus item.
                if (id === "dropdown 2") {
                    // Dropdown 2's info is the default value (ie. it's got a
                    // type and empty options object).
                    expect(info.type).toBe("dropdown");
                    expect(info.options).toStrictEqual({});
                    expect(info.graded).toBe(true);

                    sawDropdown2 = true;
                    return true;
                }
                return false;
            });

            // Assert
            expect(sawDropdown2).toBe(true);
            // `dropdown 2` not found, however, because the Renderer doesn't
            // render widget's that don't have options defined.
            expect(widgets).toStrictEqual([null]);
        });
    });

    describe("rendering", () => {
        let unmockImageLoading: () => void;

        beforeEach(() => {
            unmockImageLoading = mockImageLoading();
        });

        afterEach(() => {
            unmockImageLoading();
        });

        it.each([true, false])(
            "should render a table when isMobile: %s",
            (isMobile: boolean) => {
                // Arrange
                const question = {
                    content:
                        "| Heading 1 | Heading 2 | Heading 3 |\n" +
                        "| --------- | --------- | --------- |\n" +
                        "| r1c1      | r1c2      | r1c3      |\n" +
                        "| r2c1      | r2c2      | r2c3      |\n" +
                        "| r3c1      | r3c2      | r3c3      |",
                    images: {},
                    widgets: {},
                } as const;

                // Act
                const {container} = renderQuestion(question, {
                    isMobile,
                });

                // Assert
                expect(container).toMatchSnapshot();
            },
        );

        it("should wrap image to be responsive if not in table and dimensions provided", () => {
            // Arrange
            const question = {
                content:
                    "One image with dimensions that isn't in a table.\n\n" +
                    "![This image has dimensions](https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg)",
                images: {
                    "https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg":
                        {height: 410, width: 420},
                },
                widgets: {},
            } as const;
            renderQuestion(question);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            const imageNodes = screen.queryAllByAltText(
                "This image has dimensions",
            );
            expect(imageNodes).toHaveLength(1);

            // eslint-disable-next-line testing-library/no-node-access
            expect(imageNodes[0].parentElement).toHaveClass(
                "fixed-to-responsive",
            );
        });

        it("should not wrap image to be responsive if not in table and no dimensions provided", () => {
            // Arrange
            const question = {
                content:
                    "One image without dimensions.\n\n" +
                    "![This image doesn't have dimensions](https://ka-perseus-images.s3.amazonaws.com/41dbe22e2d8aa0eb4356195d634c3219dc7142c9.svg)",
                images: {},
                widgets: {},
            } as const;
            renderQuestion(question);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            const imageNodes = screen.queryAllByAltText(
                "This image doesn't have dimensions",
            );
            expect(imageNodes).toHaveLength(1);

            // image didn't have dimensions provided so it is not rendered as
            // responsive.
            // eslint-disable-next-line testing-library/no-node-access
            expect(imageNodes[0].parentElement).not.toHaveClass(
                "fixed-to-responsive",
            );
        });

        it("should add dimensions to wrapper, if provided", () => {
            // Arrange
            const question = {
                content:
                    "One image with dimensions.\n\n" +
                    "![This image has dimensions](https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg)",
                images: {
                    "https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg":
                        {height: 410, width: 420},
                },
                widgets: {},
            } as const;
            renderQuestion(question);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(
                screen.queryAllByAltText("This image has dimensions"),
            ).toHaveLength(1);

            const wrapperStyle = getComputedStyle(
                // @ts-expect-error - TS2345 - Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element'.
                screen.getByAltText("This image has dimensions").parentElement, // eslint-disable-line testing-library/no-node-access
            );
            expect(wrapperStyle.maxWidth).toBe("420px");
            expect(wrapperStyle.maxHeight).toBe("410px");
        });

        it("should not add dimensions to wrapper, if not provided", () => {
            // Arrange
            const question = {
                content:
                    "One image without dimensions.\n\n" +
                    "![This image doesn't](https://ka-perseus-images.s3.amazonaws.com/41dbe22e2d8aa0eb4356195d634c3219dc7142c9.svg)",
                images: {},
                widgets: {},
            } as const;
            renderQuestion(question);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.queryAllByAltText("This image doesn't")).toHaveLength(
                1,
            );

            const wrapperStyle = getComputedStyle(
                // @ts-expect-error - TS2345 - Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element'.
                screen.getByAltText("This image doesn't").parentElement, // eslint-disable-line testing-library/no-node-access
            );
            expect(wrapperStyle.maxWidth).toBe("");
            expect(wrapperStyle.maxHeight).toBe("");
        });

        it("should never render image in responsive mode if inside table", () => {
            // Arrange
            const question = {
                content:
                    "A table with images:\n\n" +
                    "\n\n" +
                    "| Title | Image |\n" +
                    "| ----- |------ |\n" +
                    "| Are you hungry for pizza? |\n" +
                    "| ![This image has dimensions](https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg) ",
                images: {
                    "https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg":
                        {height: 410, width: 420},
                },
                widgets: {},
            } as const;
            renderQuestion(question);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            const imageNodes = screen.queryAllByAltText(
                "This image has dimensions",
            );
            expect(imageNodes).toHaveLength(1);
            expect(getComputedStyle(imageNodes[0]).width).toBe("420px");
            expect(getComputedStyle(imageNodes[0]).height).toBe("410px");

            // And the parent shouldn't be a wrapper element
            // eslint-disable-next-line testing-library/no-node-access
            expect(imageNodes[0].parentElement).not.toHaveClass(
                "fixed-to-responsive",
            );
        });

        it("should render widgetPlaceholder if provided", () => {
            // Arrange
            const widgetPlaceholder = <div key="1">This is a placeholder</div>;

            // Act
            renderQuestion(question1, {
                widgetPlaceholder,
            });

            // Assert
            expect(
                screen.getByText("This is a placeholder"),
            ).toBeInTheDocument();
            // Make sure the 'dropdown' widget wasn't rendered!
            expect(screen.queryAllByRole("combobox")).toHaveLength(0);
        });

        it("should render columns", () => {
            // Arrange
            const question = {
                content:
                    "Stuff in column 1\n\n" +
                    "=====\n\n" +
                    "Stuff in column 2\n\n",
                images: {},
                widgets: {},
            } as const;

            // Act
            const {container} = renderQuestion(question);

            // Assert
            expect(container).toMatchSnapshot();
        });

        it("should render image placeholder for links found in content that are images (for translation support)", () => {
            // Arrange
            const question = {
                content:
                    "A link to an image: https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg",
                images: {},
                widgets: {},
            } as const;
            const imagePlaceholder = (
                // Without a `key`, we get React warnings
                <div key="placeholder">image placeholder</div>
            );

            // Act
            renderQuestion(question, {
                imagePlaceholder,
            });

            // Assert
            const renderedPlaceholder = screen.getByText("image placeholder");
            expect(renderedPlaceholder).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-node-access
            expect(renderedPlaceholder.parentElement).toMatchInlineSnapshot(`
                <a
                  href="https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div>
                    image placeholder
                  </div>
                </a>
            `);
        });

        it("should render imagePlaceholder for all images", () => {
            // Arrange
            const imagePlaceholder = (
                <div key="1">This is an image placeholder</div>
            );

            // Act
            renderQuestion(
                {
                    content:
                        "We need more cat gifs: \n\n" +
                        "![this isn't a cat gif :(](https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg)\n\n" +
                        "![this isn't a cat gif :(](https://ka-perseus-images.s3.amazonaws.com/41dbe22e2d8aa0eb4356195d634c3219dc7142c9.svg)",
                    images: {
                        "https://ka-perseus-images.s3.amazonaws.com/29e9aa32de3731b09e245e416cbf4e3fb2e89b58.svg":
                            {height: 420, width: 420},
                        "https://ka-perseus-images.s3.amazonaws.com/41dbe22e2d8aa0eb4356195d634c3219dc7142c9.svg":
                            {height: 216, width: 216},
                    },
                    widgets: {},
                },
                {
                    imagePlaceholder,
                },
            );

            // Assert
            expect(
                screen.getAllByText("This is an image placeholder"),
            ).toHaveLength(2);
        });

        it("should render warning if same widget included multiple times in content", () => {
            // Arrange
            const question = {
                ...question1,
                content: question1.content + "\n\n[[☃ dropdown 1]]",
            } as const;

            //  Act
            renderQuestion(question);

            // Assert
            expect(
                screen.getByText("Widget [[☃ dropdown 1]] already exists."),
            ).toBeInTheDocument();
        });

        it("should render block math", async () => {
            // Arrange
            const question = {
                content:
                    "This is some block math\n\n" +
                    "$1 + 2$\n\n" +
                    "And a footer.",
                images: {},
                widgets: {},
            } as const;
            const apiOptions: Record<string, any> = {};

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot();
        });

        it("should render block math on mobile", async () => {
            // Arrange
            const question = {
                content:
                    "This is some block math\n\n" +
                    "$1 + 2$\n\n" +
                    "And a footer.",
                images: {},
                widgets: {},
            } as const;
            const apiOptions = {isMobile: true} as const;

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot();
        });

        it("should render block math in a Zoomable when on mobile", async () => {
            // Arrange
            const question = {
                content:
                    "This is some block math\n\n" +
                    "$1 + 2$\n\n" +
                    "And a footer.",
                images: {},
                widgets: {},
            } as const;
            const apiOptions = {isMobile: true} as const;

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
            const [zoomable] = container.querySelectorAll(
                ".perseus-block-math-inner span",
            );
            expect(zoomable).not.toBeUndefined();
            expect(zoomable).not.toBeNull();
            // @ts-expect-error - TS2339 - Property 'style' does not exist on type 'Element'.
            expect(zoomable.style.transform).not.toBe("");

            /* eslint-disable testing-library/no-node-access */
            // @ts-expect-error - TS2531 - Object is possibly 'null'.
            expect(zoomable.parentElement.style.transform).not.toBe("");
            /* eslint-enable testing-library/no-node-access */
        });

        it("should render the math", async () => {
            // Arrange
            const question = {
                content: "This is some inline math: $1 + 2$",
                images: {},
                widgets: {},
            } as const;

            // Act
            const {container} = renderQuestion(question);

            // Assert
            await waitFor(() => {
                expect(screen.getByText("1 + 2")).toBeInTheDocument();
            });
            expect(container).toMatchSnapshot();
        });

        it("should replace deprecated alignment tags in block math", async () => {
            // Arrange
            const question = {
                // Math that exists by itself in a paragraph is considered
                // block math, even if it isn't surrounded by the block math
                // delimeters (`$$$...$$$`).
                content:
                    "$\\begin{align}\n2\\text{HCl}(\\text{aq})+\\text{Ca}(\\text{OH})_2(\\text{aq})\\rightarrow\\text{Ca}(\\text{s})+2\\text H_2\\text O(\\text l)+\\text{Cl}_2(\\text g)\n\\end{align}$",
                images: {},
                widgets: {},
            } as const;

            // Act
            renderQuestion(question);

            // Assert
            await waitFor(() => {
                expect(
                    screen.getByText(/\\begin\{aligned\}.*\\end\{aligned\}/),
                ).toBeInTheDocument();
            });
        });
    });

    // Note that we can't use `.each` here because the three props require
    // slightly different methods to change them for our rerender() function
    describe("resets widgetInfo and widgetProps when a prop in SHOULD_CLEAR_WIDGETS_PROP_LIST changes", () => {
        let originalWidgetInfo;
        let rerender;
        let renderer;

        beforeEach(async () => {
            // Arrange
            // eslint-disable-next-line testing-library/no-render-in-lifecycle
            const result = renderQuestion(question1);
            rerender = result.rerender;
            renderer = result.renderer;

            originalWidgetInfo = clone(renderer.state.widgetInfo);

            // Poke the renderer so it's not in it's initial-render state
            await userEvent.click(screen.getByRole("combobox"));
            await userEvent.click(screen.getAllByRole("option")[1]);
        });

        it("'content' prop'", () => {
            // Act
            rerender({
                ...question1,
                content:
                    "this is a content change but still retains the widget it had: [[☃ dropdown 1]]",
            });

            // Assert
            expect(renderer.state.widgetInfo).toStrictEqual(originalWidgetInfo);
        });

        it("'problemNum' prop", () => {
            // Act
            rerender(question1, {problemNum: 1});

            // Assert
            expect(renderer.state.widgetInfo).toStrictEqual(originalWidgetInfo);
        });

        it("'widgets' prop", () => {
            // Act
            rerender({
                ...question1,
                widgets: {
                    ...question1.widgets,
                    // This is just a copy of the original widget, but it
                    // causes a 'widgets' prop change
                    "another-widget 1": question1.widgets["dropdown 1"],
                },
            });

            // Assert
            const allWidgetIds = Object.getOwnPropertyNames(originalWidgetInfo);

            // Note that we are only caring about equality of keys that existed
            // in the original state. Of course, since we made changes to the
            // `widgets` prop, the two widget-dependant state fields will be
            // changed!
            for (const widgetId of allWidgetIds) {
                expect(renderer.state.widgetInfo[widgetId]).toStrictEqual(
                    originalWidgetInfo[widgetId],
                );
            }
        });
    });

    it("doesn't reset widget state when going from answerless to answerful data", async () => {
        // Arrange
        const answerful = generateTestPerseusItem({question: question1});
        const answerless = splitPerseusItem(generateTestPerseusItem(answerful));
        const {rerender, renderer} = renderQuestion(answerless.question);

        // Poke the renderer so it's not in it's initial-render state
        await userEvent.click(screen.getByRole("combobox"));
        await userEvent.click(screen.getAllByRole("option")[1]);

        expect(renderer.getUserInputMap()).toEqual({
            "dropdown 1": {
                value: 1,
            },
        });

        // Act
        rerender(answerful.question);

        // Assert
        expect(renderer.getUserInputMap()).toEqual({
            "dropdown 1": {
                value: 1,
            },
        });
    });

    describe("focus management", () => {
        it("should focus the first focusable widget", () => {
            // Arrange
            const question = {
                content:
                    "A dropdown [[☃ dropdown 1]]\nAn input [[☃ mock-widget 1]]\n\nAnd an image [[☃ image 1]].",
                images: {},
                widgets: {
                    "dropdown 1": dropdownWidget,
                    "mock-widget 1": mockWidget,
                    "image 1": imageWidget,
                },
            } as const;
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(question, {
                onFocusChange,
            });

            // Act
            const focusResult = renderer.focus();

            // Assert
            expect(focusResult).toBe(true);
            expect(onFocusChange).toHaveBeenCalledWith(["dropdown 1"], null);
        });

        it("should return false if no widgets are focusable", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    content: "[[☃ image 1]]",
                    images: {},
                    widgets: {
                        "image 1": {
                            alignment: "block",
                            graded: true,
                            options: {
                                alt: "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
                                backgroundImage: {
                                    height: 80,
                                    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
                                    width: 380,
                                },
                            },
                            static: false,
                            type: "image",
                            version: {major: 0, minor: 0},
                        },
                    },
                },
                {
                    onFocusChange,
                },
            );

            // Act
            const focusResult = renderer.focus();

            // Assert
            expect(focusResult).toBeFalsy();
            expect(onFocusChange).not.toHaveBeenCalled();
        });

        it("should call onFocusChange callback when new widget receives focus", async () => {
            // Arrange
            const onFocusChange = jest.fn();
            renderQuestion(
                {
                    ...question2,
                    content:
                        "Enter 1 in this field: [[☃ mock-widget 1]].\n\n" +
                        "Enter 2 in this field: [[☃ mock-widget 2]] $60$.",
                    widgets: {
                        "mock-widget 1": question2.widgets["mock-widget 1"],
                        "mock-widget 2": question2.widgets["mock-widget 1"],
                    },
                },
                {onFocusChange},
            );

            // Act
            await userEvent.click(screen.getAllByRole("textbox")[1]);

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                /* new focus path */ ["mock-widget 2"],
                /* old focus path */ null,
            );
        });

        it("should call onFocusChange callback when a widget loses focus", async () => {
            // Arrange
            const onFocusChange = jest.fn();
            renderQuestion(
                {
                    ...question2,
                    content:
                        "Enter 1 in this field: [[☃ mock-widget 1]].\n\n" +
                        "Enter 2 in this field: [[☃ mock-widget 2]] $60$.",
                    widgets: {
                        "mock-widget 1": question2.widgets["mock-widget 1"],
                        "mock-widget 2": question2.widgets["mock-widget 1"],
                    },
                },
                {onFocusChange},
            );
            await userEvent.click(screen.getAllByRole("textbox")[1]);
            onFocusChange.mockClear();

            // Act
            await userEvent.tab();
            // There's a _.defer() in the blur handling
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                /* new focus path */ null,
                /* old focus path */ ["mock-widget 2"],
            );
        });

        it("should throw if widget provides invalid focus path", () => {
            // Arrange
            const {renderer} = renderQuestion(definitionItem);
            const [widget2] = renderer.findWidgets("definition 2");

            // Act and Assert
            expect(() => {
                // TODO: Right now KAError is mocked because we're
                // jest.mock()ing the logging module. Figure out how to
                // unmock.
                widget2.props.onFocus("this is not an array");
            }).toThrow("widget props.onFocus focusPath must be an Array");
        });

        it("should focus the input at the requested FocusPath", () => {
            // Arrange
            const {renderer} = renderQuestion(question2);

            // Act
            act(() => renderer.focusPath(["mock-widget 1"]));

            // Assert
            expect(screen.getByRole("textbox")).toHaveFocus();
        });

        it("should do nothing if requested FocusPath is already focused", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(question2, {
                onFocusChange,
            });
            act(() => renderer.focusPath(["mock-widget 1"]));
            onFocusChange.mockClear();

            // Act
            act(() => renderer.focusPath(["mock-widget 1"]));

            // Assert
            expect(onFocusChange).not.toHaveBeenCalled();
        });

        it("should blur current widget when focus changes", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    ...question2,
                    content:
                        "Input 1: [[☃ mock-widget 1]]\n\n" +
                        "Input 2: [[☃ mock-widget 2]]",
                    widgets: {
                        ...question2.widgets,
                        "mock-widget 2": question2.widgets["mock-widget 1"],
                    },
                },
                {onFocusChange},
            );
            act(() => renderer.focusPath(["mock-widget 1"]));
            onFocusChange.mockClear();

            // Act
            act(() => renderer.focusPath(["mock-widget 2"]));

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["mock-widget 2"], // New focus
                ["mock-widget 1"], // Old focus
            );
        });

        it("should do nothing if blurred widget is not focused", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    ...question2,
                    content:
                        "Input 1: [[☃ mock-widget 1]]\n\n" +
                        "Input 2: [[☃ mock-widget 2]]",
                    widgets: {
                        ...question2.widgets,
                        "mock-widget 2": question2.widgets["mock-widget 1"],
                    },
                },
                {onFocusChange},
            );
            // Focus _second_ input number widget
            act(() => screen.getAllByRole("textbox")[1].focus());
            onFocusChange.mockClear();

            // Act
            act(() => renderer.blurPath(["mock-widget 1"]));

            // Assert
            expect(onFocusChange).not.toHaveBeenCalled();
        });

        it("should blur current widget", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    ...question2,
                    content:
                        "Input 1: [[☃ mock-widget 1]]\n\n" +
                        "Input 2: [[☃ mock-widget 2]]",
                    widgets: {
                        ...question2.widgets,
                        "mock-widget 2": question2.widgets["mock-widget 1"],
                    },
                },
                {onFocusChange},
            );
            // Focus _second_ input number widget
            act(() => screen.getAllByRole("textbox")[1].focus());
            onFocusChange.mockClear();

            // Act
            act(() => renderer.blur());
            act(() => jest.runOnlyPendingTimers()); // There's a _.defer() in this code path

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                null, // New focus
                ["mock-widget 2"], // Old focus
            );
        });

        it("should do nothing when blur() called but no widget focused", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    ...question2,
                    content:
                        "Input 1: [[☃ mock-widget 1]]\n\n" +
                        "Input 2: [[☃ mock-widget 2]]",
                    widgets: {
                        ...question2.widgets,
                        "mock-widget 2": question2.widgets["mock-widget 1"],
                    },
                },
                {onFocusChange},
            );

            // Act
            act(() => renderer.blur());
            act(() => jest.runOnlyPendingTimers()); // There's a _.defer() in this code path

            // Assert
            expect(onFocusChange).not.toHaveBeenCalled();
        });
    });

    describe("state serialization", () => {
        it("should request widget's serialized state if implemented", () => {
            // Arrange
            const {renderer} = renderQuestion(definitionItem);

            const [widget2] = renderer.findWidgets("definition 2");
            expect(widget2).not.toBeUndefined();
            widget2.getSerializedState = jest.fn();

            // Act
            renderer.getSerializedState();

            // Act
            expect(widget2.getSerializedState).toHaveBeenCalled();
        });

        it("should return each widget's state from serialize()", () => {
            // Arrange
            const {renderer} = renderQuestion(definitionItem);
            const widgets = renderer.findWidgets((id) =>
                ["definition 1", "definition 2", "definition 3"].includes(id),
            );
            widgets.forEach((w) => {
                w.serialize = jest.fn(() => `State: ${w.props.widgetId}`);
            });

            // Act
            const state = renderer.serialize();

            // Assert
            expect(state).toStrictEqual({
                "definition 1": "State: definition 1",
                "definition 2": "State: definition 2",
                "definition 3": "State: definition 3",
            });
        });
    });

    describe("finding widgets", () => {
        it("should be able to find widgets by widget ID string", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            const [dropdown1] = renderer.findWidgets("dropdown 1");

            // Assert
            expect(dropdown1).not.toBeNull();
            expect(dropdown1).not.toBeUndefined();
        });

        it("should be able to find widgets by widget type string", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            const [dropdown1] = renderer.findWidgets("dropdown");

            // Assert
            expect(dropdown1).not.toBeNull();
            expect(dropdown1).not.toBeUndefined();
        });

        it("should be able to find widgets by filter function", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);
            let filterCalled = false;

            // Act and Arrange
            renderer.findWidgets((id, info, widget) => {
                filterCalled = true;
                expect(id).toBe("dropdown 1");
                expect(info.type).toBe("dropdown");
                expect(widget).not.toBeNull();
                expect(widget).not.toBeUndefined();
                return false;
            });

            expect(filterCalled).toBe(true);
        });
    });

    describe("misc behaviors", () => {
        it("should render the widget in full width if alignment == 'fullWidth'", () => {
            // Arrange/Act
            renderQuestion({
                ...question1,
                widgets: {
                    ...question1.widgets,
                    "dropdown 1": {
                        ...question1.widgets["dropdown 1"],
                        alignment: "full-width",
                    },
                },
            });

            // Assert
            let el = screen.getByRole("combobox");
            while (el != null) {
                if (el.classList.contains("widget-full-width")) {
                    break;
                }
                // eslint-disable-next-line testing-library/no-node-access
                // @ts-expect-error - TS2322 - Type 'HTMLElement | null' is not assignable to type 'HTMLElement'.
                // eslint-disable-next-line testing-library/no-node-access
                el = el.parentElement;
            }

            // Didn't find parent element that's set to full-widget
            expect(el).not.toBeNull();
        });

        it("[DEPRECATED] should return user input array", async () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ mock-widget 1]]\n\n" +
                    "Input 2: [[☃ mock-widget 2]]\n\n" +
                    "A widget that doesn't implement getUserInput: [[☃ image 1]]",
                widgets: {
                    ...question2.widgets,
                    "mock-widget 2": {
                        ...question2.widgets["mock-widget 1"],
                        static: true,
                    },
                    "image 1": {
                        type: "image",
                        graded: false,
                        options: {
                            backgroundImage: {
                                url: "https://example.com/cat.png",
                                width: 100,
                                height: 100,
                            },
                        },
                    },
                },
            });

            const textboxes = screen.getAllByRole("textbox");
            for (let i = 0; i < textboxes.length; i++) {
                await userEvent.type(textboxes[i], i.toString());
            }

            // Act
            const input = renderer.getUserInputMap();

            // Assert
            expect(input).toEqual({
                "mock-widget 1": {currentValue: "0"},
                "mock-widget 2": {currentValue: "1"},
            });
        });

        it("should return all widget IDs that were rendererd", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ mock-widget 1]]\n\n" +
                    "Input 2: [[☃ mock-widget 2]]\n\n" +
                    "A widget that doesn't implement getUserInput: [[☃ image 1]]",
                widgets: {
                    ...question2.widgets,
                    "mock-widget 2": {
                        ...question2.widgets["mock-widget 1"],
                        static: true,
                    },
                    "image 1": {
                        type: "image",
                        graded: false,
                        options: {
                            backgroundImage: {
                                url: "https://example.com/cat.png",
                                width: 100,
                                height: 100,
                            },
                        },
                    },
                },
            });

            // Act
            const widgetIds = renderer.getWidgetIds();

            // Assert
            expect(widgetIds).toStrictEqual([
                "mock-widget 1",
                "mock-widget 2",
                "image 1",
            ]);
        });
    });

    describe("getDOMNodeForPath", () => {
        it("should return the DOM node for the widget at requested FocusPath", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            const node = renderer.getDOMNodeForPath(["dropdown 1"]);

            // Assert
            // @ts-expect-error - TS2345 - Argument of type 'Element | Text | null | undefined' is not assignable to parameter of type 'HTMLElement'.
            expect(within(node).queryAllByRole("combobox")).toHaveLength(1);
        });

        it("should return the widget's getDOMNodeForPath() result for the widget at requested FocusPath", () => {
            // Arrange
            const {renderer} = renderQuestion(definitionItem);
            const widget2DOMNode = <span />;
            const [widget2] = renderer.findWidgets("definition 2");
            widget2.getDOMNodeForPath = jest.fn(() => widget2DOMNode);

            // Act
            const node = renderer.getDOMNodeForPath(["definition 2"]);

            // Assert
            expect(node).toBe(widget2DOMNode);
        });
    });

    describe("getInputPaths", () => {
        it("should return all input paths for all rendererd widgets", () => {
            // Arrange
            const {renderer} = renderQuestion(definitionItem);
            const [definition1, definition2, definition3] =
                renderer.findWidgets((id) =>
                    ["definition 1", "definition 2", "definition 3"].includes(
                        id,
                    ),
                );
            definition1.getInputPaths = jest.fn(() => ["input 1"]);
            definition2.getInputPaths = jest.fn(() => ["input 2", "input 3"]);
            definition3.getInputPaths = jest.fn(() => [
                ["input 4", "sub-input 4.1"],
                "input 5",
            ]);

            // Act
            const inputPaths = renderer.getInputPaths();

            // Assert
            expect(inputPaths).toMatchInlineSnapshot(`
                [
                  [
                    "definition 1",
                    "input 1",
                  ],
                  [
                    "definition 2",
                    "input 2",
                  ],
                  [
                    "definition 2",
                    "input 3",
                  ],
                  [
                    "definition 3",
                    "input 4",
                    "sub-input 4.1",
                  ],
                  [
                    "definition 3",
                    "input 5",
                  ],
                ]
            `);
        });
    });

    describe("emptyWidgets", () => {
        it("should return all empty widgets", async () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ mock-widget 1]]\n\n" +
                    "Input 2: [[☃ mock-widget 2]]",
                widgets: {
                    ...question2.widgets,
                    "mock-widget 2": question2.widgets["mock-widget 1"],
                },
            });
            await userEvent.type(screen.getAllByRole("textbox")[0], "150");
            act(() => jest.runOnlyPendingTimers());

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual(["mock-widget 2"]);
        });

        it("should not return static widgets even if empty", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ mock-widget 1]]\n\n" +
                    "Input 2: [[☃ mock-widget 2]]",
                widgets: {
                    ...question2.widgets,
                    "mock-widget 2": {
                        ...question2.widgets["mock-widget 1"],
                        static: true,
                    },
                },
            });

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual(["mock-widget 1"]);
        });

        it("should return widget ID for group with empty widget", () => {
            // Arrange
            const {renderer} = renderQuestion(simpleGroupQuestion);

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual(["group 1"]);
        });

        it("should not return ID for group with empty static widget", () => {
            // Arrange
            const simpleGroupQuestionCopy = JSON.parse(
                JSON.stringify(simpleGroupQuestion),
            );
            simpleGroupQuestionCopy.widgets["group 1"].options.widgets[
                "expression 1"
            ].static = true;
            const {renderer} = renderQuestion(simpleGroupQuestionCopy);

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual([]);
        });

        it("should not return ID for group with non-empty widget", async () => {
            // Arrange
            const {renderer} = renderQuestion(simpleGroupQuestion);
            await userEvent.type(screen.getByRole("textbox"), "99");
            act(() => jest.runOnlyPendingTimers());

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual([]);
        });
    });

    describe("getUserInputMap", () => {
        it("should return user input for all rendered widgets", async () => {
            // Arrange
            const {renderer} = renderQuestion({
                content:
                    "Input widget: [[\u2603 mock-widget 1]]\n\n" +
                    "Dropdown widget: [[\u2603 dropdown 1]]\n\n" +
                    "Image widget (won't have user input): [[\u2603 image 1]]\n\n" +
                    "Another input widget: [[\u2603 mock-widget 2]]",
                widgets: {
                    "image 1": imageWidget,
                    "mock-widget 1": mockWidget,
                    "mock-widget 2": mockWidget,
                    "dropdown 1": dropdownWidget,
                },
                images: {},
            });

            await userEvent.type(screen.getAllByRole("textbox")[0], "100");
            await userEvent.type(screen.getAllByRole("textbox")[1], "200");

            // Open the dropdown and select the second (idx: 1) item
            await userEvent.click(screen.getByRole("combobox"));
            await userEvent.click(screen.getAllByRole("option")[1]);

            // Act
            const userInput = renderer.getUserInputMap();

            // Assert
            expect(userInput).toMatchInlineSnapshot(`
                {
                  "dropdown 1": {
                    "value": 1,
                  },
                  "mock-widget 1": {
                    "currentValue": "100",
                  },
                  "mock-widget 2": {
                    "currentValue": "200",
                  },
                }
            `);
        });
    });

    describe("getPromptJSON", () => {
        it("should return prompt JSON with the correct content and widgets", () => {
            // Act
            const {renderer} = renderQuestion(mockedRandomItem);

            const json = renderer.getPromptJSON();

            // Assert
            expect(json.content).toBe(mockedRandomItem.content);

            const widgetKeys = Object.keys(mockedRandomItem.widgets);

            expect(Object.keys(json.widgets)).toEqual(widgetKeys);
        });
    });
});

describe("isDifferentQuestion", () => {
    it("considers answerful/answerless to be the same", () => {
        const answerful: DifferentQuestionPartialProps = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        static: false,
                        placeholder: "greater/less than or equal to",
                        choices: [
                            {
                                content: "Cool",
                                correct: true,
                            },
                            {
                                content: "Beans",
                                correct: false,
                            },
                        ],
                    },
                },
            },
            problemNum: 0,
        };
        const answerless = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        static: false,
                        placeholder: "greater/less than or equal to",
                        choices: [
                            {
                                content: "Cool",
                            },
                            {
                                content: "Beans",
                            },
                        ],
                    },
                },
            },
            problemNum: 0,
        };
        expect(isDifferentQuestion(answerful, answerless as any)).toBe(false);
    });

    it("considers exactly the same to be the same", () => {
        const props: DifferentQuestionPartialProps = {
            content: "A",
            widgets: {},
            problemNum: 0,
        };
        expect(isDifferentQuestion(props, props)).toBe(false);
    });

    it("considers different content different", () => {
        const propsA: DifferentQuestionPartialProps = {
            content: "A",
            widgets: {},
            problemNum: 0,
        };
        const propsB: DifferentQuestionPartialProps = {
            content: "B",
            widgets: {},
            problemNum: 0,
        };
        expect(isDifferentQuestion(propsA, propsB)).toBe(true);
    });

    it("considers different problemNum different", () => {
        const propsA: DifferentQuestionPartialProps = {
            content: "A",
            widgets: {},
            problemNum: 0,
        };
        const propsB: DifferentQuestionPartialProps = {
            content: "A",
            widgets: {},
            problemNum: 1,
        };
        expect(isDifferentQuestion(propsA, propsB)).toBe(true);
    });

    it("considers different widgetOptions different", () => {
        const propsA: DifferentQuestionPartialProps = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        static: false,
                        placeholder: "greater/less than or equal to",
                        choices: [
                            {
                                content: "Cool",
                                correct: true,
                            },
                            {
                                content: "Beans",
                                correct: false,
                            },
                        ],
                    },
                },
            },
            problemNum: 0,
        };
        const propsB: DifferentQuestionPartialProps = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    options: {
                        static: false,
                        placeholder: "greater/less than or equal to",
                        choices: [
                            {
                                content: "Neat",
                                correct: true,
                            },
                            {
                                content: "Stuff",
                                correct: false,
                            },
                        ],
                    },
                },
            },
            problemNum: 0,
        };
        expect(isDifferentQuestion(propsA, propsB)).toBe(true);
    });
});

testWidgetIdExtraction(
    "the Renderer component",
    (question: PerseusRenderer) => {
        const {renderer} = renderQuestion(question);
        return renderer.getWidgetIds();
    },
);
