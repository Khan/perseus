import {components} from "@khanacademy/perseus";
import {
    gradedGroupLogic,
    getDefaultAnswerArea,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import Editor from "../../editor";
import ExtrasEditor from "../../extras-editor";

import styles from "./graded-group-editor.module.css";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {
    PerseusGradedGroupWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

const {TextInput} = components;

interface Props extends PerseusGradedGroupWidgetOptions {
    apiOptions?: APIOptionsWithDefaults;
    onChange: (options: PerseusGradedGroupWidgetOptions) => void;
}

class GradedGroupEditor extends React.Component<Props> {
    static defaultProps: PerseusGradedGroupWidgetOptions =
        gradedGroupLogic.defaultWidgetOptions;

    editor = React.createRef<Editor>();
    hintEditor = React.createRef<Editor>();

    handleChange(changes: Partial<PerseusGradedGroupWidgetOptions>) {
        this.props.onChange({
            title: this.props.title,
            hint: this.props.hint,
            content: this.props.content,
            widgets: this.props.widgets,
            images: this.props.images,
            answerArea: this.props.answerArea,
            ...changes,
        });
    }

    handleAddHint: () => void = () => {
        const hint: PerseusRenderer = {content: "", images: {}, widgets: {}};
        this.handleChange({hint});
    };

    handleRemoveHint: () => void = () => {
        this.handleChange({hint: null});
    };

    getSaveWarnings: () => any = () => {
        return this.editor.current?.getSaveWarnings();
    };

    serialize: () => {
        title: string;
        hint: any | null | undefined;
    } = () => {
        return {
            title: this.props.title,
            ...this.editor.current?.serialize(),
            hint: this.hintEditor.current?.serialize(),
            ...(this.props.answerArea
                ? {answerArea: this.props.answerArea}
                : {}),
        };
    };

    render(): React.ReactNode {
        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;
        return (
            <div className="perseus-group-editor">
                <div className="perseus-widget-row">
                    <label className={styles.title}>
                        Title:{" "}
                        <TextInput
                            value={this.props.title}
                            className={styles.input}
                            onChange={(title) => this.handleChange({title})}
                        />
                    </label>
                </div>
                <Editor
                    ref={this.editor}
                    content={this.props.content}
                    widgets={this.props.widgets}
                    apiOptions={this.props.apiOptions}
                    images={this.props.images}
                    widgetEnabled={true}
                    onChange={(renderer) => this.handleChange(renderer)}
                    warnNoPrompt={true}
                    warnNoWidgets={true}
                />
                {!this.props.hint && (
                    <Button
                        startIcon={plusIcon}
                        size="small"
                        kind="tertiary"
                        onClick={this.handleAddHint}
                        disabled={editingDisabled}
                    >
                        Add a hint
                    </Button>
                )}
                {this.props.hint && (
                    <div className="perseus-hint-editor">
                        <div className={styles.hintsTitle}>Hint</div>
                        <Editor
                            ref={this.hintEditor}
                            content={this.props.hint.content}
                            widgets={this.props.hint.widgets}
                            apiOptions={this.props.apiOptions}
                            images={this.props.hint.images}
                            widgetEnabled={true}
                            onChange={(hint) => {
                                this.handleChange({hint});
                            }}
                        />
                        <Button
                            startIcon={trashIcon}
                            size="small"
                            kind="tertiary"
                            onClick={this.handleRemoveHint}
                            disabled={editingDisabled}
                            // Have the "Remove" button align to the right.
                            style={{marginInlineStart: "auto", display: "flex"}}
                        >
                            Remove this hint
                        </Button>
                    </div>
                )}
                <ExtrasEditor
                    {...(this.props.answerArea ?? getDefaultAnswerArea())}
                    apiOptions={this.props.apiOptions}
                    editingDisabled={editingDisabled}
                    onChange={(changes) => {
                        this.handleChange({
                            answerArea: {
                                ...getDefaultAnswerArea(),
                                ...this.props.answerArea,
                                ...changes,
                            },
                        });
                    }}
                />
            </div>
        );
    }
}

export default GradedGroupEditor;
