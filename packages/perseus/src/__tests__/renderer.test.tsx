import {describe, beforeAll, beforeEach, it} from "@jest/globals";
import {screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom matchers

import {clone} from "../../../../testing/object-utils";
import {testDependencies} from "../../../../testing/test-dependencies";
import {
    dropdownWidget,
    imageWidget,
    inputNumberWidget,
    question1,
    question2,
    mockedItem,
} from "../__testdata__/renderer.testdata";
import * as Dependencies from "../dependencies";
import {Errors} from "../logging/log";
import {registerWidget} from "../widgets";
import {renderQuestion} from "../widgets/__tests__/renderQuestion";
import InputNumberExport from "../widgets/input-number";
import RadioWidgetExport from "../widgets/radio";

import MockWidgetExport from "./mock-widget";

import type {
    DropdownWidget,
    PerseusImageWidgetOptions,
    PerseusInputNumberWidgetOptions,
} from "../perseus-types";

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
        registerWidget("input-number", InputNumberExport);
        registerWidget("radio", RadioWidgetExport);
        registerWidget("mock-widget", MockWidgetExport);
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        // The Renderer uses a timer to wait for widgets to complete rendering.
        // If we don't spin the timers here, then the timer fires in the test
        // _after_ and breaks it because we do setState() in the callback,
        // and by that point the component has been unmounted.
        jest.runOnlyPendingTimers();
    });

    describe("snapshots", () => {
        it("initial render", () => {
            // Arrange and Act
            const {container} = renderQuestion(question1);

            // Assert
            expect(container).toMatchSnapshot("initial render");
        });

        it("correct answer", () => {
            // Arrange
            const {container} = renderQuestion(question1);

            // Act
            userEvent.click(screen.getByRole("button"));
            userEvent.click(screen.getAllByRole("option")[2]);
            jest.runOnlyPendingTimers();

            // Assert
            expect(container).toMatchSnapshot("correct answer");
        });

        it("incorrect answer", () => {
            // Arrange
            const {container} = renderQuestion(question1);

            // Act
            userEvent.click(screen.getByRole("button"));
            userEvent.click(screen.getAllByRole("option")[1]);
            jest.runOnlyPendingTimers();

            // Assert
            expect(container).toMatchSnapshot("incorrect answer");
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
            expect(renderer.state.lastUsedWidgetId).toBeNull();

            expect(renderer.state.widgetInfo).toStrictEqual(question1.widgets);
            expect(renderer.state.widgetProps).toMatchInlineSnapshot(`
                {
                  "dropdown 1": {
                    "choices": [
                      "greater than or equal to",
                      "less than or equal to",
                    ],
                    "placeholder": "greater/less than or equal to",
                  },
                }
            `);
        });

        it("should derive type widget ID if type missing", () => {
            // Arrange
            // Note that the types disallow this, but our Renderer handles the
            // case so for now, I'm adding this test. We can remove the test
            // if/when we clean up the code for it in _getAllWidgetsInfo().
            const question = {
                ...question1,
                widgets: {
                    ...question1.widgets,
                    // $FlowIgnore[prop-missing]
                    // $FlowIgnore[incompatible-cast]
                    // @ts-expect-error - TS2352 - Conversion of type '{ type: undefined; static?: boolean | undefined; graded?: boolean | undefined; alignment?: string | undefined; options: PerseusCategorizerWidgetOptions | null | undefined; key?: number | undefined; version?: Version | undefined; } | ... 38 more ... | { ...; }' to type 'DropdownWidget' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
                    "dropdown 1": {
                        ...question1.widgets["dropdown 1"],
                        // $FlowIgnore[incompatible-cast]
                        type: undefined,
                    } as DropdownWidget,
                },
            } as const;

            // Act
            const {renderer} = renderQuestion(question);

            // Assert
            expect(renderer.state.widgetInfo["dropdown 1"]?.type).toBe(
                "dropdown",
            );
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
                    expect(info.graded).toBeTrue();

                    sawDropdown2 = true;
                    return true;
                }
                return false;
            });

            // Assert
            expect(sawDropdown2).toBeTrue();
            // `dropdown 2` not found, however, because the Renderer doesn't
            // render widget's that don't have options defined.
            expect(widgets).toStrictEqual([null]);
        });

        it("should restore serialized state on mount if provided in prop", () => {
            // Arrange
            renderQuestion(
                question1,
                {},
                {
                    serializedState: {
                        "dropdown 1": {
                            placeholder: "greater/less than or equal to",
                            choices: [
                                "greater than or equal to",
                                "less than or equal to",
                            ],
                            selected: 2,
                        },
                    },
                },
            );

            // Assert
            expect(screen.getByRole("button")).toHaveTextContent(
                /^less than or equal to$/,
            );
        });
    });

    describe("rendering", () => {
        const images: Array<Record<any, any>> = [];
        let originalImage;

        beforeEach(() => {
            originalImage = window.Image;
            // Mock HTML Image so we can trigger onLoad callbacks and see full
            // image rendering.
            // @ts-expect-error - TS2322 - Type 'Mock<Record<string, any>, [], any>' is not assignable to type 'new (width?: number | undefined, height?: number | undefined) => HTMLImageElement'.
            window.Image = jest.fn(() => {
                const img: Record<string, any> = {};
                images.push(img);
                return img;
            });
        });

        afterEach(() => {
            window.Image = originalImage;
        });

        // Tells the image loader 1, or all, of our images loaded
        const markImagesAsLoaded = (imageIndex?: number) => {
            if (imageIndex != null) {
                const img = images[imageIndex];
                if (img?.onload) {
                    img.onload();
                }
            } else {
                images.forEach((i) => {
                    if (i?.onload) {
                        i.onload();
                    }
                });
            }
        };

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
            markImagesAsLoaded();

            // Assert
            const imageNodes = screen.queryAllByRole("img");
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
            markImagesAsLoaded();

            // Assert
            const imageNodes = screen.queryAllByRole("img");
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
            markImagesAsLoaded();

            // Assert
            expect(screen.queryAllByRole("img")).toHaveLength(1);

            const wrapperStyle = getComputedStyle(
                // $FlowIgnore[incompatible-call]
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
            markImagesAsLoaded();

            // Assert
            expect(screen.queryAllByRole("img")).toHaveLength(1);

            const wrapperStyle = getComputedStyle(
                // $FlowIgnore[incompatible-call]
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
            markImagesAsLoaded();

            // Assert
            const imageNodes = screen.queryAllByRole("img");
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
            expect(screen.queryAllByRole("button")).toHaveLength(0);
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
            // KaTeX renders async, so we have to wait until it's done.
            await waitFor(() => {
                screen.getByText("1 + 2");
            });

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
            // KaTeX renders async, so we have to wait until it's done.
            await waitFor(() => {
                screen.getByText("1 + 2");
            });

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
            // KaTeX renders async, so we have to wait until it's done.
            await waitFor(() => {
                screen.getByText("1 + 2");
            });

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
                screen.getByText("1 + 2");
            });
            expect(container).toMatchSnapshot();
        });

        it("should replace deprecated alignment tags in inline math", async () => {
            // Arrange
            const question = {
                content:
                    "$\\begin{align}\n2\\text{HCl}(\\text{aq})+\\text{Ca}(\\text{OH})_2(\\text{aq})\\rightarrow\\text{Ca}(\\text{s})+2\\text H_2\\text O(\\text l)+\\text{Cl}_2(\\text g)\n\\end{align}$",
                images: {},
                widgets: {},
            } as const;

            // Act
            renderQuestion(question);

            // Assert
            // KaTeX renders async, so we use waitFor() have to wait until it's done.
            await waitFor(() => {
                screen.getByText(/\\begin\{aligned\}.*\\end\{aligned\}/);
            });
        });
    });

    // Note that we can't use `.each` here because the three props require
    // slightly different methods to change them for our rerender() function
    describe("resets widgetInfo and widgetProps when a prop in SHOULD_CLEAR_WIDGETS_PROP_LIST changes", () => {
        let originalWidgetInfo;
        let originalWidgetProps;
        let rerender;
        let renderer;

        beforeEach(() => {
            // Arrange
            // eslint-disable-next-line testing-library/no-render-in-setup
            const result = renderQuestion(question1);
            rerender = result.rerender;
            renderer = result.renderer;

            originalWidgetInfo = clone(renderer.state.widgetInfo);
            originalWidgetProps = clone(renderer.state.widgetProps);

            // Poke the renderer so it's not in it's initial-render state
            userEvent.click(screen.getByRole("button"));
            jest.runOnlyPendingTimers(); // There's a setTimeout to open the dropdown
            userEvent.click(screen.getAllByRole("option")[1]);
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
            expect(renderer.state.widgetProps).toStrictEqual(
                originalWidgetProps,
            );
        });

        it("'problemNum' prop", () => {
            // Act
            rerender(question1, {problemNum: 1});

            // Assert
            expect(renderer.state.widgetInfo).toStrictEqual(originalWidgetInfo);
            expect(renderer.state.widgetProps).toStrictEqual(
                originalWidgetProps,
            );
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

            for (const widgetId of allWidgetIds) {
                expect(renderer.state.widgetProps[widgetId]).toStrictEqual(
                    originalWidgetProps[widgetId],
                );
            }
        });
    });

    describe("focus management", () => {
        it("should focus the first focusable widget", () => {
            // Arrange
            const question = {
                content:
                    "A dropdown [[☃ dropdown 1]]\nAn input [[☃ input-number 1]]\n\nAnd an image [[☃ image 1]].",
                images: {},
                widgets: {
                    "dropdown 1": dropdownWidget,
                    "input-number 1": inputNumberWidget,
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
            expect(focusResult).toBeTrue();
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
                            } as PerseusImageWidgetOptions,
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

        it("should call onFocusChange callback when new widget receives focus", () => {
            // Arrange
            const onFocusChange = jest.fn();
            renderQuestion(
                {
                    ...question2,
                    content:
                        "Enter 1 in this field: [[☃ input-number 1]].\n\n" +
                        "Enter 2 in this field: [[☃ input-number 2]] $60$.",
                    widgets: {
                        "input-number 1": question2.widgets["input-number 1"],
                        "input-number 2": question2.widgets["input-number 1"],
                    },
                },
                {onFocusChange},
            );

            // Act
            userEvent.click(screen.getAllByRole("textbox")[1]);

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                /* new focus path */ ["input-number 2"],
                /* old focus path */ null,
            );
        });

        it("should call onFocusChange callback when a widget loses focus", () => {
            // Arrange
            const onFocusChange = jest.fn();
            renderQuestion(
                {
                    ...question2,
                    content:
                        "Enter 1 in this field: [[☃ input-number 1]].\n\n" +
                        "Enter 2 in this field: [[☃ input-number 2]] $60$.",
                    widgets: {
                        "input-number 1": question2.widgets["input-number 1"],
                        "input-number 2": question2.widgets["input-number 1"],
                    },
                },
                {onFocusChange},
            );
            userEvent.click(screen.getAllByRole("textbox")[1]);
            onFocusChange.mockClear();

            // Act
            userEvent.tab();
            // There's a _.defer() in the blur handling
            jest.runOnlyPendingTimers();

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                /* new focus path */ null,
                /* old focus path */ ["input-number 2"],
            );
        });

        it("should throw if widget provides invalid focus path", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            const [widget2] = renderer.findWidgets("mock-widget 2");

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
            renderer.focusPath(["input-number 1"]);

            // Assert
            expect(screen.getByRole("textbox")).toHaveFocus();
        });

        it("should do nothing if requested FocusPath is already focused", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(question2, {
                onFocusChange,
            });
            renderer.focusPath(["input-number 1"]);
            onFocusChange.mockClear();

            // Act
            renderer.focusPath(["input-number 1"]);

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
                        "Input 1: [[☃ input-number 1]]\n\n" +
                        "Input 2: [[☃ input-number 2]]",
                    widgets: {
                        ...question2.widgets,
                        "input-number 2": question2.widgets["input-number 1"],
                    },
                },
                {onFocusChange},
            );
            renderer.focusPath(["input-number 1"]);
            onFocusChange.mockClear();

            // Act
            renderer.focusPath(["input-number 2"]);

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                ["input-number 2"], // New focus
                ["input-number 1"], // Old focus
            );
        });

        it("should do nothing if blurred widget is not focused", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    ...question2,
                    content:
                        "Input 1: [[☃ input-number 1]]\n\n" +
                        "Input 2: [[☃ input-number 2]]",
                    widgets: {
                        ...question2.widgets,
                        "input-number 2": question2.widgets["input-number 1"],
                    },
                },
                {onFocusChange},
            );
            // Focus _second_ input number widget
            screen.getAllByRole("textbox")[1].focus();
            onFocusChange.mockClear();

            // Act
            renderer.blurPath(["input-number 1"]);

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
                        "Input 1: [[☃ input-number 1]]\n\n" +
                        "Input 2: [[☃ input-number 2]]",
                    widgets: {
                        ...question2.widgets,
                        "input-number 2": question2.widgets["input-number 1"],
                    },
                },
                {onFocusChange},
            );
            // Focus _second_ input number widget
            screen.getAllByRole("textbox")[1].focus();
            onFocusChange.mockClear();

            // Act
            renderer.blur();
            jest.runOnlyPendingTimers(); // There's a _.defer() in this code path

            // Assert
            expect(onFocusChange).toHaveBeenCalledWith(
                null, // New focus
                ["input-number 2"], // Old focus
            );
        });

        it("should do nothing when blur() called but no widget focused", () => {
            // Arrange
            const onFocusChange = jest.fn();
            const {renderer} = renderQuestion(
                {
                    ...question2,
                    content:
                        "Input 1: [[☃ input-number 1]]\n\n" +
                        "Input 2: [[☃ input-number 2]]",
                    widgets: {
                        ...question2.widgets,
                        "input-number 2": question2.widgets["input-number 1"],
                    },
                },
                {onFocusChange},
            );

            // Act
            renderer.blur();
            jest.runOnlyPendingTimers(); // There's a _.defer() in this code path

            // Assert
            expect(onFocusChange).not.toHaveBeenCalled();
        });
    });

    describe("state serialization", () => {
        it("should request widget's serialized state if implemented", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);

            const [widget2] = renderer.findWidgets("mock-widget 2");
            expect(widget2).not.toBeUndefined();
            widget2.getSerializedState = jest.fn();

            // Act
            renderer.getSerializedState();

            // Act
            expect(widget2.getSerializedState).toHaveBeenCalled();
        });

        it("should skip restoration if state's widget ID list doesn't match renderer widgets", () => {
            // Arrange
            const errorSpy = jest.spyOn(testDependencies.Log, "error");

            const {renderer} = renderQuestion(question1);

            // Act
            renderer.restoreSerializedState({
                "group 1": {},
                "interactive-chart 1": {},
            });

            // Assert
            expect(errorSpy).toHaveBeenCalledWith(
                "Refusing to restore bad serialized state:",
                Errors.Internal,
                {
                    loggedMetadata: {
                        currentProps: expect.anything(),
                        serializedState:
                            '{"group 1":{},"interactive-chart 1":{}}',
                    },
                },
            );
        });

        it("should fire restoration callback when all widgets have restored", () => {
            // Arrange
            const makeRestoreSerializedStateMock = jest
                .fn()
                .mockImplementation((props, callback) => callback());

            const {renderer} = renderQuestion(mockedItem);
            const [widget1, widget2, widget3] = renderer.findWidgets(
                // @ts-expect-error - TS2367 - This condition will always return 'false' since the types '"video" | "image" | "iframe" | "table" | "radio" | "definition" | "group" | "matrix" | "categorizer" | "cs-program" | "dropdown" | "example-graphie-widget" | "example-widget" | ... 26 more ... | "unit-input"' and '"mock-widget"' have no overlap.
                (_, info) => info.type === "mock-widget",
            );
            widget1.restoreSerializedState = makeRestoreSerializedStateMock;
            widget2.restoreSerializedState = makeRestoreSerializedStateMock;
            widget3.restoreSerializedState = makeRestoreSerializedStateMock;

            const restorationCallback = jest.fn();

            // Act
            renderer.restoreSerializedState(
                {"mock-widget 1": {}, "mock-widget 2": {}, "mock-widget 3": {}},
                restorationCallback,
            );
            jest.runOnlyPendingTimers();

            // Assert
            expect(restorationCallback).toHaveBeenCalledTimes(1);
        });

        it("should return each widget's state from serialize()", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            const widgets = renderer.findWidgets((id) =>
                ["mock-widget 1", "mock-widget 2", "mock-widget 3"].includes(
                    id,
                ),
            );
            widgets.forEach((w) => {
                w.serialize = jest.fn(() => `State: ${w.props.widgetId}`);
            });
            // It takes a clock tick after rendering for widgetInfo to be
            // populated (which renderer uses during serialize()).
            jest.runOnlyPendingTimers();

            // Act
            const state = renderer.serialize();

            // Assert
            expect(state).toStrictEqual({
                "mock-widget 1": "State: mock-widget 1",
                "mock-widget 2": "State: mock-widget 2",
                "mock-widget 3": "State: mock-widget 3",
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

            expect(filterCalled).toBeTrue();
        });
    });

    describe("misc behaviors", () => {
        it("should be able to force re-render", () => {
            // Arrange
            const onRender = jest.fn();
            const apiOptions: Record<string, any> = {};
            const extraProps = {
                alwaysUpdate: true, // Switching to `false` to fails test
                onRender,
            } as const;
            const {rerender} = renderQuestion(
                question1,
                apiOptions,
                extraProps,
            );

            // Act
            rerender(question1, extraProps);

            // How do I tell it rerendered?
            expect(onRender).toHaveBeenCalledTimes(2);
        });

        it("should use new serializedState if getSerializedState is different", () => {
            // Act
            // Render with serialized state
            const {rerender} = renderQuestion(
                question1,
                {},
                {
                    serializedState: {
                        "dropdown 1": {
                            placeholder: "greater/less than or equal to",
                            choices: [
                                "greater than or equal to",
                                "less than or equal to",
                            ],
                            selected: 2, // <-- Important
                        },
                    },
                },
            );

            // Act
            rerender(question1, {
                serializedState: {
                    "dropdown 1": {
                        placeholder: "greater/less than or equal to",
                        choices: [
                            "greater than or equal to",
                            "less than or equal to",
                        ],
                        selected: 1, // <-- Important
                    },
                },
            });

            expect(screen.getByRole("button")).toHaveTextContent(
                /greater than or equal to/,
            );
        });

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
            let el = screen.getByRole("button");
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

        it("should force the widget to be non-static if it has a problem number", () => {
            // Arrange/Act
            const {renderer} = renderQuestion(
                {
                    ...question1,
                    widgets: {
                        ...question1.widgets,
                        "dropdown 1": {
                            ...question1.widgets["dropdown 1"],
                            static: true,
                        },
                    },
                },
                {},
                {problemNum: 1},
            );

            // Assert
            const [dropdownWidget] = renderer.findWidgets("dropdown 1");

            // Act
            expect(dropdownWidget.props.static).toBeFalse();
        });

        it("should ask each widget to show rationales", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            const widgets = renderer.findWidgets(
                // @ts-expect-error - TS2367 - This condition will always return 'false' since the types '"video" | "image" | "iframe" | "table" | "radio" | "definition" | "group" | "matrix" | "categorizer" | "cs-program" | "dropdown" | "example-graphie-widget" | "example-widget" | ... 26 more ... | "unit-input"' and '"mock-widget"' have no overlap.
                (_, info) => info.type === "mock-widget",
            );
            widgets.forEach(
                (w) =>
                    (w.showRationalesForCurrentlySelectedChoices = jest.fn()),
            );

            // Guard: If our test data were to cause this to return an empty
            // array, the rest of the assertions in this test would pass.
            expect(widgets.length).toBeGreaterThan(0);

            // Act
            renderer.showRationalesForCurrentlySelectedChoices();

            // Assert
            widgets.forEach((w) =>
                expect(
                    w.showRationalesForCurrentlySelectedChoices,
                ).toHaveBeenCalled(),
            );
        });

        it("should ask each widget to deselect incorrect choices", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            const widgets = renderer.findWidgets(
                // @ts-expect-error - TS2367 - This condition will always return 'false' since the types '"video" | "image" | "iframe" | "table" | "radio" | "definition" | "group" | "matrix" | "categorizer" | "cs-program" | "dropdown" | "example-graphie-widget" | "example-widget" | ... 26 more ... | "unit-input"' and '"mock-widget"' have no overlap.
                (_, info) => info.type === "mock-widget",
            );
            widgets.forEach(
                (w) => (w.deselectIncorrectSelectedChoices = jest.fn()),
            );

            // Guard: If our test data were to cause this to return an empty
            // array, the rest of the assertions in this test would pass.
            expect(widgets.length).toBeGreaterThan(0);

            // Act
            renderer.deselectIncorrectSelectedChoices();

            // Assert
            widgets.forEach((w) =>
                expect(w.deselectIncorrectSelectedChoices).toHaveBeenCalled(),
            );
        });

        it("should return user input", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ input-number 1]]\n\n" +
                    "Input 2: [[☃ input-number 2]]\n\n" +
                    "A widget that doesn't implement getUserInput: [[☃ image 1]]",
                widgets: {
                    ...question2.widgets,
                    "input-number 2": {
                        ...question2.widgets["input-number 1"],
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

            screen
                .getAllByRole("textbox")
                .forEach((el, i) => userEvent.type(el, i.toString()));

            // Act
            const input = renderer.getUserInput();

            // Assert
            expect(input).toStrictEqual([
                {currentValue: "0"},
                {currentValue: "1"},
                null, // image widget doesn't implement getUserinput
            ]);
        });

        it("should return all widget IDs that were rendererd", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ input-number 1]]\n\n" +
                    "Input 2: [[☃ input-number 2]]\n\n" +
                    "A widget that doesn't implement getUserInput: [[☃ image 1]]",
                widgets: {
                    ...question2.widgets,
                    "input-number 2": {
                        ...question2.widgets["input-number 1"],
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
                "input-number 1",
                "input-number 2",
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
            // "button" role is the WB dropdown's "opener" element
            // @ts-expect-error - TS2345 - Argument of type 'Element | Text | null | undefined' is not assignable to parameter of type 'HTMLElement'.
            expect(within(node).queryAllByRole("button")).toHaveLength(1);
        });

        it("should return the widget's getDOMNodeForPath() result for the widget at requested FocusPath", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            const widget2DOMNode = <span />;
            const [widget2] = renderer.findWidgets("mock-widget 2");
            widget2.getDOMNodeForPath = jest.fn(() => widget2DOMNode);

            // Act
            const node = renderer.getDOMNodeForPath(["mock-widget 2"]);

            // Assert
            expect(node).toBe(widget2DOMNode);
        });
    });

    describe("getGrammarTypeForPath", () => {
        it("should return undefined if matching widget doesn't implement getGrammarTypeForPath", () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Act
            const grammarType = renderer.getGrammarTypeForPath(["dropdown 1"]);

            // Assert
            expect(grammarType).toBeUndefined();
        });

        it("should return widget result if matching widget implements getGrammarTypeForPath", () => {
            // Arrange
            const {renderer} = renderQuestion(question2);

            // Act
            const grammarType = renderer.getGrammarTypeForPath([
                "input-number 1",
            ]);

            // Assert
            expect(grammarType).toBe("number");
        });
    });

    describe("getInputPaths", () => {
        it("should return all input paths for all rendererd widgets", () => {
            // Arrange
            const {renderer} = renderQuestion(mockedItem);
            const [mockWidget1, mockWidget2, mockWidget3] =
                renderer.findWidgets((id) =>
                    [
                        "mock-widget 1",
                        "mock-widget 2",
                        "mock-widget 3",
                    ].includes(id),
                );
            mockWidget1.getInputPaths = jest.fn(() => ["input 1"]);
            mockWidget2.getInputPaths = jest.fn(() => ["input 2", "input 3"]);
            mockWidget3.getInputPaths = jest.fn(() => [
                ["input 4", "sub-input 4.1"],
                "input 5",
            ]);

            // Act
            const inputPaths = renderer.getInputPaths();

            // Assert
            expect(inputPaths).toMatchInlineSnapshot(`
                [
                  [
                    "mock-widget 1",
                    "input 1",
                  ],
                  [
                    "mock-widget 2",
                    "input 2",
                  ],
                  [
                    "mock-widget 2",
                    "input 3",
                  ],
                  [
                    "mock-widget 3",
                    "input 4",
                    "sub-input 4.1",
                  ],
                  [
                    "mock-widget 3",
                    "input 5",
                  ],
                ]
            `);
        });
    });

    describe("emptyWidgets", () => {
        it("should return all empty widgets", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ input-number 1]]\n\n" +
                    "Input 2: [[☃ input-number 2]]",
                widgets: {
                    ...question2.widgets,
                    "input-number 2": question2.widgets["input-number 1"],
                },
            });
            userEvent.type(screen.getAllByRole("textbox")[0], "150");

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual(["input-number 2"]);
        });

        it("should not return static widgets even if empty", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ input-number 1]]\n\n" +
                    "Input 2: [[☃ input-number 2]]",
                widgets: {
                    ...question2.widgets,
                    "input-number 2": {
                        ...question2.widgets["input-number 1"],
                        static: true,
                    },
                },
            });

            // Act
            const emptyWidgets = renderer.emptyWidgets();

            // Assert
            expect(emptyWidgets).toStrictEqual(["input-number 1"]);
        });
    });

    describe("setInputValue", () => {
        it("should set the value on the requested FocusPath", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ input-number 1]]\n\n" +
                    "Input 2: [[☃ input-number 2]]",
                widgets: {
                    ...question2.widgets,
                    "input-number 2": {
                        ...question2.widgets["input-number 1"],
                        static: true,
                    },
                },
            });
            const cb = jest.fn();

            // Act
            renderer.setInputValue(["input-number 2"], "1000", cb);

            // Assert
            expect(screen.getAllByRole("textbox")[0]).toHaveValue("");
            expect(screen.getAllByRole("textbox")[1]).toHaveValue("1000");
        });

        it("should call the focus callback when value is complete", () => {
            // Arrange
            const {renderer} = renderQuestion({
                ...question2,
                content:
                    "Input 1: [[☃ input-number 1]]\n\n" +
                    "Input 2: [[☃ input-number 2]]",
                widgets: {
                    ...question2.widgets,
                    "input-number 2": {
                        ...question2.widgets["input-number 1"],
                        static: true,
                    },
                },
            });
            const cb = jest.fn();

            // Act
            renderer.setInputValue(["input-number 2"], "1000", cb);
            jest.runOnlyPendingTimers();

            // Assert
            expect(cb).toHaveBeenCalled();
        });
    });

    describe("getUserInputForWidgets", () => {
        it("should return user input for all rendered widgets", () => {
            // Arrange
            const {renderer} = renderQuestion({
                content:
                    "Input widget: [[\u2603 input-number 1]]\n\n" +
                    "Dropdown widget: [[\u2603 dropdown 1]]\n\n" +
                    "Image widget (won't have user input): [[\u2603 image 1]]\n\n" +
                    "Another input widget: [[\u2603 input-number 2]]",
                widgets: {
                    "image 1": imageWidget,
                    "input-number 1": inputNumberWidget,
                    "input-number 2": inputNumberWidget,
                    "dropdown 1": dropdownWidget,
                },
                images: {},
            });

            userEvent.type(screen.getAllByRole("textbox")[0], "100");
            userEvent.type(screen.getAllByRole("textbox")[1], "200");

            // Open the dropdown and select the second (idx: 1) item
            userEvent.click(screen.getByRole("button"));
            jest.runOnlyPendingTimers();
            userEvent.click(screen.getAllByRole("option")[1]);
            jest.runOnlyPendingTimers();

            // Act
            const userInput = renderer.getUserInputForWidgets();

            // Assert
            expect(userInput).toMatchInlineSnapshot(`
                {
                  "dropdown 1": {
                    "value": 1,
                  },
                  "image 1": null,
                  "input-number 1": {
                    "currentValue": "100",
                  },
                  "input-number 2": {
                    "currentValue": "200",
                  },
                }
            `);
        });
    });

    describe("examples", () => {
        it("should return examples if all widgets return the same examples (or null)", () => {
            // Arrange
            const {renderer} = renderQuestion({
                content:
                    "Input widget: [[\u2603 input-number 1]]\n\n" +
                    "Dropdown widget: [[\u2603 dropdown 1]]\n\n" +
                    "Image widget (won't have user input): [[\u2603 image 1]]\n\n" +
                    "Another input widget: [[\u2603 input-number 2]]",
                widgets: {
                    "image 1": imageWidget,
                    "input-number 1": inputNumberWidget,
                    "input-number 2": inputNumberWidget,
                    "dropdown 1": dropdownWidget,
                },
                images: {},
            });

            // Act
            const examples = renderer.examples();

            // Assert
            expect(examples).toMatchInlineSnapshot(`
                [
                  "**Your answer should be** ",
                  "an integer, like $6$",
                  "a *proper* fraction, like $1/2$ or $6/10$",
                  "an *improper* fraction, like $10/7$ or $14/8$",
                  "a mixed number, like $1\\ 3/4$",
                ]
            `);
        });

        it("should return nothing if widgets return the different examples", () => {
            // NOTE(jeremy): I'm unsure why we don't return examples if the
            // examples aren't the same, but this is current functionality so
            // I'm adding this test to verify the current behaviour.

            // Arrange
            const {renderer} = renderQuestion({
                content:
                    "Input widget: [[\u2603 input-number 1]]\n\n" +
                    "Dropdown widget: [[\u2603 dropdown 1]]\n\n" +
                    "Image widget (won't have user input): [[\u2603 image 1]]\n\n" +
                    "Another input widget: [[\u2603 input-number 2]]",
                widgets: {
                    "image 1": imageWidget,
                    "input-number 1": inputNumberWidget,
                    "input-number 2": {
                        ...inputNumberWidget,
                        options: {
                            ...inputNumberWidget.options,
                            answerType: "percent",
                        } as PerseusInputNumberWidgetOptions,
                    },
                    "dropdown 1": dropdownWidget,
                },
                images: {},
            });

            // Act
            const examples = renderer.examples();

            // Assert
            expect(examples).toBeNull();
        });
    });
});
