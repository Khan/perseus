import {
    addWidget,
    getAllWidgetIds,
    WidgetType,
    getQuestionWidgetIds,
    getAllWidgetTypes,
    widgetRegex,
} from "./snowman-utils";

describe("widgetRegex", () => {
    it("locates match and capture groups as expected for non-hyphenated widget types", () => {
        // Arrange
        const exampleContent = "Here is some content [[☃ group 1]]";
        // Act
        const match = widgetRegex.exec(exampleContent);
        const firstPlaceholder = match ? match[0] : null;
        const firstCaptureGroup = match ? match[1] : null;
        const secondCaptureGroup = match ? match[2] : null;

        //Assert
        expect(firstPlaceholder).toEqual("[[☃ group 1]]");
        expect(firstCaptureGroup).toEqual("group 1");
        expect(secondCaptureGroup).toEqual("group");
    });

    it("locates match and capture groups as expected for hyphenated widget types", () => {
        // Arrange
        const exampleContent = "Here is some content [[☃ numeric-input 1]]";
        // Act
        const match = widgetRegex.exec(exampleContent);
        const firstPlaceholder = match ? match[0] : null;
        const firstCaptureGroup = match ? match[1] : null;
        const secondCaptureGroup = match ? match[2] : null;

        //Assert
        expect(firstPlaceholder).toEqual("[[☃ numeric-input 1]]");
        expect(firstCaptureGroup).toEqual("numeric-input 1");
        expect(secondCaptureGroup).toEqual("numeric-input");
    });
});

describe("getAllWidgetTypes", () => {
    it("returns all widget types present in a string with no duplicates", () => {
        // Arrange
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";

        // Act
        const actual = getAllWidgetTypes(content);
        const expected = ["passage", "group"];

        // Assert
        expect(actual).toEqual(expected);
    });
});

describe("getAllWidgetIds", () => {
    it("returns all widget Ids present in a string", () => {
        // Arrange
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";

        // Act
        const actual = getAllWidgetIds(content);
        const expected = ["passage 3", "group 1", "group 12"];

        // Assert
        expect(actual).toEqual(expected);
    });
});

describe("getQuestionWidgetIds", () => {
    it("returns all question widgets in a string", () => {
        // Arrange
        const questionContent = `${addWidget(
            WidgetType.NumericInput,
            1,
        )} foo ${addWidget(WidgetType.Radio, 1)}`;

        // Act
        const questionWidget = getQuestionWidgetIds(questionContent);

        // Assert
        expect(questionWidget).toEqual(["numeric-input 1", "radio 1"]);
    });

    it("does not return non-question widgets", () => {
        // Arrange
        const questionContent = `${addWidget(
            WidgetType.NumericInput,
            1,
        )} ${addWidget(WidgetType.Video, 1)} ${addWidget(WidgetType.Radio, 1)}`;

        // Act
        const questionWidgetNames = getQuestionWidgetIds(questionContent);

        // Assert
        expect(questionWidgetNames).toEqual(["numeric-input 1", "radio 1"]);
    });
});

describe("addWidget", () => {
    it("correctly adds a widget placeholder", () => {
        // Arrange
        const content = "Please answer this question [[☃ radio 1]]";
        const testWidgetType = WidgetType.Radio;
        const testWidgetInstance = 1;

        // Act
        const newContent = `Please answer this question ${addWidget(
            testWidgetType,
            testWidgetInstance,
        )}`;

        // Assert
        expect(newContent).toEqual(content);
    });
});
