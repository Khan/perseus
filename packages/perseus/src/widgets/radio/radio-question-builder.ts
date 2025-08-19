import type {
    PerseusRadioChoice,
    PerseusRenderer,
    RadioWidget,
} from "@khanacademy/perseus-core";

export function radioQuestionBuilder(): RadioQuestionBuilder {
    return new RadioQuestionBuilder();
}

class RadioQuestionBuilder {
    private content: string = "[[☃ radio 1]]";
    private choices: PerseusRadioChoice[] = [];
    private countChoices?: boolean;
    private hasNoneOfTheAbove?: boolean;
    private multipleSelect?: boolean;
    private randomize?: boolean;
    private static?: boolean;
    private numCorrect?: number;

    build(): PerseusRenderer {
        return {
            content: this.content,
            images: {},
            widgets: {
                "radio 1": {
                    graded: true,
                    version: {major: 0, minor: 0},
                    static: this.static,
                    type: "radio",
                    alignment: "default",

                    options: {
                        choices: this.choices,
                        numCorrect: this.numCorrect,
                        hasNoneOfTheAbove: this.hasNoneOfTheAbove,
                        multipleSelect: this.multipleSelect,
                        countChoices: this.countChoices,
                        randomize: this.randomize,
                    },
                } satisfies RadioWidget,
            },
        };
    }

    withContent(content: string): RadioQuestionBuilder {
        this.content = content;
        return this;
    }

    withCountChoices(countChoices: boolean): RadioQuestionBuilder {
        this.countChoices = countChoices;
        return this;
    }

    withHasNoneOfTheAbove(hasNoneOfTheAbove: boolean): RadioQuestionBuilder {
        this.hasNoneOfTheAbove = hasNoneOfTheAbove;
        return this;
    }

    withMultipleSelect(multipleSelect: boolean): RadioQuestionBuilder {
        this.multipleSelect = multipleSelect;
        return this;
    }

    withRandomize(randomize: boolean): RadioQuestionBuilder {
        this.randomize = randomize;
        return this;
    }

    withStatic(isStatic: boolean): RadioQuestionBuilder {
        this.static = isStatic;
        return this;
    }

    withNumCorrect(numCorrect: number): RadioQuestionBuilder {
        this.numCorrect = numCorrect;
        return this;
    }

    addChoice(
        content: string,
        options?: {
            correct?: boolean;
            rationale?: string;
            isNoneOfTheAbove?: boolean;
        },
    ): RadioQuestionBuilder {
        this.choices.push({
            id: crypto.randomUUID(),
            content,
            correct: options?.correct,
            rationale: options?.rationale,
            isNoneOfTheAbove: options?.isNoneOfTheAbove,
        });
        return this;
    }
}
