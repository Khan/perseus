/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, comma-dangle, indent, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* global i18n */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = require("underscore");
var React = require('react');
var classNames = require("classnames");

var ApiClassNames = require("../../perseus-api.jsx").ClassNames;

var ToggleableRadioButton = require("./toggleable-radio-button.jsx");


var Choice = React.createClass({
    propTypes: {
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
        clue: React.PropTypes.object,
        content: React.PropTypes.node,
        disabled: React.PropTypes.bool,
        groupName: React.PropTypes.string,
        showClue: React.PropTypes.bool,
        type: React.PropTypes.string,
        onChecked: React.PropTypes.func.isRequired,
        deselectEnabled: React.PropTypes.bool,
        // This indicates the position of the choice relative to others
        // (so that we can display a nice little (A), (B), etc. next to it)
        pos: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            checked: false,
            classSet: {},
            disabled: false,
            showClue: false,
            type: 'radio',
            pos: 0
        };
    },

    render: function() {
        // NOTE(jeresig): This is not i18n appropriate and should probably be
        // changed to a map of common options that are properly translated.
        var letter = String.fromCharCode(65 + this.props.pos);

        var a11yText = () => {
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

        var className = classNames(this.props.className, "checkbox-label");

        // There's two different input components we could use (the builtin
        // input component, or the ToggleableRadioButton component). These are
        // the props that we will pass to either.
        var commonInputProps = {
            type: this.props.type,
            name: this.props.groupName,
            checked: this.props.checked,
            disabled: this.props.disabled,
        };

        var input = null;
        if (this.props.type === "radio" && this.props.deselectEnabled) {
            // This is a special radio button that allows a user to deselect
            // it by merely clicking/selecting it again.
            input = (
                <ToggleableRadioButton
                    onChecked={this.props.onChecked}
                    {...commonInputProps} />);
        } else {
            input = (
                <input
                    onChange={(event) => {
                        this.props.onChecked(event.target.checked);
                    }}
                    {...commonInputProps} />);
        }

        return <label className={className}>
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
                            ApiClassNames.RADIO.OPTION_CONTENT + " " +
                            ApiClassNames.INTERACTIVE
                        }
                        style={{ cursor: "default" }}>
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
    }
});

module.exports = Choice;
