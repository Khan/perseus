import {addWidget, getWidgetRegex} from "./snowman-utils";

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
