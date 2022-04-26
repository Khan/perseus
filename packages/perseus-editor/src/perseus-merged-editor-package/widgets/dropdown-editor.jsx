/* eslint-disable static-service/require-fixture */
// @flow
import {components, icons, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

const {InfoTip, InlineIcon} = components;
const {iconPlus, iconTrash} = icons;

type Props = $FlowFixMe;

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

    static widgetName: string = "dropdown";

    static defaultProps: Props = {
        placeholder: "",
        choices: [
            {
                content: "",
                correct: false,
            },
        ],
    };

    onPlaceholderChange: (SyntheticInputEvent<>) => void = (e) => {
        const placeholder = e.target.value;
        this.props.onChange({placeholder: placeholder});
    };

    onCorrectChange: (number, SyntheticInputEvent<>) => void = (
        choiceIndex,
    ) => {
        const choices = _.map(this.props.choices, function (choice, i) {
            return _.extend({}, choice, {
                correct: i === choiceIndex,
            });
        });
        this.props.onChange({choices: choices});
    };

    onContentChange: (number, SyntheticInputEvent<>) => void = (
        choiceIndex,
        e,
    ) => {
        const choices = this.props.choices.slice();
        const choice = _.clone(choices[choiceIndex]);
        choice.content = e.target.value;
        choices[choiceIndex] = choice;
        this.props.onChange({choices: choices});
    };

    addChoice: (SyntheticMouseEvent<>) => void = (e) => {
        e.preventDefault();

        const choices = this.props.choices;
        const blankChoice = {content: "", correct: false};
        this.props.onChange(
            {
                choices: choices.concat([blankChoice]),
            },
            this.focus.bind(this, choices.length),
        );
    };

    removeChoice: (number, SyntheticMouseEvent<>) => void = (
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

    focus: (number) => boolean = (i) => {
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        ReactDOM.findDOMNode(this.refs["editor" + i]).focus(); // eslint-disable-line react/no-string-refs
        return true;
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.Node {
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
                                        checked={
                                            choice.correct ? "checked" : ""
                                        }
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onChange={this.onCorrectChange.bind(
                                            this,
                                            i,
                                        )}
                                        value={i}
                                    />
                                    <input
                                        type="text"
                                        ref={"editor" + i}
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onChange={this.onContentChange.bind(
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
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick={this.removeChoice.bind(
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
