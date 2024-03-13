import {
    addWidget,
    getAllWidgetNames,
    WidgetType,
    getQuestionWidgetNames,
} from "./snowman-utils";

describe("getWidgetNamesFromContent", () => {
    it("returns all widget names present in a string", () => {
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";
        const actual = getAllWidgetNames(content);
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
        const questionWidget = getAllWidgetNames(questionContent);

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
        const questionWidgetNames = getQuestionWidgetNames(questionContent);

        // Assert
        expect(questionWidgetNames).toEqual(["numeric-input 1", "radio 1"]);
    });
});
