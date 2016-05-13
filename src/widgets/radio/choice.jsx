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


const focusedStyleMixin = {
    backgroundColor: styleConstants.satSelectedBackgroundColor,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    outline: `2px solid ${styleConstants.satBlue}`,
    // Render the outline higher than the next element's border
    zIndex: 1,
};

const Choice = React.createClass({
    propTypes: {
        // TODO(kevinb) use Options.propTypes from perseus-api.jsx
        // This change will also require make sure that item-renderer.jsx and
        // server-item-renderer.jsx have appropriate defaults for apiOptions
        // because many of the properties on Options.propTypes are required.
        apiOptions: React.PropTypes.shape({
            responsiveStyling: React.PropTypes.bool,
            mobileStyling: React.PropTypes.bool,
            satStyling: React.PropTypes.bool,
        }),
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
        clue: React.PropTypes.node,
        content: React.PropTypes.node,
        correct: React.PropTypes.bool,
        deselectEnabled: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        groupName: React.PropTypes.string,
        isLastChoice: React.PropTypes.bool, // Needed for border styling
        onChecked: React.PropTypes.func.isRequired,
        // This indicates the position of the choice relative to others
        // (so that we can display a nice little (A), (B), etc. next to it)
        pos: React.PropTypes.number,
        reviewMode: React.PropTypes.bool,
        showClue: React.PropTypes.bool,
        type: React.PropTypes.string,
    },

    statics: {
        styles: StyleSheet.create({
            pos: {
                display: "none",
            },

            satDescription: {
                display: "block",
                position: "relative",
                borderTop: "1px solid #ccc",
                boxSizing: "border-box",
                cursor: "pionter",
                marginLeft: 0,
                padding: "17px 14px",
                "::after": {
                    bottom: -1,
                    content: `" "`,
                    height: 1,
                    left: 0,
                    position: "absolute",
                    width: "100%",
                    zIndex: 1,
                },
            },

            satDescriptionLastChoice: {
                borderBottom: "1px solid #ccc",
            },

            satDescriptionInputFocused: {
                ...focusedStyleMixin,
            },

            satDescriptionInputActive: {
                ...focusedStyleMixin,
                backgroundColor: styleConstants.satActiveBackgroundColor,
            },

            satDescriptionCorrect: {
                color: styleConstants.satCorrectColor,
                ":focus": {
                    borderColor: styleConstants.satCorrectColor,
                    outlineColor: styleConstants.satCorrectColor,
                },
            },

            satDescriptionCorrectChecked: {
                backgroundColor: styleConstants.satCorrectBackgroundColor,
                borderBottomColor: styleConstants.satCorrectBorderColor,
                borderTopColor: styleConstants.satCorrectBorderColor,
                ":after": {
                    backgroundColor: styleConstants.satCorrectBorderColor,
                },
            },

            satDescriptionIncorrectChecked: {
                color: styleConstants.satIncorrectColor,
                backgroundColor: styleConstants.satIncorrectBackgroundColor,
                borderBottomColor: styleConstants.satIncorrectBorderColor,
                borderTopColor: styleConstants.satIncorrectBorderColor,
                ":after": {
                    backgroundColor: styleConstants.satIncorrectBorderColor,
                },
                ":focus": {
                    borderColor: styleConstants.satIncorrectColor,
                    outlineColor: styleConstants.satIncorrectColor,
                },
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

            // TODO(david): Avoid using min-width -- we've been trying to use
            // max-width
            mobileInput: {
                [mediaQueries.mdOrLarger]: {
                    "-webkit-appearance": "none",
                    appearance: "none",
                    border: `2px solid ${styleConstants.gray}`,
                    borderRadius: 25,
                    width: 25,
                    marginLeft: 5,
                    float: "left",
                },
            },

            satReviewInput: {
                pointerEvents: "none",
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

            mobileRadioInput: {
                [mediaQueries.mdOrLarger]: {
                    height: 25,
                    outline: "none",
                    ":checked": {
                        background: styleConstants.blue,
                        border: `2px solid ${styleConstants.blue}`,
                    },
                },
            },

            mobileRadioOptionContent: {
                [mediaQueries.mdOrLarger]: {
                    marginLeft: 40,
                    display: "inline-block",
                },
            },

            satRadioOptionContent: {
                userSelect: 'text',
                display: "block",
                marginLeft: 45,
                // Overriding here, not sure why typically set
                // to "cursor: default" in js
                cursor: "inherit",
            },

            satReviewRadioOptionContent: {
                fontWeight: "bold",
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

            mobileCheckboxInput: {
                [mediaQueries.mdOrLarger]: {
                    position: "absolute",
                    outline: "none",
                    height: 25,
                    ":checked": {
                        borderColor: styleConstants.blue,
                    },
                    ":checked::before": {
                        font: `15pt "FontAwesome"`,
                        left: 0,
                        position: "relative",
                        top: 1,
                        color: styleConstants.blue,
                        content: `"\\f00c"`,
                    },
                },
            },

            mobileCheckboxOptionContent: {
                [mediaQueries.mdOrLarger]: {
                    position: "absolute",
                    marginRight: 26,
                    display: "block",
                    top: "50%",
                    margin: "-14px 0 0 0",
                    width: "auto",
                },
            },

            satCheckboxOptionContent: {
                position: "absolute",
                display: "block",
                top: "50%",
                margin: "-16px 0 0 0",
                width: "auto",
            },

            satPosBack: {
                display: "block",
                borderRadius: 25,
                border: `2px solid ${styleConstants.satBlue}`,
                content: `''`,
                height: 25,
                width: 25,
                position: "absolute",
                top: 1,
                left: 1,
            },

            satPosBackChecked: {
                background: styleConstants.satBlue,
            },

            satPosBackCorrect: {
                borderColor: styleConstants.satCorrectColor,
            },

            satPosBackCorrectChecked: {
                background: styleConstants.satCorrectColor,
            },

            satPosBackIncorrectChecked: {
                borderColor: styleConstants.satIncorrectColor,
                background: styleConstants.satIncorrectColor,
            },

            satPos: {
                display: "block",
                color: styleConstants.satBlue,
                fontFamily: styleConstants.boldFontFamily,
                fontSize: 13,
                textAlign: "center",
                position: "absolute",
                left: 0,
                top: 7,
                width: 32,
            },

            satPosChecked: {
                color: '#fff',
            },

            satPosCorrect: {
                color: styleConstants.satCorrectColor,
            },

            clue: {
                display: "block",
            },

            satReviewClue: {
                marginTop: 13,
                marginLeft: 45,
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

            satLabel: {
                cursor: "pointer",
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

    getInitialState: function() {
        return {
            isInputFocused: false,
            isInputActive: false,
        };
    },

    onInputFocus: function() {
        this.setState({isInputFocused: true});
    },

    onInputBlur: function() {
        this.setState({isInputFocused: false});
    },

    onInputMouseDown: function() {
        this.setState({isInputActive: true});
    },

    onInputMouseUp: function() {
        this.setState({isInputActive: false});
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
        const mobile = this.props.apiOptions.mobileStyling;
        const sat = this.props.apiOptions.satStyling;

        const className = classNames(
            this.props.className,
            "checkbox-label",
            css(
                styles.label,
                responsive && styles.responsiveLabel,
                sat && styles.satLabel
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
            onFocus: this.onInputFocus,
            onBlur: this.onInputBlur,
            className: css(
                sharedStyles.perseusInteractive,
                styles.input,
                responsive && styles.responsiveInput,
                responsive && this.props.type === "radio" &&
                    styles.responsiveRadioInput,
                responsive && this.props.type === "checkbox" &&
                    styles.responsiveCheckboxInput,
                mobile && styles.mobileInput,
                mobile && this.props.type === "radio" &&
                    styles.mobileRadioInput,
                mobile && this.props.type === "checkbox" &&
                    styles.mobileCheckboxInput,
                sat && this.props.type === "radio" &&
                    sharedStyles.perseusSrOnly,
                sat && this.props.type === "checkbox" &&
                    styles.satCheckboxInput,
                sat && this.props.reviewMode && styles.satReviewInput
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

        const {reviewMode, correct, checked, isLastChoice} = this.props;
        const descriptionClassName = classNames("description",
            css(sat && this.state.isInputFocused
                    && styles.satDescriptionInputFocused,
                sat && this.state.isInputActive
                    && styles.satDescriptionInputActive,
                sat && styles.satDescription,
                sat && reviewMode && correct && styles.satDescriptionCorrect,
                sat && reviewMode && correct && checked
                    && styles.satDescriptionCorrectChecked,
                sat && reviewMode && !correct && checked
                    && styles.satDescriptionIncorrectChecked,
                sat && isLastChoice && styles.satDescriptionLastChoice));

        const checkboxContentClassName = "checkbox " +
            css((mobile || sat) && sharedStyles.perseusInteractive,
                mobile && styles.mobileCheckboxOptionContent,
                sat && styles.satCheckboxOptionContent);

        const posBackClassName = "pos-back " +
            css(styles.pos, sat && styles.satPosBack,
                sat && (this.props.checked || this.state.isInputActive)
                    && styles.satPosBackChecked,
                sat && reviewMode && correct && styles.satPosBackCorrect,
                sat && reviewMode && correct && checked
                    && styles.satPosBackCorrectChecked,
                sat && reviewMode && !correct && checked
                    && styles.satPosBackIncorrectChecked);

        const posClassName = "pos " +
            css(styles.pos, sat && styles.satPos,
                sat && correct && styles.satPosCorrect,
                sat && (this.props.checked || this.state.isInputActive)
                    && styles.satPosChecked);

        return <label
            className={className}
            style={{opacity: fadeOutLabelWhenDisabled ? 0.5 : 1.0}}
        >
            {input}
            <div className={descriptionClassName}
                onMouseDown={this.onInputMouseDown}
                onMouseUp={this.onInputMouseUp}
                onMouseOut={this.onInputMouseUp}
            >
                <div className="checkbox-and-option">
                    <span className={checkboxContentClassName}>
                        <div className={posBackClassName}></div>
                        <div className={posClassName}>
                            <span className="perseus-sr-only">
                                {a11yText()}
                            </span>
                            <span aria-hidden="true">{letter}</span>
                        </div>
                    </span>
                    {/* A pseudo-label. <label> is slightly broken on iOS,
                        so this works around that. Unfortunately, it is
                        simplest to just work around that everywhere. */}
                    <span className={classNames(
                            ClassNames.RADIO.OPTION_CONTENT,
                            ClassNames.INTERACTIVE,
                            css(mobile && styles.mobileRadioOptionContent,
                                sat && styles.satRadioOptionContent,
                                sat && reviewMode
                                    && styles.satReviewRadioOptionContent)
                        )}
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
                            css(styles.clue,
                                reviewMode && styles.satReviewClue)
                        )}
                    >
                        {this.props.clue}
                    </div>}
            </div>
        </label>;
    },
});

module.exports = Choice;
