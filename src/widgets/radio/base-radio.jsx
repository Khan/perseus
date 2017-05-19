/* eslint-disable object-curly-spacing */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
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
    rationale: React.PropTypes.node,
    hasRationale: React.PropTypes.bool,
    showRationale: React.PropTypes.bool,
    correct: React.PropTypes.bool,
    originalIndex: React.PropTypes.number,
    isNoneOfTheAbove: React.PropTypes.bool,
}));

const radioBorderColor = styleConstants.radioBorderColor;
const checkedColor = styleConstants.checkedColor;

const BaseRadio = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.shape({
            readOnly: React.PropTypes.bool,
            satStyling: React.PropTypes.bool,
            isMobile: React.PropTypes.bool,
        }),
        choices: ChoicesType,
        deselectEnabled: React.PropTypes.bool,
        editMode: React.PropTypes.bool,
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
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

            responsiveRadioContainer: {
                borderBottom: `1px solid ${radioBorderColor}`,
                borderTop: `1px solid ${radioBorderColor}`,
                width: "auto",
                [mediaQueries.smOrSmaller]: {
                    marginLeft: styleConstants.negativePhoneMargin,
                    marginRight: styleConstants.negativePhoneMargin,
                },
            },

            responsiveMobileRadioContainer: {
                width: "auto",
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
                marginLeft: 20,
            },

            inlineItem: {
                display: "inline-block",
                paddingLeft: 20,
                verticalAlign: "middle",
                // See http://stackoverflow.com/q/8120466 for explanation of
                // why vertical align property is needed
            },

            responsiveItem: {
                marginLeft: 0,
                padding: 0,

                ":active": {
                    backgroundColor: styleConstants.grayLight,
                },

                ":not(:last-child)": {
                    borderBottom: `1px solid ${radioBorderColor}`,
                },
            },

            responsiveMobileItem: {
                backgroundColor: '#FFFFFF',

                border: `1px solid ${radioBorderColor}`,
                borderRadius: "4px",
                margin: 0,
                minHeight: 48,
                padding: 1,

                ":active": {
                    border: `2px solid ${radioBorderColor}`,
                    padding: 0,
                },

                ":not(:last-child)": {
                    marginBottom: "16px",
                },
            },

            responsiveSelected: {
                border: `2px solid ${checkedColor}`,
                padding: 0,
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
            editMode: false,
        };
    },

    getInitialState: function() {
        return {
            // TODO(mdr): This keeps the ID stable across re-renders on the
            //     same machine, but, at time of writing, the server's state
            //     isn't rehydrated to the client during SSR, so the server and
            //     client will generate different IDs and cause a mismatch
            //     during SSR :(
            radioGroupName: _.uniqueId("perseus_radio_"),
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

    deselectEnabled: function() {
        // We want to force enable deselect on mobile.
        return this.props.apiOptions.isMobile || this.props.deselectEnabled;
    },

    render: function() {
        const inputType = this.props.multipleSelect ? "checkbox" : "radio";
        const rubric = this.props.reviewModeRubric;

        const styles = BaseRadio.styles;
        const sat = this.props.apiOptions.satStyling;

        const isMobile = this.props.apiOptions.isMobile;

        const className = classNames(
            "perseus-widget-radio",
            !this.props.editMode && "perseus-rendered-radio",
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
                    ? styles.responsiveMobileRadioContainer
                    : styles.responsiveRadioContainer),
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
                    // True if we're in review mode and a rationale
                    // is available.
                    const reviewModeRationales =
                        !!rubric && choice.hasRationale;

                    let Element = Choice;
                    const elementProps = {
                        ref: `radio${i}`,
                        apiOptions: this.props.apiOptions,
                        checked: choice.checked,
                        reviewMode: !!rubric,
                        correct: !!rubric && rubric.choices[i].correct,
                        rationale: choice.rationale,
                        content: choice.content,
                        disabled: this.props.apiOptions.readOnly,
                        editMode: this.props.editMode,
                        groupName: this.state.radioGroupName,
                        isLastChoice: i === this.props.choices.length - 1,
                        showRationale: reviewModeRationales ||
                            choice.showRationale,
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
                        choice.checked && ApiClassNames.RADIO.SELECTED,
                        (rubric && rubric.choices[i].correct &&
                            ApiClassNames.CORRECT
                        ),
                        (rubric && !rubric.choices[i].correct &&
                            ApiClassNames.INCORRECT
                        )
                    );


                    // In edit mode, the Choice renders a Div in order to allow
                    // for the contentEditable area to be selected (label
                    // forces any clicks inside to select the input element)
                    // If its not a label, we must simulate that label behavior
                    // for items that are not the draft editor
                    let listElem = null;
                    let clickHandler = null;
                    if (this.props.editMode) {
                        clickHandler = (e) => {
                            // Traverse the parent nodes of the clicked element.
                            let elem = e.target;
                            while (elem && elem !== listElem) {
                                // If the clicked element is inside of the
                                // "content" part of the choice, it's probably
                                // inside of the editors or delete button, so
                                // bail out.
                                if (elem.classList.contains(
                                        ApiClassNames.RADIO.OPTION_CONTENT)) {
                                    return;
                                }
                                elem = elem.parentNode;
                            }

                            // Otherwise, it's outside of the editors, so
                            // select that option.
                            this.checkOption(i, !choice.checked);
                        };
                    }

                    // TODO(mattdr): Index isn't a *good* choice of key here;
                    // is there a better one? Can we use choice content
                    // somehow? Would changing our choice of key somehow break
                    // any voodoo happening inside a choice's child Renderers
                    // by changing when we mount/unmount?
                    return <li
                        key={i}
                        ref={e => listElem = e}
                        className={className}
                        onClick={clickHandler}
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
