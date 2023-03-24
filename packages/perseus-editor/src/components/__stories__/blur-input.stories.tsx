import {action} from "@storybook/addon-actions";
import * as React from "react";

import BlurInput from '../blur-input';

export default {
    title: "Perseus/Editor/Components/Blur Input",
};

export const Default = (): React.ReactElement => {
    const [value, setValue] = React.useState("");

    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'BlurInput' cannot be used as a JSX component.
        <BlurInput
            value={value}
            onChange={(newValue) => {
                action("onChange")(newValue);
                setValue(newValue);
            }}
        />
    );
};
