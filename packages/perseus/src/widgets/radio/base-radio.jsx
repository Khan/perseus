// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {ClassNames as ApiClassNames} from "../../perseus-api.jsx";
import * as styleConstants from "../../styles/constants.js";
import mediaQueries from "../../styles/media-queries.js";
import sharedStyles from "../../styles/shared.js";
import Util from "../../util.js";
import {scrollElementIntoView} from "../../util/scroll-utils.js";

import ChoiceNoneAbove from "./choice-none-above.jsx";
import Choice from "./choice.jsx";

import type {StyleDeclaration} from "aphrodite";
import type {APIOptions} from "../../types.js";

const {captureScratchpadTouchStart} = Util;

type ChoiceType = {|
    checked: boolean,
    crossedOut: boolean,
    content: React.Node,
    rationale: React.Node,
    hasRationale: boolean,
    showRationale: boolean,
    showCorrectness: boolean,
    correct: boolean,
    originalIndex: number,
    isNoneOfTheAbove: boolean,
    highlighted: boolean,
    previouslyAnswered: boolean,
    revealNoneOfTheAbove: boolean,
    disabled: boolean,
|};

type ReviewModeRubric = {|
    choices: ChoiceType[],
|};

type Props = {|
    apiOptions: APIOptions,
    choices: ChoiceType[],
    deselectEnabled: boolean,
    editMode: boolean,
    labelWrap: boolean,
    countChoices: boolean,
    numCorrect: number,
    multipleSelect: boolean,
    reviewModeRubric: ReviewModeRubric,

    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains
    // an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    onChange: (newValues: {checked: boolean[], crossedOut: boolean[]}) => void,

    // Whether this widget was the most recently used widget in this
    // Renderer. Determines whether we'll auto-scroll the page upon
    // entering review mode.
    isLastUsedWidget: boolean,
|};

const radioBorderColor = styleConstants.radioBorderColor;

class BaseRadio extends React.Component<Props> {
    choiceRefs: Array<{current: ?HTMLButtonElement}>;

    static styles: StyleDeclaration = StyleSheet.create({
        // eslint-disable-next-line react-native/no-unused-styles
        instructions: {
            display: "block",
            color: styleConstants.gray17,
            fontSize: 14,
            lineHeight: 1.25,
            fontStyle: "normal",
            fontWeight: "bold",
            marginBottom: 16,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        instructionsMobile: {
            fontSize: 18,
            [mediaQueries.smOrSmaller]: {
                fontSize: 16,
            },
            // TODO(emily): We want this to match choice text, which turns
            // to 20px at min-width 1200px, but this media query is
            // min-width 1280px because our media queries don't exactly
            // match pure. Make those match up.
            [mediaQueries.xl]: {
                fontSize: 20,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        radio: {
            // Avoid centering
            width: "100%",
        },

        // eslint-disable-next-line react-native/no-unused-styles
        responsiveRadioContainer: {
            borderBottom: `1px solid ${radioBorderColor}`,
            borderTop: `1px solid ${radioBorderColor}`,
            width: "auto",
            [mediaQueries.smOrSmaller]: {
                marginLeft: styleConstants.negativePhoneMargin,
                marginRight: styleConstants.negativePhoneMargin,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        radioContainerFirstHighlighted: {
            borderTop: `1px solid rgba(0, 0, 0, 0)`,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        radioContainerLastHighlighted: {
            borderBottom: `1px solid rgba(0, 0, 0, 0)`,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satRadio: {
            background: "none",
            marginLeft: 0,
            userSelect: "none",
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satRadioOption: {
            margin: 0,
            padding: 0,
            borderBottom: `1px solid #ccc`,
            ":first-child": {
                borderTop: `1px solid #ccc`,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satRadioOptionCorrect: {
            borderBottomColor: styleConstants.satCorrectBorderColor,
            ":first-child": {
                borderTopColor: styleConstants.satCorrectBorderColor,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satRadioOptionIncorrect: {
            borderBottomColor: styleConstants.satIncorrectBorderColor,
            ":first-child": {
                borderTopColor: styleConstants.satIncorrectBorderColor,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satRadioOptionNextCorrect: {
            borderBottomColor: styleConstants.satCorrectBorderColor,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satRadioOptionNextIncorrect: {
            borderBottomColor: styleConstants.satIncorrectBorderColor,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        satReviewRadioOption: {
            pointerEvents: "none",
        },

        // eslint-disable-next-line react-native/no-unused-styles
        item: {
            marginLeft: 20,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        inlineItem: {
            display: "inline-block",
            paddingLeft: 20,
            verticalAlign: "middle",
            // See http://stackoverflow.com/q/8120466 for explanation of
            // why vertical align property is needed
        },

        // eslint-disable-next-line react-native/no-unused-styles
        responsiveItem: {
            marginLeft: 0,
            padding: 0,

            ":not(:last-child)": {
                borderBottom: `1px solid ${radioBorderColor}`,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        selectedItem: {
            background: "white",
        },

        // eslint-disable-next-line react-native/no-unused-styles
        aboveBackdrop: {
            position: "relative",
            // HACK(emily): We want selected choices to show up above our
            // exercise backdrop, but below the exercise footer and
            // "feedback popover" that shows up. This z-index is carefully
            // coordinated between here and webapp. :(
            zIndex: 1062,
        },

        // eslint-disable-next-line react-native/no-unused-styles
        aboveBackdropMobile: {
            boxShadow:
                "0 0 4px 0 rgba(0, 0, 0, 0.2)," +
                "0 0 2px 0 rgba(0, 0, 0, 0.1)",

            ":not(:last-child)": {
                borderBottom: `1px solid rgba(0, 0, 0, 0)`,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        nextHighlighted: {
            ":not(:last-child)": {
                borderBottom: `1px solid rgba(0, 0, 0, 0)`,
            },
        },

        // eslint-disable-next-line react-native/no-unused-styles
        responsiveContainer: {
            overflow: "auto",
            marginLeft: styleConstants.negativePhoneMargin,
            marginRight: styleConstants.negativePhoneMargin,
            paddingLeft: styleConstants.phoneMargin,
            // paddingRight is handled by responsiveFieldset
        },

        // eslint-disable-next-line react-native/no-unused-styles
        responsiveFieldset: {
            paddingRight: styleConstants.phoneMargin,
        },
    });

    static defaultProps: $FlowFixMe = {
        editMode: false,
    };

    constructor() {
        super();
        this.choiceRefs = [];
    }

    componentDidUpdate(prevProps: Props) {
        const {apiOptions, choices, isLastUsedWidget, reviewModeRubric} =
            this.props;

        // Switching into review mode can sometimes cause the selected answer
        // to scroll out of view - for example, when we reveal all those tall
        // rationales. This can be disorienting for the user.
        //
        // So, if this widget just switched into review mode, ensure that the
        // checked choice (or first checked choice, if there are multiple) is
        // scrolled into view.
        //
        // This only happens if the `canScrollPage` API option is set (so that
        // call sites aren't surprised by scrolling), and if this widget was
        // the most recently used widget (because, if the user has since
        // touched something else, they're probably not trying to keep their
        // eye on this widget anymore).
        if (
            apiOptions.canScrollPage &&
            isLastUsedWidget &&
            reviewModeRubric &&
            !prevProps.reviewModeRubric
        ) {
            const checkedIndex = choices.findIndex((c) => c.checked);
            if (checkedIndex >= 0) {
                const ref = this.choiceRefs[checkedIndex];
                // note(matthew): we know this is only getting passed
                // to a WB Clickable button, so we force it to be of
                // type HTMLButtonElement
                const anyNode = (ReactDOM.findDOMNode(ref.current): any);
                const buttonNode = (anyNode: ?HTMLButtonElement);
                if (buttonNode) {
                    scrollElementIntoView(buttonNode);
                }
            }
        }
    }

    // When a particular choice's `onChange` handler is called, indicating a
    // change in a single choice's values, we need to call our `onChange`
    // handler in order to notify our parent. However, our API with our parent
    // is that we always provide *all* values for *all* choices, even if just
    // one choice's values changed. (This is because sometimes an interaction
    // with one choice can affect many choices, like how checking a new answer
    // will usually cause the old answer to become unchecked.)
    //
    // So, given the new values for a particular choice, compute the new values
    // for all choices, and pass them to `this.props.onChange`.
    //
    // `newValues` is an object with two keys: `checked` and `crossedOut`. Each
    // contains a boolean value specifying the new checked and crossed-out
    // value of this choice.
    updateChoice: (
        number,
        newValues: {checked: boolean, crossedOut: boolean},
    ) => void = (choiceIndex, newValues) => {
        // Get the baseline `checked` values. If we're checking a new answer
        // and multiple-select is not on, we should clear all choices to be
        // unchecked. Otherwise, we should copy the old checked values.
        let newCheckedList;
        if (newValues.checked && !this.props.multipleSelect) {
            newCheckedList = this.props.choices.map((_) => false);
        } else {
            newCheckedList = this.props.choices.map((c) => c.checked);
        }

        // Get the baseline `crossedOut` values.
        const newCrossedOutList = this.props.choices.map((c) => c.crossedOut);

        // Update this choice's `checked` and `crossedOut` values.
        newCheckedList[choiceIndex] = newValues.checked;
        newCrossedOutList[choiceIndex] = newValues.crossedOut;

        this.props.onChange({
            checked: newCheckedList,
            crossedOut: newCrossedOutList,
        });
    };

    focus: (number) => boolean = (i) => {
        const ref = this.choiceRefs[i || 0];
        // note(matthew): we know this is only getting passed
        // to a WB Clickable button, so we force it to be of
        // type HTMLButtonElement
        const anyNode = (ReactDOM.findDOMNode(ref.current): any);
        const buttonNode = (anyNode: ?HTMLButtonElement);

        if (buttonNode) {
            buttonNode.focus();
        } else {
            return false;
        }
        return true;
    };

    getInstructionsText: () => string = () => {
        if (this.props.multipleSelect) {
            if (this.props.countChoices) {
                return i18n._("Choose %(numCorrect)s answers:", {
                    numCorrect: this.props.numCorrect,
                });
            }
            return i18n._("Choose all answers that apply:");
        }
        return i18n._("Choose 1 answer:");
    };

    deselectEnabled: () => boolean = () => {
        // We want to force enable deselect on mobile.
        return this.props.apiOptions.isMobile || this.props.deselectEnabled;
    };

    render(): React.Node {
        const rubric = this.props.reviewModeRubric;
        const reviewMode = !!rubric;

        const styles = BaseRadio.styles;
        const sat = this.props.apiOptions.satStyling;

        const isMobile = this.props.apiOptions.isMobile;

        const choices = this.props.choices;
        const firstChoiceHighlighted = choices[0].highlighted;
        const lastChoiceHighlighted = choices[choices.length - 1].highlighted;

        const className = classNames(
            "perseus-widget-radio",
            !this.props.editMode && "perseus-rendered-radio",
            css(
                styles.radio,
                // SAT doesn't use the "responsive styling" as it conflicts
                // with their custom theming.
                !sat && styles.responsiveRadioContainer,
                !sat &&
                    firstChoiceHighlighted &&
                    isMobile &&
                    styles.radioContainerFirstHighlighted,
                !sat &&
                    lastChoiceHighlighted &&
                    isMobile &&
                    styles.radioContainerLastHighlighted,
                sat && styles.satRadio,
            ),
        );

        const instructionsClassName = classNames(
            "instructions",
            css(styles.instructions, isMobile && styles.instructionsMobile),
        );
        const instructions = this.getInstructionsText();
        const shouldShowInstructions = !sat;

        const responsiveClassName = css(styles.responsiveFieldset);
        const fieldset = (
            <fieldset
                className={`perseus-widget-radio-fieldset ${responsiveClassName}`}
            >
                <legend className="perseus-sr-only">{instructions}</legend>
                {shouldShowInstructions && (
                    <div className={instructionsClassName}>{instructions}</div>
                )}
                <ul className={className} style={{listStyle: "none"}}>
                    {this.props.choices.map(function (choice, i) {
                        let Element = Choice;
                        const ref = React.createRef();
                        this.choiceRefs[i] = ref;
                        const elementProps = {
                            apiOptions: this.props.apiOptions,
                            multipleSelect: this.props.multipleSelect,
                            checked: choice.checked,
                            crossedOut: choice.crossedOut,
                            previouslyAnswered: choice.previouslyAnswered,
                            reviewMode,
                            correct: choice.correct,
                            rationale: choice.rationale,
                            content: choice.content,
                            disabled:
                                this.props.apiOptions.readOnly ||
                                choice.disabled,
                            showCorrectness:
                                reviewMode || !!choice.showCorrectness,
                            showRationale:
                                choice.hasRationale &&
                                (reviewMode || choice.showRationale),
                            pos: i,
                            onChange: (newValues) => {
                                this.updateChoice(i, newValues);
                            },
                            ref,
                        };

                        if (choice.isNoneOfTheAbove) {
                            Element = ChoiceNoneAbove;
                            _.extend(elementProps, {
                                showContent: choice.revealNoneOfTheAbove,
                            });
                        }

                        const nextChoice = this.props.choices[i + 1];
                        const nextChoiceHighlighted =
                            !!nextChoice && nextChoice.highlighted;

                        const aphroditeClassName = (checked) => {
                            // Whether or not to show correctness borders
                            // for this choice and the next choice.
                            const satShowCorrectness =
                                sat && reviewMode && checked;
                            const satShowCorrectnessNext =
                                sat &&
                                reviewMode &&
                                nextChoice &&
                                nextChoice.checked;

                            return css(
                                sharedStyles.aboveScratchpad,
                                styles.item,
                                !sat && styles.responsiveItem,
                                !sat && checked && styles.selectedItem,
                                !sat &&
                                    checked &&
                                    choice.highlighted &&
                                    styles.aboveBackdrop,
                                !sat &&
                                    checked &&
                                    choice.highlighted &&
                                    this.props.apiOptions.isMobile &&
                                    styles.aboveBackdropMobile,
                                !sat &&
                                    nextChoiceHighlighted &&
                                    this.props.apiOptions.isMobile &&
                                    styles.nextHighlighted,
                                sat && styles.satRadioOption,
                                satShowCorrectness &&
                                    !choice.correct &&
                                    styles.satRadioOptionIncorrect,
                                satShowCorrectness &&
                                    choice.correct &&
                                    styles.satRadioOptionCorrect,
                                satShowCorrectnessNext &&
                                    !nextChoice.correct &&
                                    styles.satRadioOptionNextIncorrect,
                                satShowCorrectnessNext &&
                                    nextChoice.correct &&
                                    styles.satRadioOptionNextCorrect,
                                sat && rubric && styles.satReviewRadioOption,
                            );
                        };

                        // HACK(abdulrahman): Preloads the selection-state
                        // css because of a bug that causes iOS to lag
                        // when selecting the button for the first time.
                        aphroditeClassName(true);

                        const className = classNames(
                            aphroditeClassName(choice.checked),
                            // TODO(aria): Make test case for these API
                            // classNames
                            ApiClassNames.RADIO.OPTION,
                            choice.checked && ApiClassNames.RADIO.SELECTED,
                            reviewMode &&
                                rubric.choices[i].correct &&
                                ApiClassNames.CORRECT,
                            reviewMode &&
                                !rubric.choices[i].correct &&
                                ApiClassNames.INCORRECT,
                        );

                        // In edit mode, the Choice renders a Div in order to
                        // allow for the contentEditable area to be selected
                        // (label forces any clicks inside to select the input
                        // element) We have to add some extra behavior to make
                        // sure that we can still check the choice.
                        let listElem = null;
                        let clickHandler = null;
                        if (this.props.editMode) {
                            clickHandler = (e) => {
                                // Traverse the parent nodes of the clicked
                                // element.
                                let elem = e.target;
                                while (elem && elem !== listElem) {
                                    // If the clicked element is inside of the
                                    // radio icon, then we want to trigger the
                                    // check by flipping the choice of the icon.
                                    if (
                                        elem.getAttribute("data-is-radio-icon")
                                    ) {
                                        this.updateChoice(i, {
                                            checked: !choice.checked,
                                            crossedOut: choice.crossedOut,
                                        });
                                        return;
                                    }
                                    elem = elem.parentNode;
                                }
                            };
                        }

                        // TODO(mattdr): Index isn't a *good* choice of key
                        // here; is there a better one? Can we use choice
                        // content somehow? Would changing our choice of key
                        // somehow break something happening inside a choice's
                        // child Renderers, by changing when we mount/unmount?
                        return (
                            <li
                                key={i}
                                ref={(e) => (listElem = e)}
                                className={className}
                                onClick={clickHandler}
                                onTouchStart={
                                    !this.props.labelWrap
                                        ? null
                                        : captureScratchpadTouchStart
                                }
                            >
                                <Element {...elementProps} />
                            </li>
                        );
                    }, this)}
                </ul>
            </fieldset>
        );

        // Allow for horizontal scrolling if content is too wide, which may be
        // an issue especially on phones.
        // This is disabled in SAT, since it conflicts with their theming.
        return (
            <div className={css(!sat && styles.responsiveContainer)}>
                {fieldset}
            </div>
        );
    }
}

export default BaseRadio;
