import {components, ApiOptions, ClassNames} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import warning from "@phosphor-icons/core/bold/warning-circle-bold.svg";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import JsonEditor from "./components/json-editor";
import CombinedHintsEditor from "./hint-editor";
import ItemEditor from "./item-editor";

import type {
    APIOptions,
    APIOptionsWithDefaults,
    ChangeHandler,
    DeviceType,
    Hint,
    ImageUploader,
    Version,
    PerseusItem,
} from "@khanacademy/perseus";
import type {KEScore} from "@khanacademy/perseus-core";

const {HUD} = components;

type Props = {
    apiOptions?: APIOptions;
    answerArea?: any; // related to the question,
    // TODO(CP-4838): Should this be a required prop?
    contentPaths?: ReadonlyArray<string>;
    // "Power user" mode. Shows the raw JSON of the question.
    developerMode: boolean;
    // Source HTML for the iframe to render
    frameSource: string;
    hints?: ReadonlyArray<Hint>; // related to the question,
    // A function which takes a file object (guaranteed to be an image) and
    // a callback, then calls the callback with the url where the image
    // will be hosted. Image drag and drop is disabled when imageUploader
    // is null.
    imageUploader?: ImageUploader;
    // Part of the question
    itemDataVersion?: Version;
    // The content ID of the AssessmentItem being edited.
    itemId: string;
    // Whether the question is displaying as JSON or if it is
    // showing the editor itself with the rendering
    // Only used in the perseus demos. Consider removing.
    jsonMode: boolean;
    // A function which is called with the new JSON blob of content
    onChange: ChangeHandler;
    onPreviewDeviceChange: (arg1: DeviceType) => unknown;
    previewDevice: DeviceType;
    // Initial value of the question being edited
    question?: any;
    // URL of the route to show on initial load of the preview frames.
    previewURL: string;
};

type State = {
    json: PerseusItem;
    gradeMessage: string;
    wasAnswered: boolean;
    highlightLint: boolean;
};

class EditorPage extends React.Component<Props, State> {
    renderer: any;

    itemEditor = React.createRef<ItemEditor>();
    hintsEditor = React.createRef<CombinedHintsEditor>();

    static defaultProps: {
        developerMode: boolean;
        jsonMode: boolean;
        onChange: () => void;
    } = {
        developerMode: false,
        jsonMode: false,
        onChange: () => {},
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            // @ts-expect-error - TS2322 - Type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "hints" | "question" | "answerArea" | "itemDataVersion">' is not assignable to type 'PerseusJson'.
            json: _.pick(
                this.props,
                "question",
                "answerArea",
                "hints",
                "itemDataVersion",
            ),
            gradeMessage: "",
            wasAnswered: false,
            highlightLint: true,
        };
    }

    toggleJsonMode: () => void = () => {
        this.setState(
            {
                json: this.serialize({keepDeletedWidgets: true}),
            },
            () => {
                this.props.onChange({
                    jsonMode: !this.props.jsonMode,
                });
            },
        );
    };

    getApiOptions(): APIOptionsWithDefaults {
        return {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };
    }

    getSaveWarnings(): ReadonlyArray<string> {
        const issues1 = this.itemEditor.current?.getSaveWarnings() ?? [];
        const issues2 = this.hintsEditor.current?.getSaveWarnings() ?? [];
        return issues1.concat(issues2);
    }

    serialize(options?: {keepDeletedWidgets?: boolean}): PerseusItem {
        if (this.props.jsonMode) {
            return this.state.json;
        }
        invariant(this.itemEditor.current != null);
        invariant(this.hintsEditor.current != null);
        return {
            ...this.itemEditor.current?.serialize(options),
            hints: this.hintsEditor.current?.serialize(options),

            // Note(jeremy): These two are to satisfy the fact that our
            // PerseusItem type really should be a union between a multi item
            // and a standard perseus item (also that the `answer` field, which
            // is deprecated, is required).
            _multi: undefined,
            answer: undefined,
        };
    }

    handleChange: ChangeHandler = (toChange, cb, silent) => {
        const newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps, cb, silent);
    };

    changeJSON: (newJson: PerseusItem) => void = (newJson: PerseusItem) => {
        this.setState({
            json: newJson,
        });
        this.props.onChange(newJson);
    };

    scorePreview(): KEScore | null | undefined {
        // Do we actually ever set this.renderer anywhere in the codebase?
        if (this.renderer) {
            return this.renderer.scoreInput();
        }
        return null;
    }

    render(): React.ReactNode {
        let className = "framework-perseus";

        const touch =
            this.props.previewDevice === "phone" ||
            this.props.previewDevice === "tablet";
        const deviceBasedApiOptions: APIOptionsWithDefaults = {
            ...this.getApiOptions(),
            customKeypad: touch,
            isMobile: touch,
        };

        if (deviceBasedApiOptions.isMobile) {
            className += " " + ClassNames.MOBILE;
        }

        return (
            <div id="perseus" className={className}>
                <View
                    style={{
                        marginBottom: 10,
                        height: 30,
                        flexDirection: "row",
                        gap: spacing.medium_16,
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 360,
                            minWidth: 360,
                            maxWidth: 360,
                            marginRight: 30,
                        }}
                    >
                        {" "}
                        {this.props.developerMode && (
                            <Checkbox
                                label="Developer JSON Mode"
                                checked={this.props.jsonMode}
                                onChange={this.toggleJsonMode}
                            />
                        )}
                    </View>

                    {!this.props.jsonMode && (
                        <View style={{paddingLeft: 15}}>
                            <LabelSmall>
                                <em>Note:</em> Don't forget to check how this
                                exercise looks on a phone and tablet by using
                                the "Preview" tab.{" "}
                                <Tooltip
                                    title="Preview"
                                    content={
                                        <View
                                            style={{padding: spacing.xSmall_8}}
                                        >
                                            <LabelSmall>
                                                This preview is designed to give
                                                you fast feedback when editing
                                                the exercise. To be sure it
                                                looks correct on all devices a
                                                Khan Academy learner may view it
                                                on, please use the "Preview"
                                                tab.
                                            </LabelSmall>
                                        </View>
                                    }
                                >
                                    <PhosphorIcon
                                        icon={warning}
                                        style={{color: color.activeRed}}
                                    />
                                </Tooltip>
                            </LabelSmall>
                        </View>
                    )}

                    {!this.props.jsonMode && (
                        // NOTE: This component positions itself using fixed
                        // positioning, so even though it appears here, near
                        // the JSON Mode and Viewport Resizer elements, it
                        // shows up in a completely different place on the page
                        // visually.
                        <HUD
                            message="Style warnings"
                            enabled={this.state.highlightLint}
                            onClick={() => {
                                this.setState({
                                    highlightLint: !this.state.highlightLint,
                                });
                            }}
                        />
                    )}
                </View>

                {this.props.developerMode && this.props.jsonMode && (
                    <div>
                        <JsonEditor
                            multiLine={true}
                            value={this.state.json}
                            onChange={this.changeJSON}
                        />
                    </div>
                )}

                {(!this.props.developerMode || !this.props.jsonMode) && (
                    <ItemEditor
                        ref={this.itemEditor}
                        itemId={this.props.itemId}
                        question={this.props.question}
                        answerArea={this.props.answerArea}
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleChange}
                        wasAnswered={this.state.wasAnswered}
                        gradeMessage={this.state.gradeMessage}
                        apiOptions={deviceBasedApiOptions}
                        previewURL={this.props.previewURL}
                    />
                )}

                {(!this.props.developerMode || !this.props.jsonMode) && (
                    <CombinedHintsEditor
                        ref={this.hintsEditor}
                        itemId={this.props.itemId}
                        hints={this.props.hints}
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleChange}
                        deviceType={this.props.previewDevice}
                        apiOptions={deviceBasedApiOptions}
                        previewURL={this.props.previewURL}
                        highlightLint={this.state.highlightLint}
                    />
                )}
            </div>
        );
    }
}

export default EditorPage;
