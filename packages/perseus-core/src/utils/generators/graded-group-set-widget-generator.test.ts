import {generateGradedGroupSetWidget} from "./graded-group-set-widget-generator";
import {generateGradedGroupOptions} from "./graded-group-widget-generator";

import type {GradedGroupSetWidget} from "../../data-schema";

describe("generateGradedGroupSetWidget", () => {
    it("builds a default graded group set widget", () => {
        // Arrange, Act
        const widget: GradedGroupSetWidget = generateGradedGroupSetWidget();

        // Assert
        expect(widget).toEqual({
            type: "graded-group-set",
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            alignment: "default",
            options: {
                gradedGroups: [],
            },
        });
    });

    it("builds a graded group set widget with all props", () => {
        // Arrange, Act
        const gradedGroupOptions = generateGradedGroupOptions();
        const widget: GradedGroupSetWidget = generateGradedGroupSetWidget({
            graded: true,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                gradedGroups: [gradedGroupOptions],
            },
        });

        // Assert
        expect(widget).toEqual({
            type: "graded-group-set",
            graded: true,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                gradedGroups: [gradedGroupOptions],
            },
        });
    });
});
