/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {components, EditorJsonify} from "@khanacademy/perseus";
import {
    dropdownLogic,
    type DropdownDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelMedium} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

const {InfoTip} = components;

type Props = any;

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a dropdown widget that allows users to select an option from a predefined list.
 */
class DropdownEditor extends React.Component<Props> {
    static propTypes = {
        choices: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
                correct: PropTypes.bool,
            }),
        ),
        placeholder: PropTypes.string,
    };

    static widgetName = "dropdown" as const;

    static defaultProps: DropdownDefaultWidgetOptions =
        dropdownLogic.defaultWidgetOptions;

    onVisibleLabelChange: (arg1: string) => void = (visibleLabel) => {
        this.props.onChange({visibleLabel});
    };

    onAriaLabelChange: (arg1: string) => void = (ariaLabel) => {
        this.props.onChange({ariaLabel});
    };

    onPlaceholderChange: (arg1: string) => void = (placeholder) => {
        this.props.onChange({placeholder});
    };

    onCorrectChange: (arg1: number) => void = (choiceIndex) => {
        const choices = _.map(this.props.choices, function (choice, i) {
            return _.extend({}, choice, {
                correct: i === choiceIndex,
            });
        });
        this.props.onChange({choices: choices});
    };

    onContentChange: (arg1: number, arg2: string) => void = (
        choiceIndex,
        newContent,
    ) => {
        const choices = this.props.choices.slice();
        const choice = _.clone(choices[choiceIndex]);
        choice.content = newContent;
        choices[choiceIndex] = choice;
        this.props.onChange({choices: choices});
    };

    addChoice: () => void = () => {
        const choices = this.props.choices;
        const blankChoice = {content: "", correct: false} as const;
        this.props.onChange(
            {
                choices: choices.concat([blankChoice]),
            },
            this.focus.bind(this, choices.length),
        );
    };

    removeChoice: (arg1: number) => void = (choiceIndex) => {
        const choices = _(this.props.choices).clone();
        choices.splice(choiceIndex, 1);
        this.props.onChange({
            choices: choices,
        });
    };

    focus: (arg1: number) => boolean = (i) => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this.refs["editor" + i]).focus(); // eslint-disable-line react/no-string-refs
        return true;
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const dropdownGroupName = _.uniqueId("perseus_dropdown_");
        const editingDisabled = this.props.apiOptions.editingDisabled;
        return (
            <div className="perseus-widget-dropdown">
                <div className="dropdown-info">
                    <LabelLarge>Dropdown</LabelLarge>
                    <InfoTip>
                        <p>
                            The drop down is useful for making inequalities in a
                            custom format. We normally use the symbols {"<"},{" "}
                            {">"}, ≤, ≥ (in that order) which you can copy into
                            the choices. When possible, use the &quot;multiple
                            choice&quot; answer type instead.
                        </p>
                    </InfoTip>
                </div>
                <div className="dropdown-field">
                    <LabelMedium>
                        Visible label
                        <TextField
                            value={this.props.visibleLabel}
                            onChange={this.onVisibleLabelChange}
                        />
                    </LabelMedium>
                    <InfoTip>
                        <p>Optional visible label</p>
                    </InfoTip>
                </div>
                <div className="dropdown-field">
                    <LabelMedium>
                        Aria label
                        <TextField
                            value={this.props.ariaLabel}
                            onChange={this.onAriaLabelChange}
                            type={"text"}
                        />
                    </LabelMedium>
                    <InfoTip>
                        <p>
                            Label text that&apos;s read by screen readers.
                            Highly recommend adding a label here to ensure your
                            exercise is accessible. For more information on
                            writing accessible labels, please see{" "}
                            <a
                                href="https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels"
                                target="_blank"
                                rel="noreferrer"
                            >
                                this article.
                            </a>{" "}
                            If left blank, the value will default to
                            &quot;Select an answer&quot;.
                        </p>
                    </InfoTip>
                </div>
                <div className="dropdown-field">
                    <LabelMedium>
                        Placeholder
                        <TextField
                            value={this.props.placeholder}
                            onChange={this.onPlaceholderChange}
                            placeholder={"Placeholder value"}
                        />
                    </LabelMedium>
                    <InfoTip>
                        <p>
                            This value will appear as the drop down default. It
                            should give the user some indication of the values
                            available in the drop down itself, e.g.,
                            Yes/No/Maybe.
                        </p>
                    </InfoTip>
                </div>
                <div className="clearfix" />
                <LabelMedium>Choices</LabelMedium>
                <ul className="dropdown-choices">
                    {this.props.choices.map((choice, i) => {
                        const choiceBackgroundColor = choice.correct
                            ? semanticColor.core.background.success.subtle
                            : semanticColor.core.background.critical.subtle;

                        return (
                            <li key={"" + i}>
                                <div className="dropdown-choice">
                                    <input
                                        type="radio"
                                        ref={"radio" + i}
                                        name={dropdownGroupName}
                                        checked={choice.correct}
                                        onChange={() => this.onCorrectChange(i)}
                                    />

                                    <TextField
                                        value={choice.content}
                                        ref={"editor" + i}
                                        aria-label={`Choice ${i + 1} content`}
                                        disabled={editingDisabled}
                                        style={{
                                            backgroundColor:
                                                choiceBackgroundColor,
                                        }}
                                        onChange={(newContent) =>
                                            this.onContentChange(i, newContent)
                                        }
                                    />
                                    <IconButton
                                        icon={trashIcon}
                                        aria-label="Delete choice"
                                        disabled={editingDisabled}
                                        kind="tertiary"
                                        size="small"
                                        onClick={() => this.removeChoice(i)}
                                    />
                                </div>
                            </li>
                        );
                    }, this)}
                </ul>

                <div className="add-choice-container">
                    <Button
                        kind="secondary"
                        disabled={this.props.apiOptions?.editingDisabled}
                        onClick={this.addChoice}
                        startIcon={plusIcon}
                    >
                        Add a choice
                    </Button>
                </div>
            </div>
        );
    }
}

export default DropdownEditor;
