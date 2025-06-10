import * as React from "react";
import {action} from "storybook/actions";

import Behavior from "../behavior";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Label Image/Behavior",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    const [state, setState] = React.useState({
        multipleAnswers: false,
        hideChoicesFromInstructions: false,
    });

    const props = {
        multipleAnswers: state.multipleAnswers,
        hideChoicesFromInstructions: state.hideChoicesFromInstructions,
        onChange: (newState) => {
            action("onChange")(newState);
            setState({...state, ...newState});
        },
    } as const;
    return <Behavior {...props} />;
};
