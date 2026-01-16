import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import WidgetEditor from "../widget-editor";

import type {Alignment} from "@khanacademy/perseus-core";
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

            const {container} = render(
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
            const alignmentDropdown =
                // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
                container.querySelector("select.alignment");
            expect(alignmentDropdown).not.toBeInTheDocument();
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
            const dropdown = screen.getByRole("combobox");
            expect(dropdown).toBeInTheDocument();
            expect(dropdown).toHaveClass("alignment");
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
            expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
        });

        it("should display all alignment options in the dropdown", () => {
            // Arrange
            const alignments: readonly Alignment[] = [
                "block",
                "inline",
                "full-width",
            ];
            jest.spyOn(
                CoreWidgetRegistry,
                "getSupportedAlignments",
            ).mockReturnValue(alignments);

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
                        // Enable feature flag to use getSupportedAlignments instead of hardcoded values
                        flags: {
                            "new-radio-widget": false,
                            "image-widget-upgrade": false,
                            "image-widget-upgrade-alignment": true,
                        },
                    }}
                />,
            );

            // Assert
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(3);
            expect(options[0]).toHaveTextContent("block");
            expect(options[1]).toHaveTextContent("inline");
            expect(options[2]).toHaveTextContent("full-width");
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
                        // Enable feature flag to use getSupportedAlignments instead of hardcoded values
                        flags: {
                            "new-radio-widget": false,
                            "image-widget-upgrade": false,
                            "image-widget-upgrade-alignment": true,
                        },
                    }}
                />,
            );

            // Act
            const dropdown = screen.getByRole("combobox");
            await userEvent.selectOptions(dropdown, "inline");

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
            const dropdown = screen.getByRole("combobox");
            expect(dropdown).toBeDisabled();
        });
    });
});
