/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    usesNumCorrect,
    type PerseusRadioWidgetOptions,
} from "@khanacademy/perseus-core";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import {useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {usePerseusI18n} from "../../components/i18n-context";
import {ClassNames as ApiClassNames} from "../../perseus-api";
import * as styleConstants from "../../styles/constants";
import mediaQueries from "../../styles/media-queries";
import Util from "../../util";
import {scrollElementIntoView} from "../../util/scroll-utils";

import Choice from "./choice";
import ChoiceNoneAbove from "./choice-none-above";

import type {PerseusStrings} from "../../strings";
import type {APIOptions} from "../../types";
import type {StyleDeclaration} from "aphrodite";

const {captureScratchpadTouchStart} = Util;

// exported for tests
export type ChoiceType = {
    id: string;
    checked: boolean;
    content: React.ReactNode;
    rationale: React.ReactNode;
    hasRationale: boolean;
    showRationale: boolean;
    showCorrectness: boolean;
    correct: boolean;
    isNoneOfTheAbove: boolean;
    highlighted: boolean;
    previouslyAnswered: boolean;
    revealNoneOfTheAbove: boolean;
    disabled: boolean;
};

export type FocusFunction = (
    choiceIndex?: number | null | undefined,
) => boolean;

type Props = {
    apiOptions: APIOptions;
    choices: ReadonlyArray<ChoiceType>;
    deselectEnabled?: boolean;
    editMode?: boolean;
    labelWrap: boolean;
    countChoices: boolean | null | undefined;
    numCorrect: number;
    multipleSelect?: boolean;
    // the logic checks whether this exists,
    // so it must be optional
    reviewModeRubric?: PerseusRadioWidgetOptions | null;
    reviewMode: boolean;
    // A callback indicating that this choice has changed. Its argument is
    // an object with a `checked` key. It contains an array of boolean values,
    // specifying the new checked value of each choice.
    onChange: (newValues: {checked: ReadonlyArray<boolean>}) => void;
    registerFocusFunction?: (arg1: FocusFunction) => void;
    // Whether this widget was the most recently used widget in this
    // Renderer. Determines whether we'll auto-scroll the page upon
    // entering review mode.
    isLastUsedWidget?: boolean;
};

function getInstructionsText(
    multipleSelect: boolean,
    countChoices: boolean | null | undefined,
    numCorrect: number,
    strings: PerseusStrings,
): string {
    if (multipleSelect) {
        // using usesNumCorrect to make sure this logic stays in sync
        // with getRadioPublicWidgetOptions logic
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (usesNumCorrect(multipleSelect, !!countChoices, numCorrect)) {
            return strings.chooseNumAnswers({
                numCorrect: String(numCorrect),
            });
        }
        return strings.chooseAllAnswers;
    }
    return strings.chooseOneAnswer;
}

const BaseRadio = function ({
    apiOptions,
    reviewModeRubric,
    reviewMode,
    choices,
    editMode = false,
    multipleSelect = false,
    labelWrap,
    countChoices,
    numCorrect,
    isLastUsedWidget,
    onChange,
    registerFocusFunction,
}: Props): React.ReactElement {
    const {strings} = usePerseusI18n();

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
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !prevReviewModeRubric.current
        ) {
            const checkedIndex = choices.findIndex((c) => c.checked);
            if (checkedIndex >= 0) {
                const ref = choiceRefs.current[checkedIndex];
                // note(matthew): we know this is only getting passed
                // to a WB Clickable button, so we force it to be of
                // type HTMLButtonElement
                // @ts-expect-error - TS2339 - Property 'current' does not exist on type 'never'.
                const anyNode = ReactDOM.findDOMNode(ref.current) as any;
                const buttonNode = anyNode as
                    | HTMLButtonElement
                    | null
                    | undefined;
                if (buttonNode) {
                    scrollElementIntoView(buttonNode);
                }
            }
        }

        // @ts-expect-error - TS2322 - Type 'PerseusRadioWidgetOptions | undefined' is not assignable to type 'undefined'.
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
    // `newValues` is an object with a `checked` key. It contains a boolean value
    // specifying the new checked value of this choice.
    function updateChoice(
        choiceIndex: number,
        newValues: Readonly<{checked: boolean}>,
    ): void {
        // Get the baseline `checked` values. If we're checking a new answer
        // and multiple-select is not on, we should clear all choices to be
        // unchecked. Otherwise, we should copy the old checked values.
        let newCheckedList;
        if (newValues.checked && !multipleSelect) {
            newCheckedList = choices.map((_) => false);
        } else {
            newCheckedList = choices.map((c) => c.checked);
        }

        // Update this choice's `checked` values.
        newCheckedList[choiceIndex] = newValues.checked;

        onChange({
            checked: newCheckedList,
        });
    }

    // register a callback with the parent that allows
    // the parent to focus an individual choice
    registerFocusFunction?.((choiceIndex: number | null | undefined) => {
        const ref = choiceRefs.current[choiceIndex || 0];
        // note(matthew): we know this is only getting passed
        // to a WB Clickable button, so we force it to be of
        // type HTMLButtonElement
        // @ts-expect-error - TS2339 - Property 'current' does not exist on type 'never'.
        const anyNode = ReactDOM.findDOMNode(ref.current) as any;
        const buttonNode = anyNode as HTMLButtonElement | null | undefined;

        if (buttonNode) {
            buttonNode.focus();
        } else {
            return false;
        }
        return true;
    });

    // some commonly used shorthands
    const isMobile = apiOptions.isMobile;

    const firstChoiceHighlighted = choices[0].highlighted;
    const lastChoiceHighlighted = choices[choices.length - 1].highlighted;

    const className = classNames(
        "perseus-widget-radio",
        !editMode && "perseus-rendered-radio",
        css(
            styles.radio,
            styles.responsiveRadioContainer,
            firstChoiceHighlighted &&
                isMobile &&
                styles.radioContainerFirstHighlighted,
            lastChoiceHighlighted &&
                isMobile &&
                styles.radioContainerLastHighlighted,
        ),
    );

    const instructionsClassName = classNames(
        "instructions",
        css(styles.instructions, isMobile && styles.instructionsMobile),
    );
    const instructions = getInstructionsText(
        multipleSelect,
        countChoices,
        numCorrect,
        strings,
    );

    const responsiveClassName = css(styles.responsiveFieldset);
    const fieldset = (
        <fieldset
            className={`perseus-widget-radio-fieldset ${responsiveClassName}`}
        >
            <legend className="perseus-sr-only">{instructions}</legend>
            <div className={instructionsClassName} aria-hidden="true">
                {instructions}
            </div>
            <ul className={className} style={{listStyle: "none"}}>
                {choices.map((choice, i) => {
                    let Element = Choice;
                    const ref = React.createRef<any>();
                    // @ts-expect-error - TS2322 - Type 'RefObject<unknown>' is not assignable to type 'never'.
                    choiceRefs.current[i] = ref;
                    const elementProps = {
                        apiOptions: apiOptions,
                        id: choice.id,
                        multipleSelect: multipleSelect,
                        checked: choice.checked,
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
                            // editMode selection is handled in clickHandler
                            if (editMode) {
                                return;
                            }

                            updateChoice(i, newValues);
                        },
                    } as const;

                    if (choice.isNoneOfTheAbove) {
                        Element = ChoiceNoneAbove;
                        _.extend(elementProps, {
                            showContent: choice.revealNoneOfTheAbove,
                        });
                    }

                    const nextChoice = choices[i + 1];
                    const nextChoiceHighlighted =
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        !!nextChoice && nextChoice.highlighted;

                    const aphroditeClassName = (checked: boolean) => {
                        // Whether or not to show correctness borders
                        // for this choice and the next choice.
                        return css(
                            styles.item,
                            styles.responsiveItem,
                            checked && styles.selectedItem,
                            checked &&
                                choice.highlighted &&
                                styles.aboveBackdrop,
                            checked &&
                                choice.highlighted &&
                                apiOptions.isMobile &&
                                styles.aboveBackdropMobile,
                            nextChoiceHighlighted &&
                                apiOptions.isMobile &&
                                styles.nextHighlighted,
                        );
                    };

                    // HACK(abdulrahman): Preloads the selection-state
                    // css because of a bug that causes iOS to lag
                    // when selecting the button for the first time.
                    aphroditeClassName(true);

                    let correctnessClass;
                    // reviewMode is only true if there's a rubric
                    // but TypeScript doesn't understand that
                    if (reviewMode && reviewModeRubric) {
                        correctnessClass = reviewModeRubric.choices[i].correct
                            ? ApiClassNames.CORRECT
                            : ApiClassNames.INCORRECT;
                    }
                    const className = classNames(
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
                    let listElem: HTMLLIElement | null = null;
                    let clickHandler:
                        | React.MouseEventHandler<HTMLLIElement>
                        | undefined;
                    if (editMode) {
                        clickHandler = (e: any) => {
                            // Traverse the parent nodes of the clicked
                            // element.
                            let elem = e.target;
                            while (elem && elem !== listElem) {
                                // If the clicked element is inside of the
                                // radio icon, then we want to trigger the
                                // check by flipping the choice of the icon.
                                if (elem.getAttribute("data-is-radio-icon")) {
                                    updateChoice(i, {
                                        checked: !choice.checked,
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
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- TODO(LEMS-2871): Address a11y error
                        <li
                            key={i}
                            ref={(e) => (listElem = e)}
                            className={className}
                            onClick={clickHandler}
                            onTouchStart={
                                labelWrap
                                    ? undefined
                                    : captureScratchpadTouchStart
                            }
                            data-testid={choice.id}
                        >
                            <Element {...elementProps} ref={ref} />
                        </li>
                    );
                })}
            </ul>
        </fieldset>
    );

    // Allow for horizontal scrolling if content is too wide, which may be
    // an issue especially on phones.
    return <div className={css(styles.responsiveContainer)}>{fieldset}</div>;
};

const styles: StyleDeclaration = StyleSheet.create({
    instructions: {
        display: "block",
        color: styleConstants.gray17,
        fontSize: 14,
        lineHeight: 1.25,
        fontFamily: "inherit",
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
        padding: 0,
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
        // coordinated between here and khan/frontend. :(
        // See: https://github.com/khan/frontend/blob/f46d475b7684287bfa57ed9a40e846754f1d0a4d/apps/khanacademy/src/exercises-components-package/style-constants.ts#L27-L28
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
        paddingLeft: styleConstants.phoneMargin,
        // paddingRight is handled by responsiveFieldset
    },

    responsiveFieldset: {
        paddingRight: styleConstants.phoneMargin,
        minWidth: "auto",
    },
});

export default BaseRadio;
