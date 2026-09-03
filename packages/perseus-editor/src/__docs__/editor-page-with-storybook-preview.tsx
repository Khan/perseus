import {
    type PerseusDependenciesV2,
    type APIOptions,
    type DeviceType,
} from "@khanacademy/perseus";
import {
    getDefaultAnswerArea,
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPage from "../editor-page";

import {usePreviewUrl} from "./use-preview-url";

type Props = {
    apiOptions?: APIOptions;
    question?: PerseusRenderer;
    hints?: Hint[];
    /**
     * The Storybook story the preview iframe loads. Defaults to the shared
     * one. Override it when the question uses a widget that story does not
     * register — see `usePreviewUrl`.
     *
     * TODO(LEMS-4371): Added for the Fill in the Blank editor POC; drop it
     * once that widget is registered globally.
     */
    previewStoryId?: string;
};

const testDependenciesV2: PerseusDependenciesV2 = {
    analytics: {
        onAnalyticsEvent: async () => {},
    },
    generateUrl: (args) => {
        return args.url;
    },
    useVideo: () => {
        return {
            status: "success",
            data: {
                video: null,
            },
        };
    },
};

const onChangeAction = action("onChange");

function EditorPageWithStorybookPreview(props: Props) {
    const {
        hints: initialHints = [],
        question: initialQuestion = {content: "", widgets: {}, images: {}},
    } = props;

    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("phone");
    const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
    const [answerArea, setAnswerArea] =
        React.useState<PerseusAnswerArea>(getDefaultAnswerArea);
    const [question, setQuestion] =
        React.useState<PerseusRenderer>(initialQuestion);
    const [hints, setHints] = React.useState<Hint[]>(initialHints);

    const apiOptions = props.apiOptions ?? {
        isMobile: false,
    };

    const storybookPreviewUrl = usePreviewUrl(props.previewStoryId);

    return (
        <View>
            <EditorPage
                apiOptions={apiOptions}
                previewDevice={previewDevice}
                onPreviewDeviceChange={(newDevice) =>
                    setPreviewDevice(newDevice)
                }
                dependencies={testDependenciesV2}
                developerMode={true}
                jsonMode={jsonMode}
                answerArea={answerArea}
                question={question}
                hints={hints}
                previewURL={storybookPreviewUrl}
                itemId="1"
                onChange={(changed) => {
                    onChangeAction(changed);

                    if (changed.jsonMode != null) {
                        setJsonMode(changed.jsonMode);
                    }
                    if (changed.answerArea != null) {
                        setAnswerArea(changed.answerArea);
                    }
                    if (changed.question != null) {
                        setQuestion(changed.question);
                    }
                    if (changed.hints != null) {
                        setHints(changed.hints);
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
