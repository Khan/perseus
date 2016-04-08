/* global i18n */

const _ = require("underscore");
const React = require('react');
const classNames = require("classnames");

const { ClassNames, Options } = require("../../perseus-api.jsx");

const ToggleableRadioButton = require("./toggleable-radio-button.jsx");


const Choice = React.createClass({
    propTypes: {
        apiOptions: Options.propTypes,
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
        clue: React.PropTypes.node,
        content: React.PropTypes.node,
        correct: React.PropTypes.bool,
        deselectEnabled: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        groupName: React.PropTypes.string,
        onChecked: React.PropTypes.func.isRequired,
        // This indicates the position of the choice relative to others
        // (so that we can display a nice little (A), (B), etc. next to it)
        pos: React.PropTypes.number,
        showClue: React.PropTypes.bool,
        type: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            checked: false,
            classSet: {},
            disabled: false,
            showClue: false,
            type: 'radio',
            pos: 0,
        };
    },

    render: function() {
        // NOTE(jeresig): This is not i18n appropriate and should probably be
        // changed to a map of common options that are properly translated.
        const letter = String.fromCharCode(65 + this.props.pos);

        const a11yText = () => {
            // If the option was checked we need to reveal more context about
            // what the result was (correct/incorrect)
            if (this.props.checked) {
                if (typeof this.props.correct === "boolean") {
                    if (this.props.correct) {
                        return i18n._("(Choice %(letter)s, Checked, Correct)",
                            {letter: letter});
                    } else {
                        return i18n._("(Choice %(letter)s, Checked, Incorrect)",
                            {letter: letter});
                    }
                }

                return i18n._("(Choice %(letter)s, Checked)", {letter: letter});

            // If the option wasn't checked, but was correct, we need to tell
            // the user that this was, in fact, the correct answer.
            } else if (this.props.correct) {
                return i18n._("(Choice %(letter)s, Correct Answer)",
                    {letter: letter});
            }

            return i18n._("(Choice %(letter)s)", {letter: letter});
        };

        const className = classNames(this.props.className, "checkbox-label");

        // There's two different input components we could use (the builtin
        // input component, or the ToggleableRadioButton component). These are
        // the props that we will pass to either.
        const commonInputProps = {
            type: this.props.type,
            name: this.props.groupName,
            checked: this.props.checked,
            disabled: this.props.disabled,
        };

        let input = null;
        if (this.props.type === "radio" && this.props.deselectEnabled) {
            // This is a special radio button that allows a user to deselect
            // it by merely clicking/selecting it again.
            input = (
                <ToggleableRadioButton
                    onChecked={this.props.onChecked}
                    {...commonInputProps}
                />
            );
        } else {
            input = (
                <input
                    onChange={(event) => {
                        this.props.onChecked(event.target.checked);
                    }}
                    {...commonInputProps}
                />
            );
        }

        const fadeOutLabelWhenDisabled =
            this.props.disabled && this.props.apiOptions.responsiveStyling;

        return <label
            className={className}
            style={{opacity: fadeOutLabelWhenDisabled ? 0.5 : 1.0}}
        >
            {input}
            <div className="description">
                <div className="checkbox-and-option">
                    <span className="checkbox">
                        <div className="pos-back"></div>
                        <div className="pos">
                            <span className="perseus-sr-only">
                                {a11yText()}
                            </span>
                            <span aria-hidden="true">{letter}</span>
                        </div>
                    </span>
                    {/* A pseudo-label. <label> is slightly broken on iOS,
                        so this works around that. Unfortunately, it is
                        simplest to just work around that everywhere. */}
                    <span className={
                            ClassNames.RADIO.OPTION_CONTENT + " " +
                            ClassNames.INTERACTIVE
                        }
                        style={{ cursor: "default" }}
                    >
                        <div>
                            {this.props.content}
                        </div>
                    </span>
                </div>
                {this.props.showClue &&
                    <div className="perseus-radio-clue">
                        {this.props.clue}
                    </div>}
            </div>
        </label>;
    },
});

module.exports = Choice;
