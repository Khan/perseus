import {
    type APIOptions,
    type DeviceType,
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {action} from "@storybook/addon-actions";
import * as React from "react";

// eslint-disable-next-line import/no-relative-packages
import EditorPage from "../editor-page";

import {flags} from "./flags-for-api-options";

type Props = {
    apiOptions?: APIOptions;
    question?: PerseusRenderer;
    hints?: ReadonlyArray<Hint>;
};

const onChangeAction = action("onChange");

function EditorPageWithStorybookPreview(props: Props) {
    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("phone");
    const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
    const [answerArea, setAnswerArea] = React.useState<
        PerseusAnswerArea | undefined | null
    >();
    const [question, setQuestion] = React.useState<PerseusRenderer | undefined>(
        props.question,
    );
    const [hints, setHints] = React.useState<ReadonlyArray<Hint> | undefined>(
        props.hints,
    );

    const apiOptions = props.apiOptions ?? {
        isMobile: false,
        flags,
    };

    return (
        <View>
            <EditorPage
                apiOptions={apiOptions}
                previewDevice={previewDevice}
                onPreviewDeviceChange={(newDevice) =>
                    setPreviewDevice(newDevice)
                }
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
        </View>
    );
}

export default EditorPageWithStorybookPreview;
