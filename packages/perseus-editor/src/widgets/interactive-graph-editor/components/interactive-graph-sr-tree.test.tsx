import {View} from "@khanacademy/wonder-blocks-core";
import {screen, render} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import InteractiveGraphSRTree, {
    getAccessibilityAttributes,
} from "./interactive-graph-sr-tree";

import type {UserEvent} from "@testing-library/user-event";

describe("InteractiveGraphSRTree", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });
    test("should show the heading and the switch even if empty", () => {
        // Arrange
        const defaultProps = {
            graphId: "test-id",
            correct: {},
            fullGraphAriaLabel: "full graph aria label",
            fullGraphAriaDescription: "full graph description",
            lockedFigures: [],
        };

        // Act
        render(<InteractiveGraphSRTree {...defaultProps} />);
        const heading = screen.getByText("Screen reader tree");
        const switchElement = screen.getByRole("switch", {
            name: "Show HTML roles/tags",
        });

        // Assert
        expect(heading).toBeInTheDocument();
        expect(switchElement).toBeInTheDocument();
    });

    test("should have an empty list if mafs graph is not found", () => {
        // Arrange
        const defaultProps = {
            graphId: "test-id",
            correct: {},
            fullGraphAriaLabel: "full graph aria label",
            fullGraphAriaDescription: "full graph description",
            lockedFigures: [],
        };

        // Act
        render(<InteractiveGraphSRTree {...defaultProps} />);
        const list = screen.getByRole("list");

        // Assert
        expect(list).toBeEmptyDOMElement();
    });

    test("should show the tree with the correct aria attributes", () => {
        // Arrange
        const defaultProps = {
            graphId: "test-id",
            correct: {},
            fullGraphAriaLabel: "full graph aria label",
            fullGraphAriaDescription: "full graph description",
            lockedFigures: [],
        };

        // Act
        render(
            <View id="test-id">
                <View className="mafs-graph-container">
                    <View
                        className="mafs-graph-inner"
                        aria-label="this is the inner graph"
                    />
                </View>
                <InteractiveGraphSRTree {...defaultProps} />
            </View>,
        );

        const shownClassName = screen.getByText("mafs-graph-inner");
        const labelPill = screen.getByText("label");
        const shownInnerLabel = screen.getByText("this is the inner graph");

        // Assert
        expect(shownClassName).toBeInTheDocument();
        expect(labelPill).toBeInTheDocument();
        expect(shownInnerLabel).toBeInTheDocument();
    });

    test("should show the tree with the roles/tags when toggled", async () => {
        // Arrange
        const defaultProps = {
            graphId: "test-id",
            correct: {},
            fullGraphAriaLabel: "full graph aria label",
            fullGraphAriaDescription: "full graph description",
            lockedFigures: [],
        };
        render(
            <View id="test-id">
                <View className="mafs-graph-container">
                    <View
                        className="inner-div-1"
                        aria-label="aria 1"
                        role="img"
                    />
                    <View className="inner-div-2" aria-label="aria 2" />
                </View>
                <InteractiveGraphSRTree {...defaultProps} />
            </View>,
        );

        // Act
        const switchElement = screen.getByRole("switch", {
            name: "Show HTML roles/tags",
        });
        await userEvent.click(switchElement);

        const shownClassName1 = screen.getByText("inner-div-1");
        const shownClassName2 = screen.getByText("inner-div-2");
        const labelPills = screen.getAllByText("label");
        const aria1 = screen.getByText("aria 1");
        const aria2 = screen.getByText("aria 2");

        // should show the roles/tags
        const role = screen.getByText("img");
        const tag = screen.getByText("div");

        // Assert
        expect(shownClassName1).toBeInTheDocument();
        expect(shownClassName2).toBeInTheDocument();
        expect(labelPills).toHaveLength(2);
        expect(aria1).toBeInTheDocument();
        expect(aria2).toBeInTheDocument();
        expect(role).toBeInTheDocument();
        expect(tag).toBeInTheDocument();
    });
});

describe("fetchAriaLabels", () => {
    test("should return an empty array if the container is not found", () => {
        // Arrange
        const expected = [];

        // Act
        const result = getAccessibilityAttributes("something");

        // Assert
        expect(result).toEqual(expected);
    });

    test("should return an array of labels", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-label="label1" />
                <div aria-label="label2" />
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "",
                attributes: [{name: "label", value: "label1"}],
            },
            {
                roleOrTag: "div",
                className: "",
                attributes: [{name: "label", value: "label2"}],
            },
        ]);
    });

    test("should return an array with given roles", () => {
        // Arrange
        render(
            <div id="test-id">
                <div role="button" aria-label="aria-label1" />
                <div role="button" aria-label="aria-label2" />
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "button",
                className: "",
                attributes: [{name: "label", value: "aria-label1"}],
            },
            {
                roleOrTag: "button",
                className: "",
                attributes: [{name: "label", value: "aria-label2"}],
            },
        ]);
    });

    test("should include provided class", () => {
        // Arrange
        render(
            <div id="test-id">
                <div className="class1" aria-label="label1" />
                <div className="class2" aria-label="label2" />
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "class1",
                attributes: [{name: "label", value: "label1"}],
            },
            {
                roleOrTag: "div",
                className: "class2",
                attributes: [{name: "label", value: "label2"}],
            },
        ]);
    });

    test("should return last class if multiple classes are provided", () => {
        // Arrange
        render(
            <div id="test-id">
                <div
                    className="class1 class2 class3 class4"
                    aria-label="label1"
                />
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "class4",
                attributes: [{name: "label", value: "label1"}],
            },
        ]);
    });

    test("should return an array with descriptions", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-describedby="description1">label1</div>
                <div aria-describedby="description2">label2</div>
                <div id="description1">description1 content</div>
                <div id="description2">description2 content</div>
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "",
                attributes: [
                    {name: "description", value: "description1 content"},
                ],
            },
            {
                roleOrTag: "div",
                className: "",
                attributes: [
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should return an array for element with multiple descriptions", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-describedby="description1 description2">label1</div>
                <div id="description1">description1 content</div>
                <div id="description2">description2 content</div>
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "",
                attributes: [
                    {name: "description", value: "description1 content"},
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should return an array for element with multiple descriptions with multiple spaces", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-describedby="description1     description2">
                    label1
                </div>
                <div id="description1">description1 content</div>
                <div id="description2">description2 content</div>
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "",
                attributes: [
                    {name: "description", value: "description1 content"},
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should not include descriptions that are not found", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-describedby="description1 description2">label1</div>
                <div id="description1">description1 content</div>
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "",
                attributes: [
                    {name: "description", value: "description1 content"},
                ],
            },
        ]);
    });

    test("should build attributes array with a variety of attributes", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-label="label-only" />
                <div aria-describedby="description-only" />
                <div role="img" aria-label="label with role" />
                <div
                    role="button"
                    aria-label="aria-label1"
                    aria-describedby="description1"
                />
                <div
                    role="button"
                    aria-label="aria-label2"
                    aria-describedby="description2"
                />
                <div id="description-only">description-only content </div>
                <div id="description1">description1 content</div>
                <div id="description2">description2 content</div>
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([
            {
                roleOrTag: "div",
                className: "",
                attributes: [{name: "label", value: "label-only"}],
            },
            {
                roleOrTag: "div",
                className: "",
                attributes: [
                    {name: "description", value: "description-only content "},
                ],
            },
            {
                roleOrTag: "img",
                className: "",
                attributes: [{name: "label", value: "label with role"}],
            },
            {
                roleOrTag: "button",
                className: "",
                attributes: [
                    {name: "label", value: "aria-label1"},
                    {name: "description", value: "description1 content"},
                ],
            },
            {
                roleOrTag: "button",
                className: "",
                attributes: [
                    {name: "label", value: "aria-label2"},
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should not add element if descriptions are not found", () => {
        // Arrange
        render(
            <div id="test-id">
                <div aria-describedby="description1 description2">label1</div>
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([]);
    });

    test("should not add element if aria attributes are not found", () => {
        // Arrange
        render(
            <div id="test-id">
                <div />
            </div>,
        );

        // Act
        const result = getAccessibilityAttributes("test-id");

        // Assert
        expect(result).toEqual([]);
    });
});
