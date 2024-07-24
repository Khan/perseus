import {
    Renderer,
    type APIOptions,
    type DeviceType,
    type Hint,
    type PerseusAnswerArea,
    type PerseusRenderer,
} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import {action} from "@storybook/addon-actions";
import {StyleSheet} from "aphrodite";
import * as React from "react";

// eslint-disable-next-line import/no-relative-packages
import {mockStrings} from "../../../perseus/src/strings";
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

    const [panelOpen, setPanelOpen] = React.useState<boolean>(true);

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
                        onClick={() => setPanelOpen(!panelOpen)}
                        style={styles.closeButton}
                    />

                    <View style={styles.panelInner}>
                        {/* Question preview */}
                        <Renderer
                            strings={mockStrings}
                            apiOptions={apiOptions}
                            {...question}
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
                                hintMode={true}
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
    closeButton: {
        margin: 0,
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
