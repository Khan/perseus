/* eslint-disable react/forbid-prop-types, react/sort-comp */
import {components, icons, ApiOptions, Changeable} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from '../editor';

const {InlineIcon, TextInput} = components;
const {iconPlus, iconTrash} = icons;

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

    static widgetName: 'graded-group' = "graded-group";

    static defaultProps: Props = {
        title: "",
        content: "",
        widgets: {},
        images: {},
        hint: null,
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleAddHint: () => void = () => {
        const hint = {content: ""} as const;
        this.props.onChange({hint}, () => {
            // eslint-disable-next-line react/no-string-refs
            this.refs["hint-editor"].focus();
        });
    };

    handleRemoveHint: (arg1: React.MouseEvent) => void = (e) => {
        this.props.onChange({hint: null});
    };

    render(): React.ReactElement {
        return (
            <div className="perseus-group-editor">
                <div className="perseus-widget-row">
                    <label className={css(styles.title)}>
                        Title:{" "}
                        <TextInput
                            value={this.props.title}
                            className={css(styles.input)}
                            onChange={this.change("title")}
                        />
                    </label>
                </div>
                <Editor
                    // eslint-disable-next-line react/no-string-refs
                    ref="editor"
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
                            // eslint-disable-next-line react/no-string-refs
                            ref="hint-editor"
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

    getSaveWarnings: () => any = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.getSaveWarnings();
    };

    serialize: () => {
        title: string,
        hint: any | null | undefined
    } = () => {
        return {
            title: this.props.title,
            // eslint-disable-next-line react/no-string-refs
            ...this.refs.editor.serialize(),
            hint:
                // eslint-disable-next-line react/no-string-refs
                this.refs["hint-editor"] &&
                // eslint-disable-next-line react/no-string-refs
                this.refs["hint-editor"].serialize(),
        };
    };
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
