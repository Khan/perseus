/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {components, Changeable, iconTrash} from "@khanacademy/perseus";
import {gradedGroupLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import Editor from "../editor";
import {iconPlus} from "../styles/icon-paths";

import styles from "./graded-group-editor.module.css";

import type {
    GradedGroupDefaultWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

const {InlineIcon, TextInput} = components;

type Props = {
    title?: string;
    content?: string;
    widgets?: Record<string, any>;
    images?: Record<string, any>;
    apiOptions?: any;
    hint?: {
        content: string;
        widgets: Record<string, any>;
        images: Record<string, any>;
    } | null;
    onChange: (...args: ReadonlyArray<any>) => any;
};

class GradedGroupEditor extends React.Component<Props> {
    static widgetName = "graded-group" as const;

    static defaultProps: GradedGroupDefaultWidgetOptions =
        gradedGroupLogic.defaultWidgetOptions;

    editor = React.createRef<Editor>();
    hintEditor = React.createRef<Editor>();

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleAddHint: () => void = () => {
        const hint: PerseusRenderer = {content: "", images: {}, widgets: {}};
        this.props.onChange({hint}, () => {
            this.hintEditor.current?.focus();
        });
    };

    handleRemoveHint: (arg1: React.MouseEvent) => void = (e) => {
        this.props.onChange({hint: null});
    };

    getSaveWarnings: () => any = () => {
        return this.editor.current?.getSaveWarnings();
    };

    serialize: () => {
        title: string | undefined;
        hint: any | null | undefined;
    } = () => {
        return {
            title: this.props.title,
            ...this.editor.current?.serialize(),
            hint: this.hintEditor.current?.serialize(),
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
                    immutableWidgets={false}
                    onChange={this.props.onChange}
                    warnNoPrompt={true}
                    warnNoWidgets={true}
                />
                {!this.props.hint && (
                    <button
                        type="button"
                        className={`add-hint simple-button orange ${styles.addHintButton}`}
                        onClick={this.handleAddHint}
                        disabled={editingDisabled}
                    >
                        <InlineIcon {...iconPlus} /> Add a hint
                    </button>
                )}
                {this.props.hint && (
                    <div className="perseus-hint-editor">
                        <div className={styles.hintsTitle}>Hint</div>
                        <Editor
                            ref={this.hintEditor}
                            content={
                                this.props.hint ? this.props.hint.content : ""
                            }
                            widgets={
                                this.props.hint ? this.props.hint.widgets : {}
                            }
                            apiOptions={this.props.apiOptions}
                            images={this.props.hint && this.props.hint.images}
                            widgetEnabled={true}
                            immutableWidgets={false}
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
                        <button
                            type="button"
                            className="remove-hint simple-button orange"
                            onClick={this.handleRemoveHint}
                            disabled={editingDisabled}
                        >
                            <InlineIcon {...iconTrash} /> Remove this hint
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default GradedGroupEditor;
