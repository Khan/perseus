import type numberLine from "../../widgets/number-line/number-line";
import type React from "react";

/**
 * JSON describing a number-line widget. Intended for consumption by AI tools.
 * A number-line widget displays a horizontal number line with a draggable
 * point. The learner positions the point to answer a question, optionally
 * selecting an inequality relationship (e.g. ≤, ≥) when the widget is in
 * inequality mode.
 */
export type NumberLinePromptJSON = {
    type: "number-line";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * The numeric values of the left and right endpoints of the number
         * line, e.g. `[-5, 5]`. These bounds also constrain where the learner
         * can place the point.
         */
        range: ReadonlyArray<number>;

        /**
         * The number of sub-intervals between adjacent tick marks into which
         * the point can snap. Higher values allow finer-grained placement.
         * For example, a value of `4` means the point snaps to quarter-tick
         * increments.
         */
        snapDivisions: number;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The numeric axis value where the learner has placed the point,
         * e.g. `3.5` on a `[-5, 5]` number line. Clamped to `options.range`
         * and snapped to the nearest tick increment.
         */
        numLinePosition: number;

        /**
         * The number of tick-mark divisions currently shown on the number
         * line. When the widget's `isTickCtrl` option is enabled, the learner
         * can adjust this value; otherwise it is set by the content author.
         */
        numDivisions: number;

        /**
         * The number line widget can represent a set of real numbers that is
         * greater than, greater than or equal to, less than, or less than or
         * equal to some number. Visually, the portion of the number line
         * included in this set is shaded. The `rel` property describes the
         * inequality relation the learner has selected.
         *
         * Possible values:
         * - `"eq"` – equals (standard point, no inequality shading)
         * - `"lt"` – less than
         * - `"gt"` – greater than
         * - `"le"` – less than or equal to
         * - `"ge"` – greater than or equal to
         *
         * Only meaningful when the widget is configured for inequality mode;
         * otherwise always `"eq"`.
         */
        rel: string;
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof numberLine.widget>,
): NumberLinePromptJSON => {
    const {userInput} = widgetData;
    return {
        type: "number-line",
        options: {
            range: widgetData.range,
            snapDivisions: widgetData.snapDivisions,
        },
        userInput: {
            numLinePosition: userInput.numLinePosition,
            numDivisions: userInput.numDivisions,
            rel: userInput.rel,
        },
    };
};
