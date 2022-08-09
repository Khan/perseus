// @flow
import * as React from "react";
import App from "../components/app.js";

import "../../less/main.less";

export default {
    title: "Math Input/test",
};

type StoryArgs = {||};

export const SampleApp = (args: StoryArgs): React.Node => {
    return <App />;
};
