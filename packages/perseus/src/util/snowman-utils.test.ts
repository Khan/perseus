import {
    addWidget,
    getAllWidgetIds,
    WidgetType,
    getQuestionWidgetIds,
} from "./snowman-utils";

describe("getWidgetNamesFromContent", () => {
    it("returns all widget names present in a string", () => {
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";
        const actual = getAllWidgetIds(content);
        // console.log(getAllWidgetNames(content));
        const expected = ["passage 3", "group 1", "group 12"];
        expect(actual).toEqual(expected);
    });
});

describe("Widget getter", () => {
    it("returns all question widgets in a string", () => {
        // Arrange
        const questionContent = `${addWidget(
            WidgetType.NumericInput,
            1,
        )} foo ${addWidget(WidgetType.Radio, 1)}`;

        // Act
        const questionWidget = getAllWidgetIds(questionContent);

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

describe("Add widget", () => {
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
