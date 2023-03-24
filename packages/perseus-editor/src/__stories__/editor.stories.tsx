import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import * as React from "react";

// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../__testdata__/input-number_testdata' or its corresponding type declarations.
import {question1} from '../__testdata__/input-number_testdata';
import Editor from '../editor';
import {registerAllWidgetsAndEditorsForTesting} from '../util/register-all-widgets-and-editors-for-testing';

export default {
    title: "Perseus/Editor",
};

export const Rational = (): React.ReactElement => {
    registerAllWidgetsAndEditorsForTesting();
    Dependencies.getDependencies().shouldUseFutureKaTeX(false);

    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'Editor' cannot be used as a JSX component.
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
