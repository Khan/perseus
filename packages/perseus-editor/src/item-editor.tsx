import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import {A11yContext} from "./components/a11y-context";
import DeviceFramer from "./components/device-framer";
import Editor from "./editor";
import ExtrasEditor from "./extras-editor";
import PreviewWithIframe from "./preview-with-iframe";
import {createPreviewContentDeriver} from "./util/derive-question-preview-content";

import type {A11yReport} from "./preview/use-preview-controller";
import type {
    APIOptions,
    ImageUploader,
    ChangeHandler,
    DeviceType,
} from "@khanacademy/perseus";
import type {
    PerseusAnswerArea,
    PerseusRenderer,
    PerseusItem,
} from "@khanacademy/perseus-core";

type Props = {
    /** Additional templates that the host application would like to display
     * within the Perseus Editor.
     */
    additionalTemplates?: Record<string, string>;
    apiOptions?: APIOptions;
    deviceType: DeviceType;
    widgetIsOpen?: boolean;
    imageUploader?: ImageUploader;
    question?: PerseusRenderer;
    answerArea?: PerseusAnswerArea | null;
    /** URL of the route to show on initial load of the preview frames. */
    previewURL: string;
    onChange: (changed: Partial<PerseusItem>) => void;
    /** The content ID of the AssessmentItem being edited. It may not be set
     * for non-content library exercise questions.
     */
    itemId?: string;
    /** Whether to highlight lint warnings in the preview. */
    highlightLint: boolean;
    /** The problem number, used for deterministic random seeding in the
     * preview. */
    problemNum?: number;
};

// NOTE: ItemEditor does not actually produce an entire PerseusItem. Hints are
// edited separately.
class ItemEditor extends React.Component<Props> {
    static contextType = A11yContext;
    declare context: React.ContextType<typeof A11yContext>;

    static defaultProps: {
        answerArea: Record<any, any>;
        onChange: () => void;
        question: Record<any, any>;
    } = {
        onChange: () => {},
        question: {},
        answerArea: {},
    };
    questionEditor = React.createRef<Editor>();
    extrasEditor = React.createRef<ExtrasEditor>();
    derivePreviewContent = createPreviewContentDeriver();

    // Notify the parent that the question or answer area has been updated.
    updateProps = (newProps: Partial<PerseusItem>) => {
        const props = _(this.props).pick("question", "answerArea");

        this.props.onChange(_(props).extend(newProps));
    };

    handleEditorChange: ChangeHandler = (newProps) => {
        const question = _.extend({}, this.props.question, newProps);
        this.updateProps({question});
    };

    handleExtrasChange = (newProps: Partial<PerseusAnswerArea>) => {
        const answerArea = _.extend({}, this.props.answerArea, newProps);
        this.updateProps({answerArea});
    };

    getSaveWarnings: () => any = () => {
        return this.questionEditor.current?.getSaveWarnings();
    };

    handleA11yReport = (report: A11yReport | null) => {
        this.context?.onA11yReport(report);
    };

    serialize(): {
        answerArea: PerseusAnswerArea;
        question: PerseusRenderer;
    } {
        invariant(
            this.questionEditor.current,
            "cannot serialize ItemEditor without Editor",
        );
        invariant(
            this.extrasEditor.current,
            "cannot serialize ItemEditor without ExtrasEditor",
        );
        return {
            question: this.questionEditor.current.serialize(),
            answerArea: this.extrasEditor.current.serialize(),
        };
    }

    render(): React.ReactNode {
        const isMobile =
            this.props.deviceType === "phone" ||
            this.props.deviceType === "tablet";
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;
        const a11yScanningEnabled = this.context?.a11yScanningEnabled ?? false;
        const highlightInstanceIds = this.context?.highlightInstanceIds ?? [];

        return (
            <div className="perseus-editor-table">
                <div className="perseus-editor-row perseus-question-container">
                    <div className="perseus-editor-left-cell">
                        <div className="pod-title">Question</div>
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
                                imageUploader={this.props.imageUploader}
                                onChange={this.handleEditorChange}
                                apiOptions={this.props.apiOptions}
                                showWordCount={true}
                                widgetIsOpen={this.props.widgetIsOpen}
                                additionalTemplates={
                                    this.props.additionalTemplates
                                }
                                {...this.props.question}
                            />
                        </fieldset>
                    </div>

                    <div className="perseus-editor-right-cell">
                        <div id="problemarea">
                            <DeviceFramer
                                deviceType={this.props.deviceType}
                                nochrome={true}
                            >
                                <PreviewWithIframe
                                    key={this.props.deviceType}
                                    isMobile={isMobile}
                                    seamless={true}
                                    url={this.props.previewURL}
                                    content={this.derivePreviewContent({
                                        question: this.props.question,
                                        apiOptions: this.props.apiOptions,
                                        deviceType: this.props.deviceType,
                                        highlightLint: this.props.highlightLint,
                                        problemNum: this.props.problemNum,
                                        legacyPerseusLint:
                                            this.getSaveWarnings() ?? [],
                                    })}
                                    a11yScanningEnabled={a11yScanningEnabled}
                                    highlightInstanceIds={highlightInstanceIds}
                                    onA11yReport={this.handleA11yReport}
                                />
                            </DeviceFramer>
                        </div>
                    </div>
                </div>

                <div className="perseus-editor-row perseus-answer-container">
                    <div className="perseus-editor-left-cell">
                        <div className="pod-title">Question extras</div>
                        <ExtrasEditor
                            ref={this.extrasEditor}
                            apiOptions={this.props.apiOptions}
                            onChange={this.handleExtrasChange}
                            editingDisabled={editingDisabled}
                            {...this.props.answerArea}
                        />
                    </div>

                    <div className="perseus-editor-right-cell" />
                </div>
            </div>
        );
    }
}

export default ItemEditor;
