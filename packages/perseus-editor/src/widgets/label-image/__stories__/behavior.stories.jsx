// @flow
import {action} from "@storybook/addon-actions";
import * as React from "react";

import Behavior from "../behavior.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Editor/Widgets/Label Image/Behavior",
}: Story);

export const Default = (args: StoryArgs): React.Node => {
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
    };
    return <Behavior {...props} />;
};
