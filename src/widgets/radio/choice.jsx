/* global i18n */

const { StyleSheet, css } = require("aphrodite");
const _ = require("underscore");
const React = require('react');
const classNames = require("classnames");

const { ClassNames } = require("../../perseus-api.jsx");
const sharedStyles = require("../../styles/shared.js");
const styleConstants = require("../../styles/constants.js");
const mediaQueries = require("../../styles/media-queries.js");

const ToggleableRadioButton = require("./toggleable-radio-button.jsx");


const circleSize = 20;
const radioBorder = styleConstants.grayLighter;
const checkedColor = styleConstants.kaGreen;


const Choice = React.createClass({
    propTypes: {
        // TODO(kevinb) use Options.propTypes from perseus-api.jsx
        // This change will also require make sure that item-renderer.jsx and
        // server-item-renderer.jsx have appropriate defaults for apiOptions
        // because many of the properties on Options.propTypes are required.
        apiOptions: React.PropTypes.shape({
            responsiveStyling: React.PropTypes.bool,
        }),
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

    statics: {
        styles: StyleSheet.create({
            pos: {
                display: "none",
            },

            input: {
                display: "inline-block",
                width: 20,
                margin: 3,
                marginLeft: -20,
                marginRight: 0,
                float: "none",
            },

            responsiveInput: {
                [mediaQueries.smOrSmaller]: {
                    WebkitAppearance: "none",
                    appearance: "none",

                    backgroundColor: "#fff",
                    border: "2px solid #fff",
                    boxShadow: `0 0px 0px 1px ${radioBorder}`,
                    outline: "none",

                    boxSizing: "border-box",
                    flexShrink: 0,
                    marginBottom: 0,
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 0,

                    height: circleSize,
                    width: circleSize,
                },
            },

            responsiveRadioInput: {
                [mediaQueries.smOrSmaller]: {
                    borderRadius: "50%",

                    ":checked": {
                        backgroundColor: checkedColor,
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        boxShadow: `0 0px 0px 2px ${checkedColor}`,

                        height: circleSize,
                        width: circleSize,
                    },
                },
            },

            responsiveCheckboxInput: {
                [mediaQueries.smOrSmaller]: {
                    border: "none",
                    borderRadius: 4,

                    ":checked": {
                        backgroundColor: checkedColor,
                        boxShadow: "none",
                    },

                    // TODO(emily): Make aphrodite allow nested styles here so
                    // this isn't as hacky.
                    ":checked::before": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        // TODO(jared): replace with image
                        content: '"✓"',
                        color: "white",
                        fontFamily: "monospace",
                        fontSize: 17,

                        height: circleSize,
                        width: circleSize,
                    },
                },
            },

            clue: {
                display: "block",
            },

            label: {
                display: "block",
            },

            responsiveLabel: {
                [mediaQueries.smOrSmaller]: {
                    WebkitTapHighlightColor: "transparent",
                    alignItems: "center",
                    display: "flex",
                    padding: "17px 0",
                },
            },
        }),
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

        const styles = Choice.styles;
        const responsive = this.props.apiOptions.responsiveStyling;

        const className = classNames(
            this.props.className,
            "checkbox-label",
            css(
                styles.label,
                responsive && styles.responsiveLabel
            )
        );

        // There's two different input components we could use (the builtin
        // input component, or the ToggleableRadioButton component). These are
        // the props that we will pass to either.
        const commonInputProps = {
            type: this.props.type,
            name: this.props.groupName,
            checked: this.props.checked,
            disabled: this.props.disabled,
            className: css(
                sharedStyles.perseusInteractive,
                styles.input,
                responsive && styles.responsiveInput,
                responsive && this.props.type === "radio" &&
                    styles.responsiveRadioInput,
                responsive && this.props.type === "checkbox" &&
                    styles.responsiveCheckboxInput
            ),
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
                        <div className={"pos-back " + css(styles.pos)}></div>
                        <div className={"pos " + css(styles.pos)}>
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
                    <div
                        className={classNames(
                            "perseus-radio-clue",
                            css(styles.clue)
                        )}
                    >
                        {this.props.clue}
                    </div>}
            </div>
        </label>;
    },
});

module.exports = Choice;
