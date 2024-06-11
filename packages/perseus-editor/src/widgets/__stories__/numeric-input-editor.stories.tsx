import {action} from "@storybook/addon-actions";
import * as React from "react";

import NumericInputEditor from "../numeric-input-editor";


type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};
type MathFormat =
    | "integer"
    | "mixed"
    | "improper"
    | "proper"
    | "decimal"
    | "percent"
    | "pi";
type PerseusNumericInputAnswer = {
    message: string;
    value: number;
    status: string;
    answerForms?: ReadonlyArray<MathFormat>;
    strict: boolean;
    maxError: number | null | undefined;
    simplify: string | null | undefined;
};

export default {
    title: "PerseusEditor/Widgets/NumericInput Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return <NumericInputEditor onChange={action("onChange")} />;
};


export const ControlledInputs = (): React.ReactElement => {
    const [answers, setAnswers] = React.useState();

    function handleChange(value) {
        if (value.answers) {
            setAnswers(value.answers);
        }
    }

    return <NumericInputEditor answers={answers} onChange={handleChange} />;
};