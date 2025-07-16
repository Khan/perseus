import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import AnswerChoices from "../answer-choices";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Label Image/Answer Choices",
} as Story;

const defaultChoices = [
    {
        content: "Lamborghini",
        checked: false,
    },
    {
        content: "BMW",
        checked: false,
    },
    {
        content: "Volkswagen",
        checked: false,
    },
    {
        content: "Fiat",
        checked: false,
    },
    {
        content: "$\\displaystyle f(x)=\\frac{1}{x}$",
        checked: false,
    },
    {
        content: "Porsche",
        checked: false,
    },
    {
        content: "Ferrari",
        checked: false,
    },
];

const WithState = ({multipleSelect = false}) => {
    const [choices, setChoices] = React.useState([...defaultChoices]);
    const [isOpened, setIsOpened] = React.useState(false);

    const handleChange = (selection) => {
        setChoices([
            ...choices.map((choice, index) => ({
                ...choice,
                checked: selection[index],
            })),
        ]);
    };

    return (
        <>
            <AnswerChoices
                choices={choices}
                multipleSelect={multipleSelect}
                onChange={(selection) => handleChange(selection)}
                opener={() => <button>{isOpened ? "Close" : "Open"}</button>}
                onToggle={(opened) => setIsOpened(opened)}
                disabled={false}
            />
            <>
                {choices
                    .filter(({checked}) => checked)
                    .map(({content}) => (
                        <LabelLarge key={content}>{content}</LabelLarge>
                    ))}
            </>
        </>
    );
};

export const SingleSelect = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};

export const MultipleSelect = (args: StoryArgs): React.ReactElement => {
    return <WithState multipleSelect={true} />;
};
