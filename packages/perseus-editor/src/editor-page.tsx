import {
    components,
    ApiOptions,
    ClassNames,
    Dependencies,
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

// Strips editor-only marker fields (e.g. _showShuffledPreview) from
// radio widget options so they are never persisted to content data.
function stripEditorOnlyRadioFields(item: any): any {
    const widgets = item?.question?.widgets;
    if (!widgets) {
        return item;
    }

    const cleanedWidgets = {...widgets};
    for (const widgetId of Object.keys(cleanedWidgets)) {
        const widget = cleanedWidgets[widgetId];
        if (widget?.type === "radio" && widget.options) {
            const {_showShuffledPreview: _, ...cleanOptions} = widget.options;
            cleanedWidgets[widgetId] = {...widget, options: cleanOptions};
        }
    }

    return {
        ...item,
        question: {...item.question, widgets: cleanedWidgets},
    };
}

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
        // NOTE(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this.updateRenderer();
    }

    getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
        if (!prevProps.jsonMode && this.props.jsonMode) {
            const snapshot = {
                ...(this.itemEditor.current?.serialize({
                    keepDeletedWidgets: true,
                }) ?? {}),
                hints: this.hintsEditor.current?.serialize({
                    keepDeletedWidgets: true,
                }),
            };
            return stripEditorOnlyRadioFields(snapshot);
        }
        return null;
    }

    componentDidUpdate(previousProps: Props, prevState: State, snapshot: any) {
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

        // Use serialized snapshot from before unmount
        if (snapshot) {
            this.setState({json: snapshot});
            return;
        }

        if (
            !_.isEqual(previousProps.question, this.props.question) ||
            !_.isEqual(previousProps.answerArea, this.props.answerArea) ||
            !_.isEqual(previousProps.hints, this.props.hints)
        ) {
            this.syncJsonStateFromProps();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Updates JSON state when props change from the parent.
     *
     * `state.json` is initialized once in the constructor. If the
     * Frontend sends fresh data while the editor is already mounted,
     * we need to update state.json to reflect those changes.
     */
    syncJsonStateFromProps() {
        if (!this.props.question) {
            return;
        }

        this.setState({
            json: {
                question: this.props.question,
                answerArea: this.props.answerArea,
                hints: this.props.hints as Hint[],
            },
        });
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
                item: this.serializeForPreview(),
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
            return stripEditorOnlyRadioFields(this.state.json);
        }
        const result = _.extend(this.itemEditor.current?.serialize(options), {
            hints: this.hintsEditor.current?.serialize(options),
        });

        return stripEditorOnlyRadioFields(result);
    }

    // Serializes item data for the Edit tab iframe preview.
    // Unlike serialize() (the save path), this preserves the
    // _showShuffledPreview marker to control preview shuffling,
    // then applies the preview-specific shuffle override.
    serializeForPreview(): PerseusItem {
        const item = _.extend(this.itemEditor.current?.serialize(), {
            hints: this.hintsEditor.current?.serialize(),
        });

        // For the Edit tab preview, default radio widgets to unshuffled
        // unless the editor's "Shuffle preview" toggle is on.
        const widgets = item?.question?.widgets;
        if (widgets) {
            for (const widgetId of Object.keys(widgets)) {
                const widget = widgets[widgetId];
                if (widget?.type === "radio" && widget.options) {
                    const newOptions = {...widget.options};
                    if (!newOptions._showShuffledPreview) {
                        newOptions.randomize = false;
                    }
                    delete newOptions._showShuffledPreview;
                    widgets[widgetId] = {...widget, options: newOptions};
                }
            }
        }

        return item;
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
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;

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
                                        disabled={
                                            this.props.apiOptions
                                                ?.editingDisabled
                                        }
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
                                editingDisabled={editingDisabled}
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
                        />
                    )}
                </div>
            </Dependencies.DependenciesContext.Provider>
        );
    }
}

export default EditorPage;
