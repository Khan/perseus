import type radio from "../../widgets/radio";
import type {
    PerseusRadioUserInput,
    RecursiveReadonly,
} from "@khanacademy/perseus-core";
import type React from "react";

/**
 * A single answer choice in a radio widget.
 */
type BasicOption = {
    /**
     * The label displayed for this choice.
     */
    value: string;

    /**
     * An opaque string that uniquely identifies this choice within the radio
     * widget. The format is subject to change.
     */
    id: string;

    /**
     * Rationale for why this answer is correct or incorrect. Shown to the
     * learner when they select an incorrect answer. Only present when the
     * content creator supplied one.
     */
    rationale?: string;
};

/**
 * JSON describing a radio (multiple-choice) widget. Intended for consumption
 * by AI tools. A radio widget presents a list of answer choices and asks the
 * learner to select one (or, when multiple-select is enabled, one or more).
 */
export type RadioPromptJSON = {
    type: "radio";

    /**
     * Whether the widget includes a "None of the above" option. When true,
     * the last entry in `options` represents that special choice.
     */
    // TODO(LEMS-4033): Don't expose this; instead, communicate on the option
    //  object whether each option is "none of the above".
    hasNoneOfTheAbove: boolean;

    /**
     * The answer choices presented to the learner, in the order they appear
     * on screen. The first choice is labeled "A", the second is "B", and so
     * on.
     */
    options: BasicOption[];

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The IDs of the choices the learner has selected. Each entry
         * corresponds to a choice's `id` field in `options`. Order is
         * insignificant — scoring uses set membership, not position.
         */
        selectedOptions: ReadonlyArray<string>;
    };
};

export const getPromptJSON = (
    widgetData: RecursiveReadonly<React.ComponentProps<typeof radio.widget>>,
    userInput: RecursiveReadonly<PerseusRadioUserInput>,
): RadioPromptJSON => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const choices = widgetData.choices || [];

    const options = choices.map((choice) => {
        const option: BasicOption = {
            value: choice.content,
            id: choice.id,
        };
        if (choice.rationale) {
            option.rationale = choice.rationale;
        }
        return option;
    });

    const hasNoneOfTheAbove = choices.some((choice) => choice.isNoneOfTheAbove);

    return {
        type: "radio",
        hasNoneOfTheAbove,
        options,
        userInput: {
            selectedOptions: userInput?.selectedChoiceIds ?? [],
        },
    };
};
