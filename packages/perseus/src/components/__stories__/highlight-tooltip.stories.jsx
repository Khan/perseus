// @flow

import * as React from "react";
import {action} from "@storybook/addon-actions";

import HighlightTooltip from "../highlighting/ui/highlight-tooltip";

export default {
    title: "Perseus/Components/Highlight Toolip",
};

export const Main = (args: any): React.Node => (
    // $FlowIgnore[prop-missing]
    <HighlightTooltip
        label="Highlight"
        onClick={action("clicked")}
        onMouseEnter={action("onMouseEnter")}
        onMouseLeave={action("onMouseLeave")}
        __testFocusRest={{
            top: 400,
            left: 200,
            height: 80,
        }}
    />
);
