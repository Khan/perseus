import * as React from "react";
import {action} from "storybook/actions";

import BlurInput from "../blur-input";

export default {
    title: "Editors/Components/Blur Input",
};

export const Default = (): React.ReactElement => {
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
