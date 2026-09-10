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
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";
import {action} from "storybook/actions";

import ViewportResizer from "../components/viewport-resizer";
import EditorPage from "../editor-page";

import {usePreviewUrl} from "./use-preview-url";

type Props = {
    apiOptions?: APIOptions;
    question?: PerseusRenderer;
    hints?: Hint[];
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

    const storybookPreviewUrl = usePreviewUrl();

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: sizing.size_120,
                }}
            >
                <label>
                    Developer JSON mode:
                    <input
                        type="checkbox"
                        checked={jsonMode}
                        onChange={(e) => setJsonMode(e.target.checked)}
                    />
                </label>
                <ViewportResizer
                    deviceType={previewDevice}
                    onViewportSizeChanged={setPreviewDevice}
                />
            </View>
            <EditorPage
                apiOptions={apiOptions}
                previewDevice={previewDevice}
                dependencies={testDependenciesV2}
                jsonMode={jsonMode}
                answerArea={answerArea}
                question={question}
                hints={hints}
                previewURL={storybookPreviewUrl}
                itemId="1"
                onChange={(changed) => {
                    onChangeAction(changed);
                    setAnswerArea(changed.answerArea ?? answerArea);
                    setQuestion(changed.question);
                    setHints(changed.hints);
                }}
                additionalTemplates={{
                    "Side by Side": "Left hand side\n=====\nRight hand side",
                }}
            />
        </View>
    );
}

export default EditorPageWithStorybookPreview;
