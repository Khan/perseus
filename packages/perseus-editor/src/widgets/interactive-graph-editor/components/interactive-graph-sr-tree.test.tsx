import {render} from "@testing-library/react";
import * as React from "react";

import {fetchAriaLabels} from "./interactive-graph-sr-tree";

describe("fetchAriaLabels", () => {
    test("should return an empty array if the container is null", () => {
        // Arrange
        const container = undefined;
        const expected = [];

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual(expected);
    });

    test("should return an array of labels", () => {
        // Arrange
        const {container} = render(
            <div>
                <div aria-label="label1" />
                <div aria-label="label2" />
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([
            {
                role: "div",
                attributes: [{name: "label", value: "label1"}],
            },
            {
                role: "div",
                attributes: [{name: "label", value: "label2"}],
            },
        ]);
    });

    test("should return an array with given roles", () => {
        // Arrange
        const {container} = render(
            <div>
                <div role="button" aria-label="aria-label1" />
                <div role="button" aria-label="aria-label2" />
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([
            {
                role: "button",
                attributes: [{name: "label", value: "aria-label1"}],
            },
            {
                role: "button",
                attributes: [{name: "label", value: "aria-label2"}],
            },
        ]);
    });

    test("should return an array with descriptions", () => {
        // Arrange
        const {container} = render(
            <div>
                <div aria-describedby="description1">label1</div>
                <div aria-describedby="description2">label2</div>
                <div id="description1">description1 content</div>
                <div id="description2">description2 content</div>
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([
            {
                role: "div",
                attributes: [
                    {name: "description", value: "description1 content"},
                ],
            },
            {
                role: "div",
                attributes: [
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should return an array for element with multiple descriptions", () => {
        // Arrange
        const {container} = render(
            <div>
                <div aria-describedby="description1 description2">label1</div>
                <div id="description1">description1 content</div>
                <div id="description2">description2 content</div>
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([
            {
                role: "div",
                attributes: [
                    {name: "description", value: "description1 content"},
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should not include descriptions that are not found", () => {
        // Arrange
        const {container} = render(
            <div>
                <div aria-describedby="description1 description2">label1</div>
                <div id="description1">description1 content</div>
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([
            {
                role: "div",
                attributes: [
                    {name: "description", value: "description1 content"},
                ],
            },
        ]);
    });

    test("should build attributes array with a variety of attributes", () => {
        // Arrange
        const {container} = render(
            <div>
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
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([
            {
                role: "div",
                attributes: [{name: "label", value: "label-only"}],
            },
            {
                role: "div",
                attributes: [
                    {name: "description", value: "description-only content "},
                ],
            },
            {
                role: "img",
                attributes: [{name: "label", value: "label with role"}],
            },
            {
                role: "button",
                attributes: [
                    {name: "label", value: "aria-label1"},
                    {name: "description", value: "description1 content"},
                ],
            },
            {
                role: "button",
                attributes: [
                    {name: "label", value: "aria-label2"},
                    {name: "description", value: "description2 content"},
                ],
            },
        ]);
    });

    test("should not add element if descriptions are not found", () => {
        // Arrange
        const {container} = render(
            <div>
                <div aria-describedby="description1 description2">label1</div>
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([]);
    });

    test("should not add element if aria attributes are not found", () => {
        // Arrange
        const {container} = render(
            <div>
                <div />
            </div>,
        );

        // Act
        const result = fetchAriaLabels(container);

        // Assert
        expect(result).toEqual([]);
    });
});
