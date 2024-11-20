import {
    components,
    ApiOptions,
    ClassNames,
    conversionRequired,
    convertDeprecatedWidgets,
} from "@khanacademy/perseus";
import Banner from "@khanacademy/wonder-blocks-banner";
import * as React from "react";
import _ from "underscore";

import JsonEditor from "./components/json-editor";
import ViewportResizer from "./components/viewport-resizer";
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
    PerseusRenderer,
} from "@khanacademy/perseus";

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
    // A global control to expand/collapse all widget editors on a page.
    widgetsAreOpen?: boolean;
    // Initial value of the question being edited
    question?: any;
    // URL of the route to show on initial load of the preview frames.
    previewURL: string;
};

type State = {
    json: PerseusItem;
    // Whether the Editor should be warned that the JSON has been converted to modern widgets
    conversionWarningRequired: boolean;
    question: PerseusRenderer;
    gradeMessage: string;
    wasAnswered: boolean;
    highlightLint: boolean;
    widgetsAreOpen: boolean;
};

class EditorPage extends React.Component<Props, State> {
    _isMounted: boolean;
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

        // Convert any widgets that need to be converted to newer widget types
        let convertedQuestionJson: PerseusRenderer = props.question;
        let conversionWarningRequired = false;
        if (props.question) {
            // Check if the question JSON needs to be converted
            conversionWarningRequired = conversionRequired(props.question);
            if (conversionWarningRequired) {
                convertedQuestionJson = convertDeprecatedWidgets(
                    props.question,
                );
            }
        }

        const json = {
            answerArea: this.props.answerArea,
            hints: this.props.hints,
            itemDataVersion: this.props.itemDataVersion,
            question: convertedQuestionJson,
        };

        this.state = {
            // @ts-expect-error - TS2322 - Type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "hints" | "question" | "answerArea" | "itemDataVersion">' is not assignable to type 'PerseusJson'.
            json: json,
            conversionWarningRequired: conversionWarningRequired,
            gradeMessage: "",
            wasAnswered: false,
            highlightLint: true,
            widgetsAreOpen: this.props.widgetsAreOpen ?? true,
        };

        this._isMounted = false;
    }

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this.updateRenderer();
    }

    componentDidUpdate() {
        // NOTE: It is required to delay the preview update until after the
        // current frame, to allow for ItemEditor to render its widgets.
        // This then enables to serialize the widgets properties correctly,
        // in order to send data to the preview iframe (IframeContentRenderer).
        // Otherwise, widgets will render in an "empty" state in the preview.
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
        // eslint-disable-next-line no-restricted-syntax
        setTimeout(() => {
            this.updateRenderer();
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    updateRenderer() {
        // Some widgets (namely the image widget) like to call onChange before
        // anything has actually been mounted, which causes problems here. We
        // just ensure don't update until we've mounted
        const hasEditor = !this.props.developerMode || !this.props.jsonMode;
        if (!this._isMounted || !hasEditor) {
            return;
        }

        const touch =
            this.props.previewDevice === "phone" ||
            this.props.previewDevice === "tablet";
        const deviceBasedApiOptions: APIOptionsWithDefaults = {
            ...this.getApiOptions(),
            customKeypad: touch,
            isMobile: touch,
        };

        this.itemEditor.current?.triggerPreviewUpdate({
            type: "question",
            data: _({
                item: this.serialize(),
                apiOptions: deviceBasedApiOptions,
                initialHintsVisible: 0,
                device: this.props.previewDevice,
                linterContext: {
                    contentType: "exercise",
                    highlightLint: this.state.highlightLint,
                    // TODO(CP-4838): is it okay to use [] as a default?
                    paths: this.props.contentPaths || [],
                },
                reviewMode: true,
                legacyPerseusLint: this.itemEditor.current?.getSaveWarnings(),
            }).extend(
                _(this.props).pick(
                    "workAreaSelector",
                    "solutionAreaSelector",
                    "hintsAreaSelector",
                    "problemNum",
                ),
            ),
        });
    }

    getApiOptions(): APIOptionsWithDefaults {
        return {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };
    }

    getSaveWarnings(): any {
        const issues1 = this.itemEditor.current?.getSaveWarnings();
        const issues2 = this.hintsEditor.current?.getSaveWarnings();
        return issues1.concat(issues2);
    }

    serialize(options?: {keepDeletedWidgets?: boolean}): any | PerseusItem {
        if (this.props.jsonMode) {
            return this.state.json;
        }
        return _.extend(this.itemEditor.current?.serialize(options), {
            hints: this.hintsEditor.current?.serialize(options),
        });
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
                {this.state.conversionWarningRequired && (
                    <div style={{marginBottom: 10}}>
                        <Banner
                            text="Deprecated Input Number Widgets were found, and have been automatically upgraded to Numeric Inputs. Please review the changes before publishing."
                            kind="warning"
                            layout="floating"
                        />
                    </div>
                )}
                <div style={{marginBottom: 10}}>
                    {this.props.developerMode && (
                        <span>
                            <label>
                                {" "}
                                Developer JSON Mode:{" "}
                                <input
                                    type="checkbox"
                                    checked={this.props.jsonMode}
                                    onChange={this.toggleJsonMode}
                                />
                            </label>{" "}
                        </span>
                    )}

                    {!this.props.jsonMode && (
                        <ViewportResizer
                            deviceType={this.props.previewDevice}
                            onViewportSizeChanged={
                                this.props.onPreviewDeviceChange
                            }
                        />
                    )}

                    {!this.props.jsonMode && (
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
                </div>

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
                        question={
                            this.props.question &&
                            convertDeprecatedWidgets(this.props.question)
                        }
                        answerArea={this.props.answerArea}
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleChange}
                        wasAnswered={this.state.wasAnswered}
                        gradeMessage={this.state.gradeMessage}
                        deviceType={this.props.previewDevice}
                        widgetIsOpen={this.state.widgetsAreOpen}
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
