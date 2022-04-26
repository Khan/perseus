/* eslint-disable static-service/require-fixture */
// @flow
import {itemDataVersion} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import DeviceFramer from "./components/device-framer.jsx";
import Editor from "./editor.jsx";
import IframeContentRenderer from "./iframe-content-renderer.jsx";
import ItemExtrasEditor from "./item-extras-editor.jsx";

import type {
    APIOptions,
    ImageUploader,
    ChangeHandler,
} from "@khanacademy/perseus";

const ITEM_DATA_VERSION = itemDataVersion;

type Props = {|
    apiOptions?: APIOptions,
    deviceType?: string,
    frameSource: string,
    gradeMessage?: string,
    imageUploader?: ImageUploader,
    wasAnswered?: boolean,
    question?: $FlowFixMe,
    answerArea?: $FlowFixMe,
    onChange: ChangeHandler,

    // The content ID of the AssessmentItem being edited. It may not be set
    // for non-content library exercise questions.
    itemId?: string,
|};

class ItemEditor extends React.Component<Props> {
    static defaultProps: {|
        answerArea: {...},
        onChange: () => void,
        question: {...},
    |} = {
        onChange: () => {},
        question: {},
        answerArea: {},
    };

    // Notify the parent that the question or answer area has been updated.
    updateProps: ChangeHandler = (newProps, cb, silent) => {
        const props = _(this.props).pick("question", "answerArea");

        this.props.onChange(_(props).extend(newProps), cb, silent);
    };

    triggerPreviewUpdate: (newData: any) => void = (newData: $FlowFixMe) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.frame.sendNewData(newData);
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
        // eslint-disable-next-line react/no-string-refs
        return this.refs.questionEditor.getSaveWarnings();
    };

    serialize: (options: any) => {|
        answerArea: any,
        itemDataVersion: {|major: number, minor: number|},
        question: any,
    |} = (options: $FlowFixMe) => {
        return {
            // eslint-disable-next-line react/no-string-refs
            question: this.refs.questionEditor.serialize(options),
            // eslint-disable-next-line react/no-string-refs
            answerArea: this.refs.itemExtrasEditor.serialize(options),
            itemDataVersion: ITEM_DATA_VERSION,
        };
    };

    render(): React.Element<"div"> {
        const isMobile =
            this.props.deviceType === "phone" ||
            this.props.deviceType === "tablet";
        return (
            <div className="perseus-editor-table">
                <div className="perseus-editor-row perseus-question-container">
                    <div className="perseus-editor-left-cell">
                        <div className="pod-title">Question</div>
                        <Editor
                            // eslint-disable-next-line react/no-string-refs
                            ref="questionEditor"
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
                                <IframeContentRenderer
                                    // eslint-disable-next-line react/no-string-refs
                                    ref="frame"
                                    key={this.props.deviceType}
                                    content={this.props.frameSource}
                                    datasetKey="mobile"
                                    datasetValue={isMobile}
                                    seamless={true}
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
                            // eslint-disable-next-line react/no-string-refs
                            ref="itemExtrasEditor"
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
