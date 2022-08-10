// @flow
import * as React from "react";
import {action} from "@storybook/addon-actions";
import MathInput from "../math-input";

export default {
    title: "Math Input/Components/Math-Input",
};

type StoryArgs = {||};

export const Test = (args: StoryArgs): React.Node => {
    return (
        <MathInput
            onFocus={action("focused")}
            onFocus={action("blurred")}
            onChange={action("changed")}
            keypadElement={{
                activate: () => {},
                dismiss: () => {},
                // eslint-disable-next-line no-console
                configure: (config) => console.log("configure:", config),
                // eslint-disable-next-line no-console
                setCursor: (cursor) => console.log("Cursor:", cursor),
                setKeyHandler: (handler) => {},
                getDOMNode: () => null,
            }}
        />
    );
};
