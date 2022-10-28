// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import {useRef, useEffect} from "react";
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

import type {PerseusRadioWidgetOptions} from "../../perseus-types";
import type {APIOptions} from "../../types.js";
import type {StyleDeclaration} from "aphrodite";

const {captureScratchpadTouchStart} = Util;

// exported for tests
export type ChoiceType = {|
    checked: boolean,
    crossedOut: boolean,
    content: React.Node,
    rationale: React.Node,
    hasRationale: boolean,
    showRationale: boolean,
    showCorrectness: boolean,
    correct: boolean,
    isNoneOfTheAbove: boolean,
    highlighted: boolean,
    previouslyAnswered: boolean,
    revealNoneOfTheAbove: boolean,
    disabled: boolean,
|};

export type FocusFunction = (choiceIndex: ?number) => boolean;

type Props = {|
    apiOptions: APIOptions,
    choices: $ReadOnlyArray<ChoiceType>,
    deselectEnabled?: boolean,
    editMode: boolean,
    labelWrap: boolean,
    countChoices: ?boolean,
    numCorrect: number,
    multipleSelect: boolean,
    // the logic checks whether this exists,
    // so it must be optional
    reviewModeRubric?: PerseusRadioWidgetOptions,

    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains
    // an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    onChange: (newValues: {
        checked: $ReadOnlyArray<boolean>,
        crossedOut: $ReadOnlyArray<boolean>,
    }) => void,
    registerFocusFunction?: (FocusFunction) => void,

    // Whether this widget was the most recently used widget in this
    // Renderer. Determines whether we'll auto-scroll the page upon
    // entering review mode.
    isLastUsedWidget?: boolean,
|};

function getInstructionsText(
    multipleSelect: boolean,
    countChoices: ?boolean,
    numCorrect: number,
): string {
    if (multipleSelect) {
        if (countChoices) {
            return i18n._("Choose %(numCorrect)s answers:", {
                numCorrect: numCorrect,
            });
        }
        return i18n._("Choose all answers that apply:");
    }
    return i18n._("Choose 1 answer:");
}

function BaseRadio(props: Props): React.Node {
    const {
        apiOptions,
        reviewModeRubric,
        choices,
        editMode,
        multipleSelect,
        labelWrap,
        countChoices,
        numCorrect,
        isLastUsedWidget,
        registerFocusFunction,
    } = props;

    // useEffect doesn't have previous props
    const prevReviewModeRubric = useRef();
    const choiceRefs = useRef([]);

    useEffect(() => {
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
            !prevReviewModeRubric.current
        ) {
            const checkedIndex = choices.findIndex((c) => c.checked);
            if (checkedIndex >= 0) {
                const ref = choiceRefs.current[checkedIndex];
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

        prevReviewModeRubric.current = reviewModeRubric;
    }, [apiOptions, choices, isLastUsedWidget, reviewModeRubric]);

    // When a particular choice's `onChange` handler is called, indicating a
    // change in a single choice's values, we need to call our `onChange`
    // handler in order to notify our parent. However, our API with our parent
    // is that we always provide *all* values for *all* choices, even if just
    // one choice's values changed. (This is because sometimes an interaction
    // with one choice can affect many choices, like how checking a new answer
    // will usually cause the old answer to become unchecked.)
    //
    // So, given the new values for a particular choice, compute the new values
    // for all choices, and pass them to `onChange`.
    //
    // `newValues` is an object with two keys: `checked` and `crossedOut`. Each
    // contains a boolean value specifying the new checked and crossed-out
    // value of this choice.
    function updateChoice(
        choiceIndex: number,
        newValues: $ReadOnly<{checked: boolean, crossedOut: boolean}>,
    ): void {
        const {multipleSelect, choices, onChange} = props;

        // Get the baseline `checked` values. If we're checking a new answer
        // and multiple-select is not on, we should clear all choices to be
        // unchecked. Otherwise, we should copy the old checked values.
        let newCheckedList;
        if (newValues.checked && !multipleSelect) {
            newCheckedList = choices.map((_) => false);
        } else {
            newCheckedList = choices.map((c) => c.checked);
        }

        // Get the baseline `crossedOut` values.
        const newCrossedOutList = choices.map((c) => c.crossedOut);

        // Update this choice's `checked` and `crossedOut` values.
        newCheckedList[choiceIndex] = newValues.checked;
        newCrossedOutList[choiceIndex] = newValues.crossedOut;

        onChange({
            checked: newCheckedList,
            crossedOut: newCrossedOutList,
        });
    }

    // register a callback with the parent that allows
    // the parent to focus an individual choice
    registerFocusFunction?.((choiceIndex) => {
        const ref = choiceRefs.current[choiceIndex || 0];
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
    });

    // some commonly used shorthands
    const reviewMode = !!reviewModeRubric;
    const sat = apiOptions.satStyling;
    const isMobile = apiOptions.isMobile;

    const firstChoiceHighlighted = choices[0].highlighted;
    const lastChoiceHighlighted = choices[choices.length - 1].highlighted;

    const className: $ReadOnlyArray<string> = classNames(
        "perseus-widget-radio",
        !editMode && "perseus-rendered-radio",
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

    const instructionsClassName: $ReadOnlyArray<string> = classNames(
        "instructions",
        css(styles.instructions, isMobile && styles.instructionsMobile),
    );
    const instructions = getInstructionsText(
        multipleSelect,
        countChoices,
        numCorrect,
    );
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
                {choices.map(function (choice, i) {
                    let Element = Choice;
                    const ref = React.createRef();
                    choiceRefs.current[i] = ref;
                    const elementProps = {
                        apiOptions: apiOptions,
                        multipleSelect: multipleSelect,
                        checked: choice.checked,
                        crossedOut: choice.crossedOut,
                        previouslyAnswered: choice.previouslyAnswered,
                        reviewMode,
                        correct: choice.correct,
                        rationale: choice.rationale,
                        content: choice.content,
                        disabled: apiOptions.readOnly || choice.disabled,
                        showCorrectness: reviewMode || !!choice.showCorrectness,
                        showRationale:
                            choice.hasRationale &&
                            (reviewMode || choice.showRationale),
                        pos: i,
                        onChange: (newValues) => {
                            updateChoice(i, newValues);
                        },
                        ref,
                    };

                    if (choice.isNoneOfTheAbove) {
                        Element = ChoiceNoneAbove;
                        _.extend(elementProps, {
                            showContent: choice.revealNoneOfTheAbove,
                        });
                    }

                    const nextChoice = choices[i + 1];
                    const nextChoiceHighlighted =
                        !!nextChoice && nextChoice.highlighted;

                    const aphroditeClassName = (checked) => {
                        // Whether or not to show correctness borders
                        // for this choice and the next choice.
                        const satShowCorrectness = sat && reviewMode && checked;
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
                                apiOptions.isMobile &&
                                styles.aboveBackdropMobile,
                            !sat &&
                                nextChoiceHighlighted &&
                                apiOptions.isMobile &&
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
                            sat &&
                                reviewModeRubric &&
                                styles.satReviewRadioOption,
                        );
                    };

                    // HACK(abdulrahman): Preloads the selection-state
                    // css because of a bug that causes iOS to lag
                    // when selecting the button for the first time.
                    aphroditeClassName(true);

                    let correctnessClass;
                    // reviewMode is only true if there's a rubric
                    // but Flow doesn't understand that
                    if (reviewMode && reviewModeRubric) {
                        correctnessClass = reviewModeRubric.choices[i].correct
                            ? ApiClassNames.CORRECT
                            : ApiClassNames.INCORRECT;
                    }
                    const className: $ReadOnlyArray<string> = classNames(
                        aphroditeClassName(choice.checked),
                        // TODO(aria): Make test case for these API
                        // classNames
                        ApiClassNames.RADIO.OPTION,
                        choice.checked && ApiClassNames.RADIO.SELECTED,
                        correctnessClass,
                    );

                    // In edit mode, the Choice renders a Div in order to
                    // allow for the contentEditable area to be selected
                    // (label forces any clicks inside to select the input
                    // element) We have to add some extra behavior to make
                    // sure that we can still check the choice.
                    let listElem = null;
                    let clickHandler = null;
                    if (editMode) {
                        clickHandler = (e) => {
                            // Traverse the parent nodes of the clicked
                            // element.
                            let elem = e.target;
                            while (elem && elem !== listElem) {
                                // If the clicked element is inside of the
                                // radio icon, then we want to trigger the
                                // check by flipping the choice of the icon.
                                if (elem.getAttribute("data-is-radio-icon")) {
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
                                !labelWrap ? null : captureScratchpadTouchStart
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

BaseRadio.defaultProps = {
    editMode: false,
    multipleSelect: false,
};

const styles: StyleDeclaration = StyleSheet.create({
    instructions: {
        display: "block",
        color: styleConstants.gray17,
        fontSize: 14,
        lineHeight: 1.25,
        fontStyle: "normal",
        fontWeight: "bold",
        marginBottom: 16,
    },

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

    radio: {
        // Avoid centering
        width: "100%",
    },

    responsiveRadioContainer: {
        borderBottom: `1px solid ${styleConstants.radioBorderColor}`,
        borderTop: `1px solid ${styleConstants.radioBorderColor}`,
        width: "auto",
        [mediaQueries.smOrSmaller]: {
            marginLeft: styleConstants.negativePhoneMargin,
            marginRight: styleConstants.negativePhoneMargin,
        },
    },

    radioContainerFirstHighlighted: {
        borderTop: `1px solid rgba(0, 0, 0, 0)`,
    },

    radioContainerLastHighlighted: {
        borderBottom: `1px solid rgba(0, 0, 0, 0)`,
    },

    satRadio: {
        background: "none",
        marginLeft: 0,
        userSelect: "none",
    },

    satRadioOption: {
        margin: 0,
        padding: 0,
        borderBottom: `1px solid #ccc`,
        ":first-child": {
            borderTop: `1px solid #ccc`,
        },
    },

    satRadioOptionCorrect: {
        borderBottomColor: styleConstants.satCorrectBorderColor,
        ":first-child": {
            borderTopColor: styleConstants.satCorrectBorderColor,
        },
    },

    satRadioOptionIncorrect: {
        borderBottomColor: styleConstants.satIncorrectBorderColor,
        ":first-child": {
            borderTopColor: styleConstants.satIncorrectBorderColor,
        },
    },

    satRadioOptionNextCorrect: {
        borderBottomColor: styleConstants.satCorrectBorderColor,
    },

    satRadioOptionNextIncorrect: {
        borderBottomColor: styleConstants.satIncorrectBorderColor,
    },

    satReviewRadioOption: {
        pointerEvents: "none",
    },

    item: {
        marginLeft: 20,
    },

    responsiveItem: {
        marginLeft: 0,
        padding: 0,

        ":not(:last-child)": {
            borderBottom: `1px solid ${styleConstants.radioBorderColor}`,
        },
    },
    selectedItem: {
        background: "white",
    },

    aboveBackdrop: {
        position: "relative",
        // HACK(emily): We want selected choices to show up above our
        // exercise backdrop, but below the exercise footer and
        // "feedback popover" that shows up. This z-index is carefully
        // coordinated between here and webapp. :(
        zIndex: 1062,
    },

    aboveBackdropMobile: {
        boxShadow:
            "0 0 4px 0 rgba(0, 0, 0, 0.2)," + "0 0 2px 0 rgba(0, 0, 0, 0.1)",

        ":not(:last-child)": {
            borderBottom: `1px solid rgba(0, 0, 0, 0)`,
        },
    },

    nextHighlighted: {
        ":not(:last-child)": {
            borderBottom: `1px solid rgba(0, 0, 0, 0)`,
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
});

export default BaseRadio;
