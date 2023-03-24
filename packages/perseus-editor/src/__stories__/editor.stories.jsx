// @flow
import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import * as React from "react";

import {question1} from "../__testdata__/numeric-input_testdata.js";
import Editor from "../editor.jsx";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing.js";

export default {
    title: "Perseus/Editor/Demo",
};

export const Unified = (): React.Node => {
    registerAllWidgetsAndEditorsForTesting();
    Dependencies.getDependencies().shouldUseFutureKaTeX(false);

    return (
        <Editor
            apiOptions={ApiOptions.defaults}
            content={question1.content}
            placeholder=""
            widgets={question1.widgets}
            images={question1.images}
            disabled={false}
            widgetEnabled={true}
            immutableWidgets={false}
            showWordCount={true}
            warnNoPrompt={true}
            warnNoWidgets={true}
            onChange={(props) => {}}
        />
    );
};
