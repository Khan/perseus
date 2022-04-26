// @flow

import {action} from "@storybook/addon-actions";
import * as React from "react";

import BlurInput from "../blur-input.jsx";

export default {
    title: "Perseus/Editor/Components/Blur Input",
};

export const Default = (): React.Node => {
    const [value, setValue] = React.useState("");

    return (
        <BlurInput
            value={value}
            onChange={(newValue) => {
                action("onChange")(newValue);
                setValue(newValue);
            }}
        />
    );
};
