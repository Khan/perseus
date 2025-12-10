import {
    generateRadioOptions,
    generateRadioWidget,
} from "./radio-widget-generator";

describe("generateRadioOptions", () => {
    it("builds a default radio options", () => {
        // Arrange, Act
        const options = generateRadioOptions();

        // Assert
        expect(options.choices).toEqual([
            {content: "", id: "radio-choice-0"},
            {content: "", id: "radio-choice-1"},
            {content: "", id: "radio-choice-2"},
            {content: "", id: "radio-choice-3"},
        ]);
        expect(options.randomize).toBe(false);
        expect(options.hasNoneOfTheAbove).toBe(false);
        expect(options.multipleSelect).toBe(false);
        expect(options.countChoices).toBe(false);
        expect(options.deselectEnabled).toBe(false);
    });

    it("builds a radio options with all props", () => {
        // Arrange, Act
        const options = generateRadioOptions({
            choices: [{content: "choice 1", id: "choice-1"}],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
        });

        // Assert
        expect(options.choices).toEqual([
            {content: "choice 1", id: "choice-1"},
        ]);
        expect(options.randomize).toBe(true);
        expect(options.hasNoneOfTheAbove).toBe(true);
        expect(options.multipleSelect).toBe(true);
        expect(options.countChoices).toBe(true);
        expect(options.deselectEnabled).toBe(true);
    });
});

describe("generateRadioWidget", () => {
    it("builds a default radio widget", () => {
        // Arrange, Act
        const widget = generateRadioWidget();

        // Assert
        expect(widget.type).toBe("radio");
        expect(widget.graded).toBe(true);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.static).toBe(false);
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            choices: [
                {content: "", id: "radio-choice-0"},
                {content: "", id: "radio-choice-1"},
                {content: "", id: "radio-choice-2"},
                {content: "", id: "radio-choice-3"},
            ],
            randomize: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            countChoices: false,
            deselectEnabled: false,
        });
    });

    it("builds a radio widget with all props", () => {
        // Arrange, Act
        const widget = generateRadioWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                choices: [{content: "choice 1", id: "choice-1"}],
                randomize: true,
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                countChoices: true,
                deselectEnabled: true,
            },
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: [{content: "choice 1", id: "choice-1"}],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
        });
    });

    it("adds options when option builder is used", () => {
        // Arrange, Act
        const widget = generateRadioWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateRadioOptions({
                choices: [{content: "choice 1", id: "choice-1"}],
                randomize: true,
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                countChoices: true,
                deselectEnabled: true,
            }),
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: [{content: "choice 1", id: "choice-1"}],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
        });
    });
});
