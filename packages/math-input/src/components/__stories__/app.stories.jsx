// @flow
import * as React from "react";

import App from "../app.js";

import "../../../less/main.less";

export default {
    title: "math-input/components/App",
};

type StoryArgs = {||};

export const Demo = (args: StoryArgs): React.Node => {
    return <App />;
};
