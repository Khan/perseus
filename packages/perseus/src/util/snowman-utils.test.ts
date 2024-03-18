import {
    addWidget,
    getAllWidgetIds,
    WidgetType,
    getQuestionWidgetIds,
    getAllWidgetTypes,
} from "./snowman-utils";

describe("getWidgetTypes", () => {
    it("returns all widget types present in a string with no duplicates", () => {
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";
        const actual = getAllWidgetTypes(content);
        const expected = ["passage", "group"];
        expect(actual).toEqual(expected);
    });
});

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

describe("getAllWidgetIds", () => {
    it("returns all widget names present in a string", () => {
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";
        const actual = getAllWidgetIds(content);
        const expected = ["passage 3", "group 1", "group 12"];
        expect(actual).toEqual(expected);
    });

    it("returns all widget types present in a string without duplicates", () => {
        const content =
            "> [[☃ passage 3]]\n\n=====\n\n###Questions for Passage 1\n\n[[☃ group 1]]  \n[[☃ group 12]]  \n\n$$\n";
        const actual = getAllWidgetIds(content);
        // console.log(getAllWidgetNames(content));
        const expected = ["passage 3", "group 1", "group 12"];
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
