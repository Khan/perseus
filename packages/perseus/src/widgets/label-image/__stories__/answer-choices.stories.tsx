import * as React from "react";

import AnswerChoices from "../answer-choices";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Widgets/Label Image/Answer Choices",
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

const WithState = ({multipleSelect}) => {
    const [choices, setChoices] = React.useState([...defaultChoices]);

    const handleChange = (selection) => {
        setChoices([
            ...choices.map((choice, index) => ({
                ...choice,
                checked: selection[index],
            })),
        ]);
    };

    return (
        <AnswerChoices
            choices={choices}
            multipleSelect={multipleSelect}
            onChange={(selection) => handleChange(selection)}
            opener={() => <button>Open</button>}
        />
    );
};

WithState.defaultProps = {
    multipleSelect: false,
};

export const SingleSelect = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};

export const MultipleSelect = (args: StoryArgs): React.ReactElement => {
    return <WithState multipleSelect={true} />;
};
