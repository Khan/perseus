import * as React from "react";

import FreeResponseEditor from "../free-response-editor";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = Record<any, any>;

const meta: Meta<typeof FreeResponseEditor> = {
    component: FreeResponseEditor,
    title: "Widgets/Free Response/Editor Demo",
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding a free response widget that allow users to enter open-ended text answers.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};

export default meta;
type Story = StoryObj<typeof FreeResponseEditor>;

export const NoCriteria: Story = {
    args: {},
};

export const OneCriterion: Story = {
    args: {
        scoringCriteria: [
            {
                text: "50 points for Gryffindor!",
            },
        ],
    },
};

export const ThreeCriteria: Story = {
    args: {
        scoringCriteria: [
            {
                text: "50 points for Gryffindor!",
            },
            {
                text: "50 points for Slytherin!",
            },
            {
                text: "50 points for Hufflepuff!",
            },
        ],
    },
};

/**
 * An example story showing how the editor looks when a widget is contained
 * in the free response widget's question field. Widgets are not allowed in
 * the free response widget.
 */
export const QuestionWithWidget: Story = {
    args: {
        question: "[[\u2603 radio 1]]",
    },
};

type State = Partial<PropsFor<typeof FreeResponseEditor>>;

const WithState = () => {
    const [state, setState] = React.useState<State>({
        allowUnlimitedCharacters: false,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is is the truth?",
        scoringCriteria: [{text: ""}],
    });

    const onChange = (options: State) => {
        setState({...state, ...options});
    };

    return <FreeResponseEditor {...state} onChange={onChange} />;
};

export const Editable = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
