import {
    type PerseusDependenciesV2,
    Renderer,
    type APIOptions,
    type DeviceType,
} from "@khanacademy/perseus";
import {
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {action} from "storybook/actions";

import {mockStrings} from "../../../perseus/src/strings";
import ContentPreview from "../content-preview";
import EditorPage from "../editor-page";

import PreviewPanel from "./preview-panel";
import styles from "./preview-panel.module.css";

type Props = {
    apiOptions?: APIOptions;
    question?: PerseusRenderer;
    hints?: ReadonlyArray<Hint>;
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
    };

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
                additionalTemplates={{
                    "Side by Side": "Left hand side\n=====\nRight hand side",
                }}
            />

            <PreviewPanel openButtonText="Open preview (storybook only)">
                {/* Question preview */}
                <ContentPreview
                    question={question}
                    previewDevice={previewDevice}
                    apiOptions={apiOptions}
                    reviewMode={true}
                    linterContext={{
                        contentType: "exercise",
                        highlightLint: true,
                        paths: [],
                        stack: [],
                    }}
                />

                {/* Hints preview */}
                {hints?.map((hint, index) => (
                    <View key={index} className={styles.innerPanel}>
                        <Strut size={spacing.medium_16} />
                        <LabelLarge>{`Hint ${index + 1}`}</LabelLarge>
                        <Renderer
                            strings={mockStrings}
                            apiOptions={apiOptions}
                            {...hint}
                        />
                    </View>
                ))}
            </PreviewPanel>
        </View>
    );
}

export default EditorPageWithStorybookPreview;
