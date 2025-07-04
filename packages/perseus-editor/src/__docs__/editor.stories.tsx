/* eslint-disable react/prop-types */
import {ApiOptions} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {action} from "storybook/actions";

import {Editor} from "..";
import SplitView from "../../../../testing/split-view";
import {question1} from "../__testdata__/numeric-input.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

export default {
    title: "Perseus/Editors/Editor",
};

export const Demo = (): React.ReactElement => {
    return (
        <Editor
            apiOptions={ApiOptions.defaults}
            content={question1.content}
            placeholder=""
            widgets={question1.widgets}
            images={question1.images}
            disabled={false}
            widgetEnabled={true}
            immutableWidgets={false}
            showWordCount={true}
            warnNoPrompt={true}
            warnNoWidgets={true}
            onChange={(props) => {}}
        />
    );
};

export const DemoInteractiveGraph = (): React.ReactElement => {
    const editorRef = React.useRef<Editor>(null);
    const [options, setOptions] = React.useState({});
    const [content, setContent] = React.useState(
        "[[\u2603 interactive-graph 1]]",
    );
    const [images, setImages] = React.useState<PerseusRenderer["images"]>({});
    const [widgets, setWidgets] = React.useState<PerseusRenderer["widgets"]>({
        "interactive-graph 1": {
            options: {
                labels: ["x", "y"],
                lockedFigures: [],
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                gridStep: [1, 1],
                snapStep: [1, 1],
                step: [1, 1],
                backgroundImage: {
                    url: null,
                },
                markings: "graph",
                showProtractor: false,
                showTooltips: false,
                graph: {
                    type: "linear",
                    coords: [
                        [1, 1],
                        [5, 5],
                    ],
                },
                correct: {
                    type: "linear",
                },
            },
            type: "interactive-graph",
            version: {
                major: 0,
                minor: 0,
            },
        },
    });

    return (
        // Many of the editor components use scoped CSS that requires this
        // class to be above it.
        // TODO: Refactor to aphrodite styles instead of scoped CSS in Less.
        <div className="framework-perseus">
            <SplitView
                rendererTitle="Editor"
                renderer={
                    <View style={{width: "360px", margin: "20px"}}>
                        <Editor
                            ref={editorRef}
                            apiOptions={ApiOptions.defaults}
                            content={content}
                            placeholder=""
                            widgets={widgets}
                            images={images}
                            disabled={false}
                            widgetEnabled={true}
                            immutableWidgets={false}
                            showWordCount={true}
                            warnNoPrompt={false}
                            warnNoWidgets={true}
                            // TODO(LEMS-2656): remove TS suppression
                            onChange={
                                ((props: Partial<PerseusRenderer>) => {
                                    action("onChange")(props);
                                    if (props.content) {
                                        setContent(props.content);
                                    } else if (props.widgets) {
                                        setWidgets(props.widgets);
                                    } else if (props.images) {
                                        setImages(props.images);
                                    }
                                    // We need to wait for one tick so that the editor
                                    // has been re-rendered with the changed props. If
                                    // we don't wait, we get the values from the n-1
                                    // render and miss the latest change.
                                    setTimeout(() => {
                                        setOptions(
                                            editorRef.current?.serialize() ||
                                                {},
                                        );
                                    }, 0);
                                }) as any
                            }
                        />
                    </View>
                }
                JSONTitle="Serialized Widget Options"
                jsonObject={options}
            />
        </div>
    );
};
