/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/forbid-prop-types */
import {
    components,
    ApiOptions,
    Changeable,
    iconTrash,
} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";

import Editor from "../editor";
import {iconPlus} from "../styles/icon-paths";

import type {
    GradedGroupDefaultWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

const {InlineIcon, TextInput} = components;

type Props = any;

class GradedGroupEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        title: PropTypes.string,
        content: PropTypes.string,
        widgets: PropTypes.object,
        images: PropTypes.object,
        apiOptions: ApiOptions.propTypes,
    };

    static widgetName = "graded-group" as const;

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
        title: string;
        hint: any | null | undefined;
    } = () => {
        return {
            title: this.props.title,
            ...this.editor.current?.serialize(),
            hint: this.hintEditor.current?.serialize(),
        };
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-group-editor">
                <div className="perseus-widget-row">
                    <label className={css(styles.title)}>
                        Title:{" "}
                        <TextInput
                            value={this.props.title}
                            className={css(styles.input)}
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
                        style={{marginTop: 10}}
                        className="add-hint simple-button orange"
                        onClick={this.handleAddHint}
                    >
                        <InlineIcon {...iconPlus} /> Add a hint
                    </button>
                )}
                {this.props.hint && (
                    <div className="perseus-hint-editor">
                        <div className={css(styles.hintsTitle)}>Hint</div>
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
                        >
                            <InlineIcon {...iconTrash} /> Remove this hint
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },

    input: {
        fontSize: 18,
    },

    hintsTitle: {
        marginTop: 10,
        fontSize: "110%",
        fontWeight: "bold",
    },
});

export default GradedGroupEditor;
