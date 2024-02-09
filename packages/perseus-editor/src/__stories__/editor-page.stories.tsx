import {action} from "@storybook/addon-actions";
import * as React from "react";

import {EditorPage} from "..";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import type {
    DeviceType,
    Hint,
    PerseusAnswerArea,
    PerseusRenderer,
} from "@khanacademy/perseus";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

export default {
    title: "Perseus/Editor/EditorPage",
};

const onChangeAction = action("onChange");

export const Demo = (): React.ReactElement => {
    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("phone");
    const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
    const [answerArea, setAnswerArea] = React.useState<
        PerseusAnswerArea | undefined | null
    >();
    const [question, setQuestion] = React.useState<PerseusRenderer | undefined>(
        {
            content: "[[☃ expression 1]]",
            images: {},
            widgets: {
                "expression 1": {
                    type: "expression",
                    alignment: "default",
                    static: false,
                    graded: true,
                    options: {
                        answerForms: [
                            {
                                value: "++++",
                                form: true,
                                simplify: false,
                                considered: "correct",
                                key: "0",
                            },
                        ],
                        buttonSets: ["basic", "prealgebra"],
                        functions: ["f", "g", "h"],
                        times: true,
                    },
                    version: {
                        major: 1,
                        minor: 0,
                    },
                },
            },
        },
    );
    const [hints, setHints] = React.useState<ReadonlyArray<Hint> | undefined>();

    return (
        <EditorPage
            apiOptions={{isMobile: false}}
            previewDevice={previewDevice}
            onPreviewDeviceChange={(newDevice) => setPreviewDevice(newDevice)}
            developerMode={true}
            jsonMode={jsonMode}
            answerArea={answerArea}
            question={question}
            hints={hints}
            frameSource="about:blank"
            previewURL="about:blank"
            itemId="1"
            onChange={(props) => {
                onChangeAction(props);

                if ("jsonMode" in props) {
                    setJsonMode(props.jsonMode);
                }
                if ("answerArea" in props) {
                    setAnswerArea(props.answerArea);
                }
                if ("question" in props) {
                    setQuestion(props.question);
                }
                if ("hints" in props) {
                    setHints(props.hints);
                }
            }}
        />
    );
};
