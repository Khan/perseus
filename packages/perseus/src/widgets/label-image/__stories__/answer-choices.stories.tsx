import * as React from "react";

import AnswerChoices from "../answer-choices";

import type {AnswerType} from "../answer-choices";

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

class WithState extends React.Component<
    {
        multipleSelect: boolean;
    },
    {
        choices: ReadonlyArray<AnswerType>;
    }
> {
    static defaultProps = {
        multipleSelect: false,
    };

    state = {
        choices: [...defaultChoices],
    };

    handleChange(selection) {
        const {choices} = this.state;

        this.setState({
            choices: choices.map((choice, index) => ({
                ...choice,
                checked: selection[index],
            })),
        });
    }

    render(): React.ReactElement {
        const {multipleSelect} = this.props;

        const {choices} = this.state;

        return (
            <AnswerChoices
                choices={choices}
                multipleSelect={multipleSelect}
                onChange={(selection) => this.handleChange(selection)}
            />
        );
    }
}

export const SingleSelect: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <WithState />;
};

export const MultipleSelect: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <WithState multipleSelect={true} />;
};
