import {
    generateInteractiveGraphWidget,
    generateRadioWidget,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";

import {generateTestCategorizerWidget} from "./util/test-utils";
import {
    getWidgetTypeByWidgetId,
    contentHasWidgetType,
    getWidgetsMapFromItemData,
    getWidgetFromWidgetMap,
    getWidgetsFromWidgetMap,
    getWidgetSubTypeByWidgetId,
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

        it("returns null when widget does not have a subtype", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };

            // Act
            const widgetType = getWidgetSubTypeByWidgetId(widgetId, widgetMap);

            // Assert
            expect(widgetType).toBeNull();
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

    describe("getWidgetsMapFromItemData", () => {
        it("returns the widgets map from itemData", () => {
            // Assemble
            const itemData = generateTestPerseusItem();
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateRadioWidget(),
            };
            itemData.question.widgets = widgetMap;

            // Act
            const result = getWidgetsMapFromItemData(itemData);

            // Assert
            expect(result?.[widgetId].type).toBe("radio");
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
