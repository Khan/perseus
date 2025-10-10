import type {
    PerseusRenderer,
    NumericInputWidget,
    PerseusNumericInputAnswer,
} from "@khanacademy/perseus-core";

export function numericInputQuestionBuilder(): NumericInputQuestionBuilder {
    return new NumericInputQuestionBuilder();
}

class NumericInputQuestionBuilder {
    private content: string = "[[☃ numeric input 1]]";
    private static: boolean = false;
    private answers: PerseusNumericInputAnswer[] = [];
    private size: "small" | "normal" = "normal";
    private coefficient: boolean = false;

    build(): PerseusRenderer {
        return {
            content: this.content,
            images: {},
            widgets: {
                "numeric-input 1": {
                    graded: true,
                    version: {major: 0, minor: 0},
                    static: this.static,
                    type: "numeric-input",

                    options: {
                        answers: this.answers,
                        size: this.size,
                        coefficient: this.coefficient,
                        static: this.static,
                    },
                } satisfies NumericInputWidget,
            },
        };
    }

    withContent(content: string): NumericInputQuestionBuilder {
        this.content = content;
        return this;
    }

    withStatic(isStatic: boolean): NumericInputQuestionBuilder {
        this.static = isStatic;
        return this;
    }

    withSize(size: "small" | "normal"): NumericInputQuestionBuilder {
        this.size = size;
        return this;
    }
}
