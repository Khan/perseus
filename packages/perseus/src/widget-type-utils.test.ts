import {
    generateInteractiveGraphOptions,
    generateInteractiveGraphWidget,
    generateRadioWidget,
} from "@khanacademy/perseus-core";

import {generateTestCategorizerWidget} from "./util/test-utils";
import {
    getWidgetTypeByWidgetId,
    contentHasWidgetType,
    getWidgetFromWidgetMap,
    getWidgetsFromWidgetMap,
    getWidgetSubTypeByWidgetId,
    getWidgetSubType,
} from "./widget-type-utils";

describe("widget-type-utils", () => {
    describe("getWidgetTypeByWidgetId", () => {
        it("returns widget type when found", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const widgetType = getWidgetTypeByWidgetId(widgetId, widgetMap);

            // Assert
            expect(widgetType).toBe("radio");
        });

        it("returns null when not found", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {};

            // Act
            const widgetType = getWidgetTypeByWidgetId(widgetId, widgetMap);

            // Assert
            expect(widgetType).toBeNull();
        });
    });

    describe("getWidgetSubType", () => {
        it("returns graph type for interactive-graph", () => {
            const widget = generateInteractiveGraphWidget({
                options: generateInteractiveGraphOptions({
                    graph: {type: "segment"},
                }),
            });
            const subType = getWidgetSubType(widget.type, widget.options);
            expect(subType).toBe("segment");
        });

        it("returns 'single-select' for radio without multipleSelect", () => {
            const widget = generateRadioWidget();
            const subType = getWidgetSubType(widget.type, widget.options);
            expect(subType).toBe("single-select");
        });

        it("returns 'multiple-select' for radio with multipleSelect", () => {
            const widget = generateRadioWidget({
                options: {choices: [], multipleSelect: true},
            });
            const subType = getWidgetSubType(widget.type, widget.options);
            expect(subType).toBe("multiple-select");
        });

        it("returns null for widget without a subtype", () => {
            const widget = generateTestCategorizerWidget();
            const subType = getWidgetSubType(widget.type, widget.options);
            expect(subType).toBeNull();
        });
    });

    describe("getWidgetSubTypeByWidgetId", () => {
        it("returns widget subtype when found", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateInteractiveGraphWidget(),
            };

            // Act
            const widgetSubType = getWidgetSubTypeByWidgetId(
                widgetId,
                widgetMap,
            );

            // Assert
            expect(widgetSubType).toBe("linear");
        });

        it("returns 'single-select' for radio widget without multipleSelect", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const widgetSubType = getWidgetSubTypeByWidgetId(
                widgetId,
                widgetMap,
            );

            // Assert
            expect(widgetSubType).toBe("single-select");
        });

        it("returns 'multiple-select' for radio widget with multipleSelect", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget({
                    options: {
                        choices: [],
                        multipleSelect: true,
                    },
                }),
            };

            // Act
            const widgetSubType = getWidgetSubTypeByWidgetId(
                widgetId,
                widgetMap,
            );

            // Assert
            expect(widgetSubType).toBe("multiple-select");
        });

        it("returns null when widget does not have a subtype", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateTestCategorizerWidget(),
            };

            // Act
            const widgetSubType = getWidgetSubTypeByWidgetId(
                widgetId,
                widgetMap,
            );

            // Assert
            expect(widgetSubType).toBeNull();
        });

        it("returns null when not found", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {};

            // Act
            const widgetType = getWidgetSubTypeByWidgetId(widgetId, widgetMap);

            // Assert
            expect(widgetType).toBeNull();
        });
    });

    describe("contentHasWidgetType", () => {
        it("returns true when found", () => {
            // Assemble
            const type = "radio";
            const widgetId = "dont-look-for-type-in-id";
            const content = `[[☃ ${widgetId}]]`;
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const result = contentHasWidgetType(type, content, widgetMap);

            // Assert
            expect(result).toBe(true);
        });

        it("returns false when not found", () => {
            // Assemble
            const type = "radio";
            const widgetId = "dont-look-for-type-in-id";
            const content = "hello world";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const result = contentHasWidgetType(type, content, widgetMap);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("getWidgetFromWidgetMap", () => {
        it("returns widget from widgetMap", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const result = getWidgetFromWidgetMap(widgetId, widgetMap);

            // Assert
            expect(result?.type).toBe("radio");
        });
    });

    describe("getWidgetsFromWidgetMap", () => {
        it("gets a single widget", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const result = getWidgetsFromWidgetMap([widgetId], widgetMap);

            // Assert
            expect(result?.[widgetId].type).toBe("radio");
        });

        it("gets multiple widgets", () => {
            // Assemble
            const widgetId1 = "dont-look-for-type-in-id";
            const widgetId2 = "this-is-another-widget-id";
            const widgetMap = {
                [widgetId1]: generateRadioWidget(),
                [widgetId2]: generateTestCategorizerWidget(),
            };

            // Act
            const result = getWidgetsFromWidgetMap(
                [widgetId1, widgetId2],
                widgetMap,
            );

            // Assert
            expect(result?.[widgetId1].type).toBe("radio");
            expect(result?.[widgetId2].type).toBe("categorizer");
        });

        it("gets ignores unwanted widgets", () => {
            // Assemble
            const rightWidgetId = "dont-look-for-type-in-id";
            const wrongWidgetId = "this-is-another-widget-id";
            const widgetMap = {
                [rightWidgetId]: generateRadioWidget(),
                [wrongWidgetId]: generateTestCategorizerWidget(),
            };

            // Act
            const result = getWidgetsFromWidgetMap([rightWidgetId], widgetMap);

            // Assert
            expect(result?.[rightWidgetId].type).toBe("radio");
            expect(result?.[wrongWidgetId]).toBeUndefined();
        });
    });
});
