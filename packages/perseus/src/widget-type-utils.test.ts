import {
    generateTestCategorizerWidget,
    generateTestPerseusItem,
    generateTestRadioWidget,
} from "./util/test-utils";
import {
    getWidgetTypeByWidgetId,
    contentHasWidgetType,
    getWidgetIdsFromContent,
    getWidgetIdsFromContentByType,
    getWidgetsMapFromItemData,
    getWidgetFromWidgetMap,
    getWidgetsFromWidgetMap,
} from "./widget-type-utils";

describe("widget-type-utils", () => {
    describe("getWidgetTypeByWidgetId", () => {
        it("returns widget type when found", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateTestRadioWidget(),
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

    describe("contentHasWidgetType", () => {
        it("returns true when found", () => {
            // Assemble
            const type = "radio";
            const widgetId = "dont-look-for-type-in-id";
            const content = `[[☃ ${widgetId}]]`;
            const widgetMap = {
                [widgetId]: generateTestRadioWidget(),
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
                [widgetId]: generateTestRadioWidget(),
            };

            // Act
            const result = contentHasWidgetType(type, content, widgetMap);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe("getWidgetIdsFromContent", () => {
        it("finds single widgetId", () => {
            // Assemble
            const widgetId = "dont-look-for-type-in-id";
            const content = `[[☃ ${widgetId}]]`;

            // Act
            const result = getWidgetIdsFromContent(content);

            // Assert
            expect(result.length).toBe(1);
            expect(result[0]).toBe(widgetId);
        });

        it("finds multiple widgetIds", () => {
            // Assemble
            const widgetId1 = "dont-look-for-type-in-id";
            const widgetId2 = "this-isnt-a-widget-type";
            const content = `[[☃ ${widgetId1}]] [[☃ ${widgetId2}]]`;

            // Act
            const result = getWidgetIdsFromContent(content);

            // Assert
            expect(result.length).toBe(2);
            expect(result[0]).toBe(widgetId1);
            expect(result[1]).toBe(widgetId2);
        });

        it("returns an empty array when nothing is found", () => {
            // Assemble
            const content = "hello world";

            // Act
            const result = getWidgetIdsFromContent(content);

            // Assert
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });

    describe("getWidgetIdsFromContentByType", () => {
        it("can get widgetId by type", () => {
            // Assemble
            const type = "radio";
            const widgetId = "dont-look-for-type-in-id";
            const content = `[[☃ ${widgetId}]]`;
            const widgetMap = {
                [widgetId]: generateTestRadioWidget(),
            };

            // Act
            const result = getWidgetIdsFromContentByType(
                type,
                content,
                widgetMap,
            );

            // Assert
            expect(result.length).toBe(1);
            expect(result[0]).toBe(widgetId);
        });

        it("ignores widgetIds of other types", () => {
            // Assemble
            const type = "radio";
            const rightWidgetId = "dont-look-for-type-in-id";
            const wrongWidgetId = "this-isnt-what-we-want";
            const content = `[[☃ ${rightWidgetId}]] [[☃ ${wrongWidgetId}]]`;
            const widgetMap = {
                [rightWidgetId]: generateTestRadioWidget(),
                [wrongWidgetId]: generateTestCategorizerWidget(),
            };

            // Act
            const result = getWidgetIdsFromContentByType(
                type,
                content,
                widgetMap,
            );

            // Assert
            expect(result.length).toBe(1);
            expect(result[0]).toBe(rightWidgetId);
        });

        it("returns an empty array when nothing is found", () => {
            // Assemble
            const type = "radio";
            const content = "";
            const widgetMap = {};

            // Act
            const result = getWidgetIdsFromContentByType(
                type,
                content,
                widgetMap,
            );

            // Assert
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });

    describe("getWidgetsMapFromItemData", () => {
        it("returns the widgets map from itemData", () => {
            // Assemble
            const itemData = generateTestPerseusItem();
            const widgetId = "dont-look-for-type-in-id";
            const widgetMap = {
                [widgetId]: generateTestRadioWidget(),
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
                [widgetId]: generateTestRadioWidget(),
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
                [widgetId]: generateTestRadioWidget(),
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
                [widgetId1]: generateTestRadioWidget(),
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
                [rightWidgetId]: generateTestRadioWidget(),
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
