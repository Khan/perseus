import {Renderer, type APIOptions, type DeviceType} from "@khanacademy/perseus";
import {
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {action} from "storybook/actions";

// eslint-disable-next-line import/no-relative-packages
import {mockStrings} from "@khanacademy/perseus/strings";
import ContentPreview from "../content-preview";
import EditorPage from "../editor-page";

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

    const [panelOpen, setPanelOpen] = React.useState<boolean>(true);

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
                additionalTemplates={{
                    "Side by Side": "Left hand side\n=====\nRight hand side",
                }}
            />

            {/* Button to open panel */}
            {!panelOpen && (
                <Button
                    onClick={() => setPanelOpen(!panelOpen)}
                    style={styles.openPanelButton}
                >
                    Open preview (storybook only)
                </Button>
            )}

            {/* Panel to show the question/hint previews */}
            {panelOpen && (
                <View style={styles.panel}>
                    {/* Close button */}
                    <IconButton
                        icon={xIcon}
                        kind="tertiary"
                        onClick={() => setPanelOpen(!panelOpen)}
                    />

                    <View style={styles.panelInner}>
                        {/* Question preview */}
                        <ContentPreview
                            question={question}
                            previewDevice={previewDevice}
                            apiOptions={apiOptions}
                            linterContext={{
                                contentType: "exercise",
                                highlightLint: true,
                                paths: [],
                                stack: [],
                            }}
                        />
                    </View>

                    {/* Hints preview */}
                    {hints?.map((hint, index) => (
                        <View key={index} style={styles.panelInner}>
                            <Strut size={spacing.medium_16} />
                            <LabelLarge>{`Hint ${index + 1}`}</LabelLarge>
                            <Renderer
                                strings={mockStrings}
                                apiOptions={apiOptions}
                                {...hint}
                            />
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        position: "fixed",
        right: 0,
        minWidth: 500,
        height: "90vh",
        overflow: "auto",
        flex: "none",
        backgroundColor: color.fadedBlue16,
        padding: spacing.medium_16,
        borderRadius: spacing.small_12,
        alignItems: "end",
    },
    panelInner: {
        flex: "none",
        backgroundColor: color.white,
        borderRadius: spacing.xSmall_8,
        marginTop: spacing.medium_16,
        width: "100%",
        padding: spacing.xSmall_8,
    },
    openPanelButton: {
        position: "fixed",
        right: spacing.medium_16,
        // Extra space so it doesn't get covered up by storybook's
        // "Style warnings" button.
        bottom: spacing.xxxLarge_64,
    },
});

export default EditorPageWithStorybookPreview;
