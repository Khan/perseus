import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import WidgetEditor from "../widget-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("WidgetEditor", () => {
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

    describe("alignment dropdown", () => {
        it("should NOT display alignment dropdown when showAlignmentOptions is false", () => {
            // Arrange
            // Mock getSupportedAlignments to return multiple alignments
            // This ensures the test is checking showAlignmentOptions, not alignment count
            jest.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditor
                    id="radio 1"
                    type="radio"
                    alignment="default"
                    static={false}
                    graded={true}
                    options={{}}
                    version={{major: 0, minor: 0}}
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
            jest.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditor
                    id="image 1"
                    type="image"
                    alignment="block"
                    static={false}
                    graded={true}
                    options={{}}
                    version={{major: 0, minor: 0}}
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
            jest.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["default"]);

            render(
                <WidgetEditor
                    id="radio 1"
                    type="radio"
                    alignment="default"
                    static={false}
                    graded={true}
                    options={{}}
                    version={{major: 0, minor: 0}}
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
            const onChangeMock = jest.fn();
            jest.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditor
                    id="image 1"
                    type="image"
                    alignment="block"
                    static={false}
                    graded={true}
                    options={{}}
                    version={{major: 0, minor: 0}}
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
            jest.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(["block", "inline", "full-width"]);

            render(
                <WidgetEditor
                    id="image 1"
                    type="image"
                    alignment="block"
                    static={false}
                    graded={true}
                    options={{}}
                    version={{major: 0, minor: 0}}
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
});
