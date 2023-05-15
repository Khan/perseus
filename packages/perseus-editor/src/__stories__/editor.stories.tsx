import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";

import {question1} from "../__testdata__/input-number.testdata";
import Editor from "../editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

export default {
    title: "Perseus/Editor",
};

// Testing story change
export const Rational = (): React.ReactElement => {
    registerAllWidgetsAndEditorsForTesting();

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
