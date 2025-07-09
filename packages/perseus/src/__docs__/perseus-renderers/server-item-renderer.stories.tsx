import * as React from "react";
import {useState} from "react";
import {action} from "storybook/actions";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {storybookDependenciesV2} from "../../../../../testing/test-dependencies";
import {
    itemWithNumericInput,
    itemWithLintingError,
    labelImageItem,
    itemWithImages,
    itemWithMultipleNumericInputs,
    itemWithRadioAndExpressionWidgets,
} from "../../__testdata__/server-item-renderer.testdata";
import {ServerItemRenderer} from "../../server-item-renderer";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Renderers/Server Item Renderer",
    component: ServerItemRendererWithDebugUI,
    args: {
        title: "Renderers/Server Item Renderer",
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const NumericInputItem: Story = {
    args: {
        item: itemWithNumericInput,
    },
};

export const LabelImageItem: Story = {
    args: {
        item: labelImageItem,
    },
};

export const ImageExamplesItem: Story = {
    args: {
        item: itemWithImages,
    },
};

export const WithLintingError: Story = {
    args: {
        item: itemWithLintingError,
        linterContext: {
            contentType: "",
            highlightLint: true,
            paths: [],
            stack: [],
        },
    },
};

export const NumericInputWithInteractionCallback: Story = {
    args: {
        item: itemWithMultipleNumericInputs,
        apiOptions: {
            interactionCallback: action("interactionCallback"),
        },
    },
};

export const MultiWidgetWithInteractionCallback: Story = {
    args: {
        item: itemWithRadioAndExpressionWidgets,
        apiOptions: {
            interactionCallback: action("interactionCallback"),
        },
    },
};

export const Interactive = () => {
    const [value, setValue] = useState("");
    const [debug, setDebug] = useState(true);

    function findItemData(input) {
        const parsed = JSON.parse(input);
        const itemData =
            parsed?.data?.assessmentItem?.item?.itemData ||
            parsed?.assessmentItem?.item?.itemData ||
            parsed?.item?.itemData ||
            parsed?.itemData;
        if (itemData) {
            return JSON.parse(itemData);
        } else if (parsed.question && parsed.hints) {
            return parsed;
        }
    }

    function extractItemData() {
        const itemData = findItemData(value);
        setValue(JSON.stringify(itemData, null, 2));
    }

    let content = null;
    let parsingError = false;
    try {
        if (value) {
            content = findItemData(value);
        }
    } catch (e) {
        parsingError = true;
        // eslint-disable-next-line no-console
        console.error(e);
    }

    return (
        <div>
            <div
                style={{
                    padding: "2rem",
                }}
            >
                <label>
                    Dump Perseus data here
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{
                            display: "block",
                            width: "100%",
                            height: "20rem",
                        }}
                    />
                </label>
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                {content && (
                    <div>
                        <button onClick={extractItemData}>
                            Extract item data
                        </button>
                        <button onClick={() => setDebug(!debug)}>
                            {debug
                                ? "Use ServerItemRenderer"
                                : "Use ServerItemRendererWithDebugUI"}
                        </button>
                    </div>
                )}
            </div>
            <div
                style={{
                    padding: "2rem",
                }}
            >
                {parsingError && <p>There was a problem parsing the JSON</p>}
                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                {content && (
                    <>
                        {debug ? (
                            <ServerItemRendererWithDebugUI item={content} />
                        ) : (
                            <ServerItemRenderer
                                problemNum={0}
                                item={content}
                                dependencies={storybookDependenciesV2}
                                linterContext={{
                                    contentType: "",
                                    highlightLint: true,
                                    paths: [],
                                    stack: [],
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
