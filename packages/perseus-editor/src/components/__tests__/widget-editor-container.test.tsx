import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {
    CoreWidgetRegistry,
    generateImageWidget,
    generateRadioWidget,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors.testutils";
import WidgetEditorContainer from "../widget-editor-container";

import type {PerseusWidget} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("WidgetEditor", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: rs.advanceTimersByTime,
        });

        rs.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("alignment dropdown", () => {
        it("should NOT display alignment dropdown when showAlignmentOptions is false", () => {
            // Arrange
            // Mock getSupportedAlignments to return multiple alignments
            // This ensures the test is checking showAlignmentOptions, not alignment count
            rs.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditorContainer
                    id="radio 1"
                    widgetInfo={generateRadioWidget()}
                    onChange={() => {}}
                    onRemove={() => {}}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        showAlignmentOptions: false,
                    }}
                />,
            );

            // Assert
            // Even though getSupportedAlignments returns multiple alignments,
            // the dropdown should NOT be shown because showAlignmentOptions is false
            expect(
                screen.queryByRole("combobox", {name: "Alignment"}),
            ).not.toBeInTheDocument();
        });

        it("should display alignment dropdown when widget supports multiple alignments", () => {
            // Arrange
            // Mock getSupportedAlignments to return multiple alignments
            rs.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditorContainer
                    id="image 1"
                    widgetInfo={generateImageWidget()}
                    onChange={() => {}}
                    onRemove={() => {}}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        showAlignmentOptions: true,
                    }}
                />,
            );

            // Assert
            const dropdown = screen.getByRole("combobox", {
                name: "Alignment",
            });
            expect(dropdown).toBeInTheDocument();
        });

        it("should NOT display alignment dropdown when widget supports only one alignment", () => {
            // Arrange
            // Mock getSupportedAlignments to return a single alignment
            rs.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["default"]);

            render(
                <WidgetEditorContainer
                    id="radio 1"
                    widgetInfo={generateRadioWidget()}
                    onChange={() => {}}
                    onRemove={() => {}}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        showAlignmentOptions: true,
                    }}
                />,
            );

            // Assert
            expect(
                screen.queryByRole("combobox", {name: "Alignment"}),
            ).not.toBeInTheDocument();
        });

        it("should call onChange when alignment is changed", async () => {
            // Arrange
            const onChangeMock = rs.fn();
            rs.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditorContainer
                    id="image 1"
                    widgetInfo={generateImageWidget()}
                    onChange={onChangeMock}
                    onRemove={() => {}}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        showAlignmentOptions: true,
                    }}
                />,
            );

            // Act
            const dropdown = screen.getByRole("combobox", {
                name: "Alignment",
            });
            await userEvent.click(dropdown);
            const option = screen.getByRole("option", {name: "inline"});
            await userEvent.click(option);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    alignment: "inline",
                }),
            );
        });

        it("should disable alignment dropdown when editing is disabled", () => {
            // Arrange
            rs.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditorContainer
                    id="image 1"
                    widgetInfo={generateImageWidget()}
                    onChange={() => {}}
                    onRemove={() => {}}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        showAlignmentOptions: true,
                        editingDisabled: true,
                    }}
                />,
            );

            // Assert
            const dropdown = screen.getByRole("combobox", {
                name: "Alignment",
            });
            expect(dropdown).toHaveAttribute("aria-disabled", "true");
        });
    });

    describe("a widget type with no registered editor", () => {
        // An unknown widget type. We need to cast because it's not assignable to PerseusWidget.
        // eslint-disable-next-line no-restricted-syntax
        const widgetInfo = {
            type: "transformer",
            graded: true,
            options: {tools: ["translation"], drawSolutionShape: true},
        } as unknown as PerseusWidget;

        it("renders the unsupported-widget editor", () => {
            // Arrange, Act
            render(
                <WidgetEditorContainer
                    id="transformer 1"
                    widgetInfo={widgetInfo}
                    onChange={() => {}}
                    onRemove={() => {}}
                    apiOptions={ApiOptions.defaults}
                />,
            );

            // Assert
            expect(
                screen.getByText("Perseus doesn't support this widget type."),
            ).toBeInTheDocument();
        });
    });
});
