/* eslint-disable @khanacademy/ts-no-error-suppressions */
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
import {deprecatedChangeableChange} from "../../mixins/changeable";

import styles from "./graded-group-editor.module.css";

import type {ChangeableProps} from "../../mixins/changeable";
import type {APIOptionsWithDefaults} from "@khanacademy/perseus";
import type {
    PerseusGradedGroupWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

const {TextInput} = components;

interface Props extends PerseusGradedGroupWidgetOptions, ChangeableProps {
    apiOptions?: APIOptionsWithDefaults;
}

class GradedGroupEditor extends React.Component<Props> {
    static defaultProps: PerseusGradedGroupWidgetOptions =
        gradedGroupLogic.defaultWidgetOptions;

    editor = React.createRef<Editor>();
    hintEditor = React.createRef<Editor>();

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return deprecatedChangeableChange.apply(this, args);
    };

    handleAddHint: () => void = () => {
        const hint: PerseusRenderer = {content: "", images: {}, widgets: {}};
        this.props.onChange({hint}, () => {
            this.hintEditor.current?.focus();
        });
    };

    handleRemoveHint: () => void = () => {
        this.props.onChange({hint: null});
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
                            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
                            onChange={this.change("title")}
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
                    onChange={this.props.onChange}
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
                            onChange={(props) => {
                                // Copy all props over from the existing hint
                                // and then add new props.
                                // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
                                this.change(
                                    "hint",
                                    Object.assign({}, this.props.hint, props),
                                );
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
                        this.props.onChange({
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
