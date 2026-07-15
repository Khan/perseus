import {components, ClassNames, Dependencies} from "@khanacademy/perseus";
import {
    getDefaultAnswerArea,
    parseAndMigratePerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import {A11yContext, createA11yContextValue} from "./components/a11y-context";
import IssuesPanel from "./components/issues-panel";
import JsonEditor from "./components/json-editor";
import ViewportResizer from "./components/viewport-resizer";
import CombinedHintsEditor from "./hint-editor";
import ItemEditor from "./item-editor";
import {createDeviceApiOptionsDeriver} from "./util/derive-device-api-options";
import {gatherLinterIssues} from "./util/gather-linter-issues";

import type {A11yIssue, Issue} from "./components/issues-panel";
import type {A11yReport} from "./preview/use-preview-controller";
import type {
    APIOptions,
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

type OnChangeParams = {
    jsonMode?: boolean;
    question?: PerseusRenderer;
    hints?: Hint[];
    answerArea?: PerseusAnswerArea | null | undefined;
};

type Props = {
    /** Additional templates that the host application would like to display
     * within the Perseus Editor.
     */
    additionalTemplates?: Record<string, string>;
    apiOptions?: APIOptions;
    answerArea: PerseusAnswerArea; // related to the question,
    dependencies: PerseusDependenciesV2;
    /** "Power user" mode. Shows the raw JSON of the question. */
    developerMode: boolean;
    hints: Hint[]; // related to the question,
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
    onChange: (changed: OnChangeParams) => void;
    /** A function which is called when the preview device changes. */
    onPreviewDeviceChange: (arg1: DeviceType) => unknown;
    previewDevice: DeviceType;
    /** A global control to expand/collapse all widget editors on a page. */
    widgetsAreOpen?: boolean;
    /** Initial value of the question being edited. */
    question: PerseusRenderer;
    /** URL of the route to show on initial load of the preview frames. */
    previewURL: string;
    /** Additional issues that the host application would like to display
     * within the Perseus Editor. This allows the hosts to present issues
     * with the content that aren't linted/detected by Perseus itself.
     */
    issues?: Issue[];
    /** The problem number, used for deterministic random seeding in the
     * preview. */
    problemNum?: number;
};

type DefaultProps = {
    answerArea: Props["answerArea"];
    developerMode: Props["developerMode"];
    hints: Props["hints"];
    jsonMode: Props["jsonMode"];
    onChange: Props["onChange"];
};

type State = {
    json: PerseusItem;
    highlightLint: boolean;
    widgetsAreOpen: boolean;
    issues: Issue[];
    axeCoreIssues: A11yIssue[];
    showAxeCoreIssues: boolean;
    /** Active "Show Me" highlights, keyed by issue id. */
    highlights: Record<string, string>;
};

class EditorPage extends React.Component<Props, State> {
    itemEditor = React.createRef<ItemEditor>();
    hintsEditor = React.createRef<CombinedHintsEditor>();

    // Derives the preview's device-adjusted apiOptions with a stable reference
    // across renders (see createDeviceApiOptionsDeriver for why that matters).
    deriveDeviceApiOptions = createDeviceApiOptionsDeriver();

    static defaultProps: DefaultProps = {
        answerArea: getDefaultAnswerArea(),
        developerMode: false,
        hints: [],
        jsonMode: false,
        onChange: () => {},
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            json: _.pick(this.props, "question", "answerArea", "hints"),
            highlightLint: true,
            widgetsAreOpen: this.props.widgetsAreOpen ?? true,
            issues: [],
            axeCoreIssues: [],
            showAxeCoreIssues: false,
            highlights: {},
        };
    }

    componentDidMount() {
        this.setState({
            issues: gatherLinterIssues(
                this.props.question,
                this.props.hints,
                this.props.issues,
            ),
        });
    }

    getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
        if (!prevProps.jsonMode && this.props.jsonMode) {
            return {
                ...(this.itemEditor.current?.serialize() ?? {}),
                hints: this.hintsEditor.current?.serialize(),
            };
        }
        return null;
    }

    componentDidUpdate(previousProps: Props, prevState: State, snapshot: any) {
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

        const questionOrHintsChanged =
            previousProps.question?.content !== this.props.question?.content ||
            previousProps.question?.widgets !== this.props.question?.widgets ||
            !_.isEqual(previousProps.hints, this.props.hints);

        if (questionOrHintsChanged) {
            this.setState({
                issues: gatherLinterIssues(
                    this.props.question,
                    this.props.hints,
                    this.props.issues,
                ),
            });
        }
    }

    // Activates or clears (previewId === null) an issue's "Show Me"
    // highlight. Keyed by issueId so multiple issues can be highlighted at
    // once.
    setIssueHighlight = (issueId: string, previewId: string | null) => {
        this.setState((prevState) => {
            const highlights = {...prevState.highlights};
            if (previewId == null) {
                delete highlights[issueId];
            } else {
                highlights[issueId] = previewId;
            }
            return {highlights};
        });
    };

    handleA11yReport = (report: A11yReport | null) => {
        this.setState({
            axeCoreIssues: report
                ? [...report.violations, ...report.incompletes]
                : [],
        });
    };

    setA11yEnabled = (enabled: boolean) => {
        this.setState({showAxeCoreIssues: enabled});
    };

    /**
     * Updates JSON state when props change from the parent.
     *
     * `state.json` is initialized once in the constructor. If the
     * Frontend sends fresh data while the editor is already mounted,
     * we need to update state.json to reflect those changes.
     */
    syncJsonStateFromProps() {
        this.setState({
            json: {
                question: this.props.question,
                answerArea: this.props.answerArea,
                // eslint-disable-next-line no-restricted-syntax
                hints: this.props.hints as Hint[],
            },
        });
    }

    toggleJsonMode: () => void = () => {
        this.setState(
            {
                json: this.serialize(),
            },
            () => {
                this.props.onChange({
                    jsonMode: !this.props.jsonMode,
                });
            },
        );
    };

    getSaveWarnings(): any {
        const issues1 = this.itemEditor.current?.getSaveWarnings();
        const issues2 = this.hintsEditor.current?.getSaveWarnings();
        return issues1.concat(issues2);
    }

    /**
     * Returns the current version of the edited {@link PerseusItem}.
     *
     * @deprecated Use the {@link Props.onChange} prop instead.
     */
    serialize(): PerseusItem {
        if (this.props.jsonMode) {
            return this.state.json;
        }
        invariant(
            this.itemEditor.current,
            "cannot serialize EditorPage without ItemEditor",
        );
        invariant(
            this.hintsEditor.current,
            "cannot serialize EditorPage without HintsEditor",
        );
        return {
            ...this.itemEditor.current.serialize(),
            hints: this.hintsEditor.current.serialize(),
        };
    }

    handleChange = (toChange: OnChangeParams) => {
        const newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps);
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
        const deviceBasedApiOptions = this.deriveDeviceApiOptions({
            apiOptions: this.props.apiOptions,
            touch,
        });

        const showEditor = !this.props.developerMode || !this.props.jsonMode;

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
                                parser={parseAndMigratePerseusItem}
                                onChange={this.changeJSON}
                                editingDisabled={editingDisabled}
                            />
                        </div>
                    )}

                    <A11yContext.Provider
                        value={createA11yContextValue({
                            setIssueHighlight: this.setIssueHighlight,
                            a11yEnabled: this.state.showAxeCoreIssues,
                            setA11yEnabled: this.setA11yEnabled,
                            highlightPreviewIds: Object.values(
                                this.state.highlights,
                            ),
                            onA11yReport: this.handleA11yReport,
                            axeCoreIssues: this.state.axeCoreIssues,
                        })}
                    >
                        {showEditor && (
                            <div className="perseus-editor-table">
                                <div className="perseus-editor-row">
                                    <div className="perseus-editor-left-cell">
                                        <IssuesPanel
                                            issues={this.state.issues}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {showEditor && (
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
                                additionalTemplates={
                                    this.props.additionalTemplates
                                }
                                highlightLint={this.state.highlightLint}
                                problemNum={this.props.problemNum}
                            />
                        )}
                    </A11yContext.Provider>

                    {showEditor && (
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
