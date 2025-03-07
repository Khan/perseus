import * as React from "react";

import FreeResponseEditor from "../free-response-editor";

import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {Meta, StoryObj} from "@storybook/react";

type StoryArgs = Record<any, any>;

const meta: Meta<typeof FreeResponseEditor> = {
    component: FreeResponseEditor,
    title: "PerseusEditor/Widgets/Free Response Editor",
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

const WithState = () => {
    const [state, setState] = React.useState<
        Partial<PropsFor<typeof FreeResponseEditor>>
    >({
        question: "What is is the truth?",
        scoringCriteria: [{text: ""}],
    });

    const onChange = (options: Partial<PerseusFreeResponseWidgetOptions>) => {
        setState({...state, ...options});
    };

    return <FreeResponseEditor {...state} onChange={onChange} />;
};

export const Editable = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
