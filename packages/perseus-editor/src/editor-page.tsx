import {
    components,
    ApiOptions,
    ClassNames,
    Dependencies, Util,
} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import JsonEditor from "./components/json-editor";
import ViewportResizer from "./components/viewport-resizer";
import CombinedHintsEditor from "./hint-editor";
import ItemEditor from "./item-editor";

import type {Issue} from "./components/issues-panel";
import type {
    APIOptions,
    APIOptionsWithDefaults,
    // eslint-disable-next-line import/no-deprecated
    ChangeHandler,
    DeviceType,
    ImageUploader,
    PerseusDependenciesV2,
} from "@khanacademy/perseus";
import type {
    Hint,
    PerseusAnswerArea,
    PerseusItem,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import {rWidgetSplit} from "./editor";

const {HUD} = components;

type Props = {
    /** Additional templates that the host application would like to display
     * within the Perseus Editor.
     */
    additionalTemplates?: Record<string, string>;
    apiOptions?: APIOptions;
    answerArea?: PerseusAnswerArea | null; // related to the question,
    // TODO(CP-4838): Should this be a required prop?
    contentPaths?: ReadonlyArray<string>;
    dependencies: PerseusDependenciesV2;
    /** "Power user" mode. Shows the raw JSON of the question. */
    developerMode: boolean;
    hints?: ReadonlyArray<Hint>; // related to the question,
    /** A function which takes a file object (guaranteed to be an image) and
     * a callback, then calls the callback with the url where the image
     * will be hosted. Image drag and drop is disabled when imageUploader
     * is null.
     */
    imageUploader?: ImageUploader;
    /** The content ID of the AssessmentItem being edited. */
    itemId: string;
    /** Whether the question is displaying as JSON or if it is
     * showing the editor itself with the rendering
     * Only used in the perseus demos. Consider removing.
     */
    jsonMode: boolean;
    /** A function which is called with the new JSON blob of content. */
    onChange: ChangeHandler;
    /** A function which is called when the preview device changes. */
    onPreviewDeviceChange: (arg1: DeviceType) => unknown;
    previewDevice: DeviceType;
    /** A global control to expand/collapse all widget editors on a page. */
    widgetsAreOpen?: boolean;
    /** Initial value of the question being edited. */
    question?: PerseusRenderer;
    /** URL of the route to show on initial load of the preview frames. */
    previewURL: string;
    /** Additional issues that the host application would like to display
     * within the Perseus Editor. This allows the hosts to present issues
     * with the content that aren't linted/detected by Perseus itself.
     */
    issues?: Issue[];
};

type DefaultProps = {
    developerMode: Props["developerMode"];
    jsonMode: Props["jsonMode"];
    onChange: Props["onChange"];
};

type State = {
    json: PerseusItem;
    highlightLint: boolean;
    widgetsAreOpen: boolean;
};

class EditorPage extends React.Component<Props, State> {
    _isMounted: boolean;

    itemEditor = React.createRef<ItemEditor>();
    hintsEditor = React.createRef<CombinedHintsEditor>();

    static defaultProps: DefaultProps = {
        developerMode: false,
        jsonMode: false,
        onChange: () => {},
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            // @ts-expect-error - TS2322 - Type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "hints" | "question" | "answerArea">' is not assignable to type 'PerseusJson'.
            json: _.pick(this.props, "question", "answerArea", "hints"),
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
            }).extend(_(this.props).pick("problemNum")),
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

    // eslint-disable-next-line import/no-deprecated
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
            <Dependencies.DependenciesContext.Provider
                value={this.props.dependencies}
            >
                <div id="perseus" className={className}>
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
                                        highlightLint:
                                            !this.state.highlightLint,
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
                            question={this.props.question}
                            answerArea={this.props.answerArea}
                            imageUploader={this.props.imageUploader}
                            onChange={this.handleChange}
                            deviceType={this.props.previewDevice}
                            widgetIsOpen={this.state.widgetsAreOpen}
                            apiOptions={deviceBasedApiOptions}
                            previewURL={this.props.previewURL}
                            issues={this.props.issues}
                            additionalTemplates={this.props.additionalTemplates}
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
                            widgetIsOpen={this.state.widgetsAreOpen}
                            widgetsInExercise={this.props.question?.widgets ?? {}}
                        />
                    )}
                </div>
            </Dependencies.DependenciesContext.Provider>
        );
    }
}

export default EditorPage;
