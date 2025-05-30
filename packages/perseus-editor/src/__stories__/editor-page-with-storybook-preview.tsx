import {type APIOptions, type DeviceType} from "@khanacademy/perseus";
import {
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPage from "../editor-page";

type Props = {
    apiOptions?: APIOptions;
    question?: PerseusRenderer;
    hints?: ReadonlyArray<Hint>;
    answerArea?: PerseusAnswerArea;
};

declare global {
    interface Window {
        iframeDataStore: Record<string, any>;
    }
}

const onChangeAction = action("onChange");

function EditorPageWithStorybookPreview(props: Props) {
    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("desktop");
    const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
    const [answerArea, setAnswerArea] = React.useState<
        PerseusAnswerArea | undefined | null
    >(props.answerArea);
    const [question, setQuestion] = React.useState<PerseusRenderer | undefined>(
        props.question,
    );
    const [hints, setHints] = React.useState<ReadonlyArray<Hint> | undefined>(
        props.hints,
    );

    // Memoize apiOptions to fix dependency warnings
    const apiOptions = React.useMemo(() => {
        const isMobile =
            previewDevice === "phone" || previewDevice === "tablet";
        return {
            ...props.apiOptions,
            isMobile,
            customKeypad: isMobile, // webapp pattern: customKeypad matches isMobile
        };
    }, [props.apiOptions, previewDevice]);

    // Set up iframe data store for Perseus frame communication
    React.useEffect(() => {
        // Check if iframeDataStore exists before setting it up
        if (typeof window !== "undefined" && !(window as any).iframeDataStore) {
            (window as any).iframeDataStore = {};
        }
    }, []);

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
                frameSource="/iframe.html?id=perseuseditor-perseus-frame--frame&viewMode=story"
                previewURL="/iframe.html?id=perseuseditor-perseus-frame--frame&viewMode=story"
                itemId="storybook-exercise"
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
                additionalTemplates={{
                    "Side by Side": "Left hand side\n=====\nRight hand side",
                }}
            />
        </View>
    );
}

export default EditorPageWithStorybookPreview;
