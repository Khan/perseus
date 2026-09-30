import {
    getDefaultAnswerArea,
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import {question1} from "../__testdata__/numeric-input.testdata";
import ItemEditor from "../item-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import {usePreviewUrl} from "./use-preview-url";
import "../styles/perseus-editor.css"; // This helps ensure the styles are loaded correctly and timely

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/Item Editor",
    tags: ["!autodocs"],
};

const onChangeAction = action("onChange");

export const Demo = (): React.ReactElement => {
    const [question, setQuestion] = React.useState<PerseusRenderer>(question1);
    const [answerArea, setAnswerArea] =
        React.useState<PerseusAnswerArea>(getDefaultAnswerArea);
    const [hints, setHints] = React.useState<Hint[]>([]);

    return (
        <ItemEditor
            deviceType="desktop"
            question={question}
            answerArea={answerArea}
            hints={hints}
            previewURL={usePreviewUrl()}
            itemId="1"
            highlightLint={true}
            onChange={(changed) => {
                onChangeAction(changed);

                if (changed.question != null) {
                    setQuestion(changed.question);
                }
                if (changed.answerArea != null) {
                    setAnswerArea(changed.answerArea);
                }
                if (changed.hints != null) {
                    setHints(changed.hints);
                }
            }}
        />
    );
};
