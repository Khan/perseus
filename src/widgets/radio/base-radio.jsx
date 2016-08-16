/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* global i18n */

const { StyleSheet, css } = require("aphrodite");
const classNames = require("classnames");
const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");

const ApiClassNames = require("../../perseus-api.jsx").ClassNames;
const Renderer = require("../../renderer.jsx");
const sharedStyles = require("../../styles/shared.js");
const styleConstants = require("../../styles/constants.js");
const mediaQueries = require("../../styles/media-queries.js");


const captureScratchpadTouchStart =
        require("../../util.js").captureScratchpadTouchStart;


const Choice = require("./choice.jsx");

const ChoiceNoneAbove = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        content: React.PropTypes.node,
        showContent: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            showContent: true,
        };
    },

    render: function() {
        const choiceProps = _.extend({}, this.props, {
            className: classNames(this.props.className, "none-of-above"),
            content: (this.props.showContent ?
                this.props.content :
                // We use a Renderer here because that is how
                // `this.props.content` is wrapped otherwise.
                // We pass in a key here so that we avoid a semi-spurious
                // react warning when we render this in the same place
                // as the previous choice content renderer.
                // Note this destroys state, but since all we're doing
                // is outputting "None of the above", that is okay.
                <Renderer
                    key="noneOfTheAboveRenderer"
                    content={i18n._("None of the above")}
                />
            ),
        });

        return <Choice {...choiceProps} />;
    },
});

const ChoicesType = React.PropTypes.arrayOf(React.PropTypes.shape({
    checked: React.PropTypes.bool,
    content: React.PropTypes.node,
    clue: React.PropTypes.node,
    correct: React.PropTypes.bool,
    originalIndex: React.PropTypes.number,
    isNoneOfTheAbove: React.PropTypes.bool,
}));

const radioBorderColor = styleConstants.radioBorderColor;
const checkedColor = styleConstants.checkedColor;

// Since the selected item border is 1 pixel bigger than non-selected, reduce
// the padding so that the content doesn't appear to move when
// pressed/selected.
const responsiveItemPaddingStyle = `1px 16px`;
const responsiveItemPaddingStyleActive = `0px 15px`;

const BaseRadio = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.shape({
            readOnly: React.PropTypes.bool,
            satStyling: React.PropTypes.bool,
            isMobile: React.PropTypes.bool,
        }),
        choices: ChoicesType,
        deselectEnabled: React.PropTypes.bool,
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
        // NOTE(david): DEPRECATED - this is going away. We force one per line
        //     on XOM and may release this more broadly.
        onePerLine: React.PropTypes.bool,
        reviewModeRubric: React.PropTypes.shape({
            choices: ChoicesType,
        }),
    },

    statics: {
        styles: StyleSheet.create({
            instructions: {
                display: "block",
                color: styleConstants.gray17,
                fontStyle: "normal",
                fontWeight: "bold",
                margin: "8px 0",
            },

            radio: {
                // Avoid centering
                width: "100%",
            },

            responsiveRadio: {
                [mediaQueries.lgOrSmaller]: {
                    borderBottom: `1px solid ${radioBorderColor}`,
                    borderTop: `1px solid ${radioBorderColor}`,
                    width: "auto",
                },
                [mediaQueries.smOrSmaller]: {
                    marginLeft: styleConstants.negativePhoneMargin,
                    marginRight: styleConstants.negativePhoneMargin,
                },
            },

            responsiveMobileRadio: {
                [mediaQueries.lgOrSmaller]: {
                    width: "auto",
                },
            },

            satRadio: {
                background: "none",
                marginLeft: 0,
                userSelect: "none",
            },

            satRadioOption: {
                margin: 0,
                padding: 0,
            },

            satReviewRadioOption: {
                pointerEvents: "none",
            },

            item: {
                padding: "7px 0",
                marginLeft: 20,
            },

            inlineItem: {
                display: "inline-block",
                paddingLeft: 20,
                verticalAlign: "top",
                // See http://stackoverflow.com/q/8120466 for explanation of
                // why vertical align property is needed
            },

            responsiveItem: {
                [mediaQueries.lgOrSmaller]: {
                    marginLeft: 0,
                    padding: 0,

                    ":active": {
                        backgroundColor: styleConstants.grayLight,
                    },

                    ":not(:last-child)": {
                        borderBottom: `1px solid ${radioBorderColor}`,
                    },
                },
            },

            responsiveMobileItem: {
                backgroundColor: '#FFFFFF',

                [mediaQueries.lgOrSmaller]: {
                    border: `1px solid ${radioBorderColor}`,
                    borderRadius: "4px",
                    margin: 0,
                    minHeight: 48,
                    padding: responsiveItemPaddingStyle,

                    ":active": {
                        border: `2px solid ${radioBorderColor}`,
                        padding: responsiveItemPaddingStyleActive,
                    },

                    ":not(:last-child)": {
                        marginBottom: "16px",
                    },
                },
            },

            responsiveSelected: {
                [mediaQueries.lgOrSmaller]: {
                    border: `2px solid ${checkedColor}`,
                    padding: responsiveItemPaddingStyleActive,
                },
            },

            responsiveContainer: {
                overflow: "auto",
                marginLeft: styleConstants.negativePhoneMargin,
                marginRight: styleConstants.negativePhoneMargin,
                paddingLeft: styleConstants.phoneMargin,
                // paddingRight is handled by responsiveFieldset
            },

            responsiveFieldset: {
                paddingRight: styleConstants.phoneMargin,
            },
        }),
    },

    getDefaultProps: function() {
        return {
            onePerLine: true,
        };
    },

    checkOption: function(radioIndex, shouldBeChecked) {
        let newChecked;
        if (this.props.multipleSelect) {
            // When multipleSelect is on, clicking an index toggles the
            // selection of just that index.
            newChecked = _.map(this.props.choices, (choice, i) => {
                return (i === radioIndex) ? shouldBeChecked : choice.checked;
            });
        } else {
            // When multipleSelect is turned off we always unselect everything
            // that wasn't clicked.
            newChecked = _.map(this.props.choices, (choice, i) => {
                return i === radioIndex && shouldBeChecked;
            });
        }

        // We send just the array of [true/false] checked values here;
        // onCheckedChange reconstructs the new choices to send to
        // this.props.onChange
        this.props.onCheckedChange(newChecked);
    },

    focus: function(i) {
        ReactDOM.findDOMNode(this.refs["radio" + (i || 0)]).focus();
        return true;
    },

    getInstructionsText: function() {
        if (this.props.apiOptions.isMobile) {
            return this.props.multipleSelect ?
                i18n._("Choose all answers that apply.") :
                i18n._("Choose 1 answer.");
        } else {
            return this.props.multipleSelect ?
                i18n._("Select all that apply.") :
                i18n._("Please choose from one of the following options.");
        }
    },

    showOnePerLine: function() {
        // We want to force one-per-line layout on mobile.
        return this.props.apiOptions.isMobile || this.props.onePerLine;
    },

    deselectEnabled: function() {
        // We want to force enable deselect on mobile.
        return this.props.apiOptions.isMobile || this.props.deselectEnabled;
    },

    render: function() {
        // TODO(aria): Stop this from mutating the id every time someone
        // clicks on a radio :(
        const radioGroupName = _.uniqueId("perseus_radio_");
        const inputType = this.props.multipleSelect ? "checkbox" : "radio";
        const rubric = this.props.reviewModeRubric;

        const styles = BaseRadio.styles;
        const sat = this.props.apiOptions.satStyling;

        const isMobile = this.props.apiOptions.isMobile;

        const className = classNames(
            "perseus-widget-radio",
            css(
                sharedStyles.aboveScratchpad,
                // With the responsive mobile styles, the individual items are
                // spaced out vertically, and so we set the backgrounds on the
                // items rather than the container.
                !isMobile && sharedStyles.blankBackground,
                styles.radio,
                // SAT doesn't use the "responsive styling" as it conflicts
                // with their custom theming.
                !sat && (isMobile
                    ? styles.responsiveMobileRadio
                    : styles.responsiveRadio),
                sat && styles.satRadio
            )
        );

        const instructionsClassName = 'instructions ' +
            css(styles.instructions, sharedStyles.responsiveLabel);
        const instructions = this.getInstructionsText();
        const shouldShowInstructions = isMobile || this.props.multipleSelect;

        const responsiveClassName = css(styles.responsiveFieldset);
        const fieldset = <fieldset
            className={`perseus-widget-radio-fieldset ${responsiveClassName}`}
        >
            <legend className="perseus-sr-only">
                {instructions}
            </legend>
            {shouldShowInstructions &&
                <div className={instructionsClassName}>
                    {instructions}
                </div>}
            <ul className={className}>
                {this.props.choices.map(function(choice, i) {
                    // True if we're in review mode and a clue (aka rationale)
                    // is available. These are only used for SAT questions,
                    // though there was historically an inconclusive AB test
                    // that showed clues for other exercises.
                    // (See content/targeted_clues_exercises.py for more)
                    // TODO(marcia): Aria recommends bringing this logic up a
                    // level, as with this.props.questionCompleted.
                    const reviewModeClues = !!(rubric &&
                                               rubric.choices[i].clue);

                    let Element = Choice;
                    const elementProps = {
                        ref: `radio${i}`,
                        apiOptions: this.props.apiOptions,
                        checked: choice.checked,
                        reviewMode: !!rubric,
                        correct: (rubric && rubric.choices[i].correct),
                        clue: choice.clue,
                        content: choice.content,
                        disabled: this.props.apiOptions.readOnly,
                        groupName: radioGroupName,
                        isLastChoice: i === this.props.choices.length - 1,
                        showClue: reviewModeClues,
                        type: inputType,
                        pos: i,
                        deselectEnabled: this.deselectEnabled(),
                        onChecked: (checked) => {
                            this.checkOption(i, checked);
                        },
                    };

                    if (choice.isNoneOfTheAbove) {
                        Element = ChoiceNoneAbove;
                        _.extend(elementProps, {showContent: choice.correct});
                    }

                    const aphroditeClassName = (checked, isMobile) => {
                        return css(
                            styles.item,
                            !this.showOnePerLine() && styles.inlineItem,
                            // SAT doesn't use the "responsive styling" as it
                            // conflicts with their theming.
                            !sat && (isMobile
                                ? styles.responsiveMobileItem
                                : styles.responsiveItem),
                            checked && isMobile &&
                                styles.responsiveSelected,
                            sat && styles.satRadioOption,
                            sat && checked && styles.satRadioSelected,
                            sat && rubric && styles.satReviewRadioOption
                        );
                    };

                    // HACK(abdulrahman): Preloads the selection-state
                    // css because of a bug that causes iOS to lag
                    // when selecting the button for the first time.
                    aphroditeClassName(true, isMobile);

                    const className = classNames(
                        aphroditeClassName(choice.checked, isMobile),
                        // TODO(aria): Make test case for these API classNames
                        ApiClassNames.RADIO.OPTION,
                        !this.showOnePerLine() && "inline",
                        choice.checked && ApiClassNames.RADIO.SELECTED,
                        (rubric && rubric.choices[i].correct &&
                            ApiClassNames.CORRECT
                        ),
                        (rubric && !rubric.choices[i].correct &&
                            ApiClassNames.INCORRECT
                        )
                    );

                    // TODO(mattdr): Index isn't a *good* choice of key here;
                    // is there a better one? Can we use choice content
                    // somehow? Would changing our choice of key somehow break
                    // any voodoo happening inside a choice's child Renderers
                    // by changing when we mount/unmount?
                    return <li className={className} key={i}
                        onTouchStart={!this.props.labelWrap ?
                            null : captureScratchpadTouchStart
                        }
                    >
                        <Element {...elementProps} />
                    </li>;
                }, this)}
            </ul>
        </fieldset>;

        // Allow for horizontal scrolling if content is too wide, which may be
        // an issue especially on phones.
        // This is disabled in SAT, since it conflicts with their theming.
        return <div
            className={css(!sat && styles.responsiveContainer)}
        >
            {fieldset}
        </div>;
    },
});

module.exports = BaseRadio;
