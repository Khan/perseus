/* eslint-disable jsx-a11y/anchor-is-valid, no-alert, react/sort-comp */
import {components, icons, ApiOptions} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

const {InlineIcon} = components;
const {iconCircleArrowDown, iconCircleArrowUp, iconPlus, iconTrash} = icons;

type StepControlButtonProps = any;

class StepControlButton extends React.Component<StepControlButtonProps> {
    render(): React.ReactNode {
        return (
            <a
                href="#"
                className={
                    "step-control-button " +
                    "simple-button " +
                    "simple-button--small " +
                    "orange"
                }
                onClick={(e) => {
                    e.preventDefault();
                    this.props.onClick();
                }}
            >
                <InlineIcon {...this.props.icon} />
            </a>
        );
    }
}

type SequenceEditorProps = any;

class SequenceEditor extends React.Component<SequenceEditorProps> {
    static propTypes = {
        json: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
                widgets: PropTypes.objectOf(PropTypes.any),
                images: PropTypes.objectOf(PropTypes.any),
            }),
        ),
        apiOptions: ApiOptions.propTypes,
        onChange: PropTypes.func.isRequired,
    };

    static widgetName = "sequence" as const;

    static defaultProps: SequenceEditorProps = {
        json: [
            {
                content: "",
                widgets: {},
                images: {},
            },
        ],
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-sequence-editor">
                {_.map(this.props.json, (json, i) => {
                    return (
                        <div key={i}>
                            Step {i + 1}
                            <div
                                style={{
                                    display: "inline-block",
                                    float: "right",
                                }}
                            >
                                {i + 1 < this.props.json.length && (
                                    <StepControlButton
                                        icon={iconCircleArrowDown}
                                        onClick={() => {
                                            this._handleMoveStepLater(i);
                                        }}
                                    />
                                )}
                                {i > 0 && (
                                    <StepControlButton
                                        icon={iconCircleArrowUp}
                                        onClick={() => {
                                            this._handleMoveStepEarlier(i);
                                        }}
                                    />
                                )}
                                <StepControlButton
                                    icon={iconTrash}
                                    onClick={() => {
                                        const msg =
                                            "Are you sure you " +
                                            "want to remove step " +
                                            (i + 1) +
                                            "?";
                                        if (confirm(msg)) {
                                            this._handleRemoveStep(i);
                                        }
                                    }}
                                />
                                <StepControlButton
                                    icon={iconPlus}
                                    onClick={() => {
                                        this._handleAddStepAfter(i);
                                    }}
                                />
                            </div>
                            <Editor
                                ref={"editor" + i}
                                apiOptions={this.props.apiOptions}
                                content={json.content}
                                widgets={json.widgets}
                                images={json.images}
                                widgetEnabled={true}
                                immutableWidgets={false}
                                onChange={_.partial(
                                    this._handleEditorChange,
                                    i,
                                )}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    _handleEditorChange: (arg1: number, arg2: any) => void = (i, newProps) => {
        const steps = _.clone(this.props.json);
        steps[i] = _.extend({}, steps[i], newProps);
        this.props.onChange({json: steps});
    };

    serialize: () => any = () => {
        return {
            json: _.times(this.props.json.length, (i) => {
                // eslint-disable-next-line react/no-string-refs
                // @ts-expect-error - TS2339 - Property 'serialize' does not exist on type 'ReactInstance'.
                return this.refs["editor" + i].serialize();
            }),
        };
    };

    _handleMoveStepEarlier: (arg1: number) => void = (i) => {
        if (i === 0) {
            return;
        }
        const steps = _.clone(this.props.json);
        const step = steps[i];
        steps.splice(i, 1);
        steps.splice(i - 1, 0, step);
        this.props.onChange({
            json: steps,
        });
    };

    _handleMoveStepLater: (arg1: number) => void = (i) => {
        const steps = _.clone(this.props.json);
        if (i + 1 === steps.length) {
            return;
        }
        const step = steps[i];
        steps.splice(i, 1);
        steps.splice(i + 1, 0, step);
        this.props.onChange({
            json: steps,
        });
    };

    _handleAddStepAfter: (arg1: number) => void = (i) => {
        // We do a full serialization here because we
        // might be copying widgets:
        const steps = _.clone(this.props.json);
        // Here we do magic to allow you to copy-paste
        // things from the previous section into the new
        // section while preserving widgets.
        // To enable this, we preserve the widgets
        // object for the new section, but wipe out
        // the content.
        const newStep =
            i >= 0
                ? {
                      widgets: steps[i].widgets,
                  }
                : {};
        steps.splice(i + 1, 0, newStep);
        this.props.onChange({
            json: steps,
        });
    };

    _handleRemoveStep: (arg1: number) => void = (i) => {
        const steps = _.clone(this.props.json);
        steps.splice(i, 1);
        this.props.onChange({
            json: steps,
        });
    };
}

export default SequenceEditor;
