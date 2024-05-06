import {action} from "@storybook/addon-actions";
import * as React from "react";

import {EditorPage} from "..";
import {segmentWithLockedFigures} from "../../../perseus/src/widgets/__testdata__/interactive-graph.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import {flags} from "./flags-for-api-options";

import type {
    DeviceType,
    Hint,
    PerseusAnswerArea,
    PerseusRenderer,
} from "@khanacademy/perseus";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

export default {
    title: "PerseusEditor/EditorPage",
};

const onChangeAction = action("onChange");

export const Demo = (): React.ReactElement => {
    const [previewDevice, setPreviewDevice] =
        React.useState<DeviceType>("phone");
    const [jsonMode, setJsonMode] = React.useState<boolean | undefined>(false);
    const [answerArea, setAnswerArea] = React.useState<
        PerseusAnswerArea | undefined | null
    >();
    const [question, setQuestion] = React.useState<
        PerseusRenderer | undefined
    >();
    const [hints, setHints] = React.useState<ReadonlyArray<Hint> | undefined>();

    return (
        <EditorPage
            apiOptions={{
                isMobile: false,
                flags,
            }}
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

export const MafsWithLockedFigures = (): React.ReactElement => {
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

    return (
        <EditorPage
            apiOptions={{
                isMobile: false,
                flags,
            }}
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
