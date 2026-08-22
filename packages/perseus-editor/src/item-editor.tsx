import * as React from "react";
import invariant from "tiny-invariant";
import _ from "underscore";

import CombinedHintsEditor from "./combined-hints-editor";
import {A11yContext} from "./components/a11y-context";
import DeviceFramer from "./components/device-framer";
import Editor from "./editor";
import ItemExtrasEditor from "./item-extras-editor";
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
    Hint,
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
    hints: Hint[];
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
    itemExtrasEditor = React.createRef<ItemExtrasEditor>();
    hintsEditor = React.createRef<CombinedHintsEditor>();
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

    handleItemExtrasChange = (newProps: Partial<PerseusAnswerArea>) => {
        const answerArea = _.extend({}, this.props.answerArea, newProps);
        this.updateProps({answerArea});
    };

    // TODO(benchristel): Correctly type all getSaveWarnings methods.
    getSaveWarnings: () => any = () => {
        return [
            ...(this.questionEditor.current?.getSaveWarnings() ?? []),
            ...(this.hintsEditor.current?.getSaveWarnings() ?? []),
        ];
    };

    handleA11yReport = (report: A11yReport | null) => {
        this.context?.onA11yReport(report);
    };

    serialize(): PerseusItem {
        invariant(
            this.questionEditor.current,
            "cannot serialize ItemEditor without Editor",
        );
        invariant(
            this.itemExtrasEditor.current,
            "cannot serialize ItemEditor without ItemExtrasEditor",
        );
        invariant(
            this.hintsEditor.current,
            "cannot serialize ItemEditor without CombinedHintsEditor",
        );
        return {
            question: this.questionEditor.current.serialize(),
            answerArea: this.itemExtrasEditor.current.serialize(),
            hints: this.hintsEditor.current.serialize(),
        };
    }

    renderItemEditor(): React.ReactNode {
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
                        <ItemExtrasEditor
                            ref={this.itemExtrasEditor}
                            apiOptions={this.props.apiOptions}
                            onChange={this.handleItemExtrasChange}
                            editingDisabled={editingDisabled}
                            {...this.props.answerArea}
                        />
                    </div>

                    <div className="perseus-editor-right-cell" />
                </div>
            </div>
        );
    }

    renderHintsEditor() {
        return (
            <CombinedHintsEditor
                ref={this.hintsEditor}
                itemId={this.props.itemId}
                hints={this.props.hints}
                imageUploader={this.props.imageUploader}
                onChange={this.props.onChange}
                deviceType={this.props.deviceType}
                apiOptions={this.props.apiOptions}
                previewURL={this.props.previewURL}
                highlightLint={this.props.highlightLint}
                widgetIsOpen={this.props.widgetIsOpen}
            />
        );
    }

    render() {
        return (
            <>
                {this.renderItemEditor()}
                {this.renderHintsEditor()}
            </>
        );
    }
}

export default ItemEditor;
