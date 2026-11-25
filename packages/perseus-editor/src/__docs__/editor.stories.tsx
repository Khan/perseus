import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";

import {Editor} from "..";
import {question1} from "../__testdata__/numeric-input.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors.testutils";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/Editor",
    tags: ["!autodocs"],
};

export const Demo = (): React.ReactElement => {
    return (
        <Editor
            apiOptions={ApiOptions.defaults}
            content={question1.content}
            placeholder=""
            widgets={question1.widgets}
            images={question1.images}
            disabled={false}
            widgetEnabled={true}
            showWordCount={true}
            warnNoPrompt={true}
            warnNoWidgets={true}
            onChange={(props) => {}}
        />
    );
};

/**
 * With `hideWidgetControls` set to true, we still have the content editor
 * that highlights widget references, but this hides the widget and template
 * selects and the editors for embedded widgets (i.e. text area only).
 */
export const HideWidgetControls = (): React.ReactElement => {
    return (
        <Editor
            apiOptions={ApiOptions.defaults}
            content={question1.content}
            placeholder=""
            widgets={question1.widgets}
            images={question1.images}
            disabled={false}
            widgetEnabled={true}
            hideWidgetControls={true}
            showWordCount={true}
            warnNoPrompt={true}
            warnNoWidgets={true}
            onChange={(props) => {}}
        />
    );
};
