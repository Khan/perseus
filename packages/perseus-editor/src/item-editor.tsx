import {itemDataVersion} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import DeviceFramer from "./components/device-framer";
import Editor from "./editor";
import ItemExtrasEditor from "./item-extras-editor";
import ContentRenderer from "./preview/content-renderer";

import type {
    APIOptions,
    ImageUploader,
    ChangeHandler,
    DeviceType,
    PerseusRenderer,
} from "@khanacademy/perseus";

const ITEM_DATA_VERSION = itemDataVersion;

type Props = {
    apiOptions?: APIOptions;
    deviceType?: DeviceType;
    gradeMessage?: string;
    imageUploader?: ImageUploader;
    wasAnswered?: boolean;
    question?: PerseusRenderer;
    answerArea?: any;
    // URL of the route to show on initial load of the preview frames.
    previewURL: string;
    onChange: ChangeHandler;
    // The content ID of the AssessmentItem being edited. It may not be set
    // for non-content library exercise questions.
    itemId?: string;
};

class ItemEditor extends React.Component<Props> {
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

    // Notify the parent that the question or answer area has been updated.
    updateProps: ChangeHandler = (newProps, cb, silent) => {
        const props = _(this.props).pick("question", "answerArea");

        this.props.onChange(_(props).extend(newProps), cb, silent);
    };

    handleEditorChange: ChangeHandler = (newProps, cb, silent) => {
        const question = _.extend({}, this.props.question, newProps);
        this.updateProps({question}, cb, silent);
    };

    handleItemExtrasChange: ChangeHandler = (newProps, cb, silent) => {
        const answerArea = _.extend({}, this.props.answerArea, newProps);
        this.updateProps({answerArea}, cb, silent);
    };

    getSaveWarnings: () => any = () => {
        return this.questionEditor.current?.getSaveWarnings();
    };

    serialize: (options?: any) => {
        answerArea: any;
        itemDataVersion: {
            major: number;
            minor: number;
        };
        question: any;
    } = (options: any) => {
        return {
            question: this.questionEditor.current?.serialize(options),
            answerArea: this.itemExtrasEditor.current?.serialize(),
            itemDataVersion: ITEM_DATA_VERSION,
        };
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-editor-table">
                <div className="perseus-editor-row perseus-question-container">
                    <div className="perseus-editor-left-cell">
                        <div className="pod-title">Question</div>
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
                            {...this.props.question}
                        />
                    </div>

                    <div className="perseus-editor-right-cell">
                        <div id="problemarea">
                            <DeviceFramer
                                deviceType={this.props.deviceType}
                                nochrome={true}
                            >
                                <ContentRenderer
                                    apiOptions={this.props.apiOptions}
                                    question={this.props.question}
                                    linterContext={{
                                        contentType: "exercise",
                                        highlightLint: true,
                                        paths: [],
                                        stack: [],
                                    }}
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
                        <div className="pod-title">Question extras</div>
                        <ItemExtrasEditor
                            ref={this.itemExtrasEditor}
                            onChange={this.handleItemExtrasChange}
                            {...this.props.answerArea}
                        />
                    </div>

                    <div className="perseus-editor-right-cell">
                        <div id="answer_area" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemEditor;
