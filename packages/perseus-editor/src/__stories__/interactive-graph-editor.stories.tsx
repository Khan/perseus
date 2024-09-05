import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {action} from "@storybook/addon-actions";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {EditorPage} from "..";
import {
    angleWithStartingCoordsQuestion,
    circleWithStartingCoordsQuestion,
    linearSystemWithStartingCoordsQuestion,
    linearWithStartingCoordsQuestion,
    pointQuestionWithStartingCoords,
    polygonWithStartingCoordsQuestion,
    quadraticWithStartingCoordsQuestion,
    rayWithStartingCoordsQuestion,
    segmentWithLockedFigures,
    segmentWithStartingCoordsQuestion,
    segmentsWithStartingCoordsQuestion,
    sinusoidWithStartingCoordsQuestion,
} from "../../../perseus/src/widgets/interactive-graphs/interactive-graph.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";
import {flags} from "./flags-for-api-options";

import type {
    DeviceType,
    Hint,
    PerseusAnswerArea,
    PerseusRenderer,
} from "@khanacademy/perseus";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

export default {
    title: "PerseusEditor/Widgets/Interactive Graph",
};

const onChangeAction = action("onChange");

export const InteractiveGraphSegment = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={segmentWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphSegments = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={segmentsWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphLinear = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={linearWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphLinearSystem = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={linearSystemWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphRay = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={rayWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphCircle = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={circleWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphQuadratic = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={quadraticWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphSinusoid = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={sinusoidWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphPoint = (): React.ReactElement => (
    <EditorPageWithStorybookPreview
        question={pointQuestionWithStartingCoords}
    />
);

export const InteractiveGraphPolygon = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={polygonWithStartingCoordsQuestion}
        />
    );
};

export const InteractiveGraphAngle = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={angleWithStartingCoordsQuestion}
        />
    );
};

export const MafsWithLockedFiguresCurrent = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            apiOptions={{
                isMobile: false,
                flags: {
                    mafs: {
                        ...flags.mafs,
                        "interactive-graph-locked-features-labels": false,
                    },
                },
            }}
            question={segmentWithLockedFigures}
        />
    );
};

MafsWithLockedFiguresCurrent.parameters = {
    chromatic: {
        // Disabling because this isn't visually testing anything on the
        // initial load of the editor page.
        disable: true,
    },
};

export const MafsWithLockedLabelsFlag = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview question={segmentWithLockedFigures} />
    );
};

MafsWithLockedLabelsFlag.parameters = {
    chromatic: {
        // Disabling because this isn't visually testing anything on the
        // initial load of the editor page.
        disable: true,
    },
};

export const WithSaveWarnings = (): React.ReactElement => {
    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("phone");
    const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
    const [answerArea, setAnswerArea] = React.useState<
        PerseusAnswerArea | undefined | null
    >();
    const [question, setQuestion] = React.useState<PerseusRenderer | undefined>(
        segmentWithLockedFigures,
    );
    const [hints, setHints] = React.useState<ReadonlyArray<Hint> | undefined>();
    const [saveWarnings, setSaveWarnings] = React.useState<string[]>([]);

    const editorPageRef = React.useRef<EditorPage>(null);

    React.useEffect(() => {
        if (editorPageRef.current) {
            const warnings = editorPageRef.current.getSaveWarnings();
            setSaveWarnings(warnings);
        }
    }, [editorPageRef, question, hints]);

    return (
        <View style={styles.container}>
            <EditorPage
                ref={editorPageRef}
                apiOptions={{
                    isMobile: false,
                    flags,
                }}
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
            <View style={styles.errorContainer}>
                <LabelLarge>Save Warnings:</LabelLarge>
                <Strut size={spacing.small_12} />
                {saveWarnings.map((warning, index) => (
                    <Body key={index} style={styles.errorMessage}>
                        {warning}
                    </Body>
                ))}
            </View>
        </View>
    );
};

WithSaveWarnings.parameters = {
    chromatic: {
        // Disabling because this isn't testing anything visually on the
        // editor page. It's testing the error message, which don't
        // even show up on the initial load.
        disable: true,
    },
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    errorContainer: {
        border: `1px solid ${color.offBlack}`,
        padding: spacing.medium_16,
        flexGrow: 1,
        marginRight: spacing.xLarge_32,

        // Sticky so the error messages stay visible while scrolling
        height: "80vh",
        position: "sticky",
        top: spacing.xLarge_32,
        overflowY: "auto",
    },
    errorMessage: {
        color: color.red,
        marginBottom: spacing.small_12,
    },
});
