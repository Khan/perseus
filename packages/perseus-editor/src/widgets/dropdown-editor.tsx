/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {components, EditorJsonify, iconTrash} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {iconPlus} from "../styles/icon-paths";

const {InfoTip, InlineIcon} = components;

type Props = any;

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

    static defaultProps: Props = {
        placeholder: "",
        choices: [
            {
                content: "",
                correct: false,
            },
        ],
    };

    onPlaceholderChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        const placeholder = e.target.value;
        this.props.onChange({placeholder: placeholder});
    };

    onCorrectChange: (
        arg1: number,
        arg2: React.ChangeEvent<HTMLInputElement>,
    ) => void = (choiceIndex) => {
        const choices = _.map(this.props.choices, function (choice, i) {
            return _.extend({}, choice, {
                correct: i === choiceIndex,
            });
        });
        this.props.onChange({choices: choices});
    };

    onContentChange: (
        arg1: number,
        arg2: React.ChangeEvent<HTMLInputElement>,
    ) => void = (choiceIndex, e) => {
        const choices = this.props.choices.slice();
        const choice = _.clone(choices[choiceIndex]);
        choice.content = e.target.value;
        choices[choiceIndex] = choice;
        this.props.onChange({choices: choices});
    };

    addChoice: (arg1: React.MouseEvent) => void = (e) => {
        e.preventDefault();

        const choices = this.props.choices;
        const blankChoice = {content: "", correct: false} as const;
        this.props.onChange(
            {
                choices: choices.concat([blankChoice]),
            },
            this.focus.bind(this, choices.length),
        );
    };

    removeChoice: (arg1: number, arg2: React.MouseEvent) => void = (
        choiceIndex,
        e,
    ) => {
        e.preventDefault();
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
        return (
            <div className="perseus-widget-dropdown">
                <div className="dropdown-info">
                    Dropdown
                    <InfoTip>
                        <p>
                            The drop down is useful for making inequalities in a
                            custom format. We normally use the symbols {"<"},{" "}
                            {">"}, ≤, ≥ (in that order) which you can copy into
                            the choices. When possible, use the "multiple
                            choice" answer type instead.
                        </p>
                    </InfoTip>
                </div>
                <div className="dropdown-placeholder">
                    <input
                        type="text"
                        placeholder="Placeholder value"
                        value={this.props.placeholder}
                        onChange={this.onPlaceholderChange}
                    />
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
                <ul className="dropdown-choices">
                    {this.props.choices.map(function (choice, i) {
                        const checkedClass = choice.correct
                            ? "correct"
                            : "incorrect";

                        return (
                            <li key={"" + i}>
                                <div>
                                    <input
                                        ref={"radio" + i}
                                        type="radio"
                                        name={dropdownGroupName}
                                        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'boolean | undefined'.
                                        checked={
                                            choice.correct ? "checked" : ""
                                        }
                                        // eslint-disable-next-line react/jsx-no-bind
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        onChange={this.onCorrectChange.bind(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                            this,
                                            i,
                                        )}
                                        value={i}
                                    />
                                    <input
                                        type="text"
                                        ref={"editor" + i}
                                        // eslint-disable-next-line react/jsx-no-bind
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        onChange={this.onContentChange.bind(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                            this,
                                            i,
                                        )}
                                        className={checkedClass}
                                        value={choice.content}
                                    />
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        href="#"
                                        className="simple-button orange"
                                        aria-label="Delete choice"
                                        // eslint-disable-next-line react/jsx-no-bind
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        onClick={this.removeChoice.bind(
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                            this,
                                            i,
                                        )}
                                    >
                                        <span className="remove-choice">
                                            <InlineIcon {...iconTrash} />
                                        </span>
                                    </a>
                                </div>
                            </li>
                        );
                    }, this)}
                </ul>

                <div className="add-choice-container">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        href="#"
                        className="simple-button orange"
                        onClick={this.addChoice}
                    >
                        <InlineIcon {...iconPlus} /> Add a choice{" "}
                    </a>
                </div>
            </div>
        );
    }
}

export default DropdownEditor;
