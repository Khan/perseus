import * as React from "react";
import {action} from "storybook/actions";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import Behavior from "../behavior";

import type {PreferredPopoverDirection} from "../behavior";
import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Label Image/Widget Internal Components/Behavior",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "The behavior configuration for the Label Image widget.",
            },
        },
    },
};
export default meta;

export const Default = (): React.ReactNode => {
    const [state, setState] = React.useState({
        multipleAnswers: false,
        hideChoicesFromInstructions: false,
        preferredPopoverDirection: "NONE" as PreferredPopoverDirection,
    });

    return (
        <Behavior
            multipleAnswers={state.multipleAnswers}
            hideChoicesFromInstructions={state.hideChoicesFromInstructions}
            preferredPopoverDirection={state.preferredPopoverDirection}
            onChange={(newState) => {
                action("onChange")(newState);
                setState({...state, ...newState});
            }}
        />
    );
};
