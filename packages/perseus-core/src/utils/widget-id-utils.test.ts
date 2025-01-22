import {
    addWidget,
    getWidgetIdsFromContent,
    getWidgetIdsFromContentByType,
    getWidgetRegex,
} from "./widget-id-utils";

describe("widgetRegex", () => {
    it("locates match and capture groups as expected for non-hyphenated widget types", () => {
        // Arrange
        const exampleContent = "Here is some content [[☃ group 1]]";

        // Act
        const match = getWidgetRegex().exec(exampleContent);

        const widgetPlaceholder = match ? match[0] : null;
        const firstCaptureGroup = match ? match[1] : null;

        //Assert
        expect(widgetPlaceholder).toEqual("[[☃ group 1]]");
        expect(firstCaptureGroup).toEqual("group 1");
    });

    it("locates match and capture groups as expected for hyphenated widget types", () => {
        // Arrange
        const exampleContent = "Here is some content [[☃ numeric-input 1]]";

        // Act
        const match = getWidgetRegex().exec(exampleContent);

        const widgetPlaceholder = match ? match[0] : null;
        const firstCaptureGroup = match ? match[1] : null;

        //Assert
        expect(widgetPlaceholder).toEqual("[[☃ numeric-input 1]]");
        expect(firstCaptureGroup).toEqual("numeric-input 1");
    });
});

describe("addWidget", () => {
    it("correctly adds a widget placeholder", () => {
        // Arrange
        const content = "Please answer this question [[☃ radio 1]]";
        const testWidgetId = "radio 1";

        // Act
        const newContent = `Please answer this question ${addWidget(
            testWidgetId,
        )}`;

        // Assert
        expect(newContent).toEqual(content);
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
            [widgetId]: {
                type: "radio",
                options: {
                    choices: [],
                },
            },
        };

        // Act
        const result = getWidgetIdsFromContentByType(type, content, widgetMap);

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
            [rightWidgetId]: {
                type: "radio",
                options: {
                    choices: [],
                },
            },
            [wrongWidgetId]: {
                type: "categorizer",
                options: {
                    items: [],
                    categories: [],
                    randomizeItems: false,
                    static: false,
                    values: [],
                },
            },
        };

        // Act
        const result = getWidgetIdsFromContentByType(type, content, widgetMap);

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
        const result = getWidgetIdsFromContentByType(type, content, widgetMap);

        // Assert
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(0);
    });
});
