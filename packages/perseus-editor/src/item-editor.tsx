import {APIOptionsContext, PerseusMarkdown} from "@khanacademy/perseus";
import * as PerseusLinter from "@khanacademy/perseus-linter";
import * as React from "react";
import _ from "underscore";

import DeviceFramer from "./components/device-framer";
import IssuesPanel from "./components/issues-panel";
import Editor from "./editor";
import IframeContentRenderer from "./iframe-content-renderer";
import ItemExtrasEditor from "./item-extras-editor";
import {WARNINGS} from "./messages";
import {ItemEditorContext} from "./util/item-editor-context";

import type {Issue} from "./components/issues-panel";
import type {
    ImageUploader,
    // eslint-disable-next-line import/no-deprecated
    ChangeHandler,
    DeviceType,
} from "@khanacademy/perseus";
import type {
    PerseusAnswerArea,
    PerseusWidgetsMap,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

type Props = {
    /** Additional templates that the host application would like to display
     * within the Perseus Editor.
     */
    additionalTemplates?: Record<string, string>;
    deviceType?: DeviceType;
    widgetIsOpen?: boolean;
    imageUploader?: ImageUploader;
    question?: PerseusRenderer;
    answerArea?: PerseusAnswerArea | null;
    /** URL of the route to show on initial load of the preview frames. */
    previewURL: string;
    // eslint-disable-next-line import/no-deprecated
    onChange: ChangeHandler;
    /** The content ID of the AssessmentItem being edited. It may not be set
     * for non-content library exercise questions.
     */
    itemId?: string;
    issues?: Issue[];
};

type State = {
    issues: Issue[];
};

class ItemEditor extends React.Component<Props, State> {
    static defaultProps: {
        answerArea: Record<any, any>;
        onChange: () => void;
        question: Record<any, any>;
    } = {
        onChange: () => {},
        question: {},
        answerArea: {},
    };
    static prevContent: string | undefined;
    static prevWidgets: PerseusWidgetsMap | undefined;

    frame = React.createRef<IframeContentRenderer>();
    questionEditor = React.createRef<React.ElementRef<typeof Editor>>();
    itemExtrasEditor = React.createRef<ItemExtrasEditor>();

    state = {
        issues: [],
    };

    static getDerivedStateFromProps(props: Props): Partial<State> | null {
        // Short-circuit if nothing changed
        if (
            props.question?.content === ItemEditor.prevContent &&
            props.question?.widgets === ItemEditor.prevWidgets
        ) {
            return null;
        }

        // Update cached values
        ItemEditor.prevContent = props.question?.content;
        ItemEditor.prevWidgets = props.question?.widgets;

        const parsed = PerseusMarkdown.parse(props.question?.content ?? "", {});
        const linterContext = {
            content: props.question?.content,
            widgets: props.question?.widgets,
            stack: [],
        };

        return {
            issues: [
                ...(props.issues ?? []),
                ...(PerseusLinter.runLinter(parsed, linterContext, false)?.map(
                    (linterWarning) => {
                        if (linterWarning.rule === "inaccessible-widget") {
                            return WARNINGS.inaccessibleWidget(
                                linterWarning.metadata?.widgetType ?? "unknown",
                                linterWarning.metadata?.widgetId ?? "unknown",
                            );
                        }
                        return WARNINGS.genericLinterWarning(
                            linterWarning.rule,
                            linterWarning.message,
                        );
                    },
                ) ?? []),
            ],
        };
    }

    // Notify the parent that the question or answer area has been updated.
    // eslint-disable-next-line import/no-deprecated
    updateProps: ChangeHandler = (newProps, cb, silent) => {
        const props = _(this.props).pick("question", "answerArea");

        this.props.onChange(_(props).extend(newProps), cb, silent);
    };

    triggerPreviewUpdate: (newData?: any) => void = (newData: any) => {
        this.frame.current?.sendNewData(newData);
    };

    // eslint-disable-next-line import/no-deprecated
    handleEditorChange: ChangeHandler = (newProps, cb, silent) => {
        const question = _.extend({}, this.props.question, newProps);
        this.updateProps({question}, cb, silent);
    };

    handleItemExtrasChange = (newProps: Partial<PerseusAnswerArea>) => {
        const answerArea = _.extend({}, this.props.answerArea, newProps);
        this.updateProps({answerArea}, () => {}, true);
    };

    getSaveWarnings: () => any = () => {
        return this.questionEditor.current?.getSaveWarnings();
    };

    serialize: (options?: any) => {
        answerArea: PerseusAnswerArea | undefined;
        question: any;
    } = (options: any) => {
        return {
            question: this.questionEditor.current?.serialize(options),
            answerArea: this.itemExtrasEditor.current?.serialize(),
        };
    };

    render(): React.ReactNode {
        const isMobile =
            this.props.deviceType === "phone" ||
            this.props.deviceType === "tablet";

        return (
            <ItemEditorContext.Provider
                value={{
                    question: this.props.question!,
                    onEditorChange: this.handleEditorChange,
                }}
            >
                <APIOptionsContext.Consumer>
                    {({apiOptions}) => {
                        const editingDisabled =
                            apiOptions.editingDisabled ?? false;
                        return (
                            <div className="perseus-editor-table">
                                <div className="perseus-editor-row perseus-question-container">
                                    <div className="perseus-editor-left-cell">
                                        <IssuesPanel
                                            issues={this.state.issues}
                                        />
                                        <div className="pod-title">
                                            Question
                                        </div>
                                        <fieldset disabled={editingDisabled}>
                                            <Editor
                                                ref={this.questionEditor}
                                                // Using the AssessmentItem content ID as the key
                                                // ensures that when the user navigates to another
                                                // item in the Sidebar, the question editor is
                                                // re-rendered by React.
                                                key={this.props.itemId}
                                                placeholder="Type your question here..."
                                                className="perseus-question-editor"
                                                imageUploader={
                                                    this.props.imageUploader
                                                }
                                                onChange={
                                                    this.handleEditorChange
                                                }
                                                showWordCount={true}
                                                widgetIsOpen={
                                                    this.props.widgetIsOpen
                                                }
                                                additionalTemplates={
                                                    this.props
                                                        .additionalTemplates
                                                }
                                                {...this.props.question}
                                            />
                                        </fieldset>
                                    </div>

                                    <div className="perseus-editor-right-cell">
                                        <div id="problemarea">
                                            <DeviceFramer
                                                deviceType={
                                                    this.props.deviceType
                                                }
                                                nochrome={true}
                                            >
                                                <IframeContentRenderer
                                                    ref={this.frame}
                                                    key={this.props.deviceType}
                                                    datasetKey="mobile"
                                                    datasetValue={isMobile}
                                                    seamless={true}
                                                    url={this.props.previewURL}
                                                />
                                            </DeviceFramer>
                                            <div
                                                id="hintsarea"
                                                className="hintsarea"
                                                style={{display: "none"}}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="perseus-editor-row perseus-answer-container">
                                    <div className="perseus-editor-left-cell">
                                        <div className="pod-title">
                                            Question extras
                                        </div>
                                        <ItemExtrasEditor
                                            ref={this.itemExtrasEditor}
                                            onChange={
                                                this.handleItemExtrasChange
                                            }
                                            editingDisabled={editingDisabled}
                                            {...this.props.answerArea}
                                        />
                                    </div>

                                    <div className="perseus-editor-right-cell" />
                                </div>
                            </div>
                        );
                    }}
                </APIOptionsContext.Consumer>
            </ItemEditorContext.Provider>
        );
    }
}

export default ItemEditor;
