import {type PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import classNames from "classnames";
import * as React from "react";
import {useRef, useEffect} from "react";
import _ from "underscore";

import {usePerseusI18n} from "../../components/i18n-context";
import ScrollableView from "../../components/scrollable-view";
import {ClassNames as ApiClassNames} from "../../perseus-api";
import Util from "../../util";
import {scrollElementIntoView} from "../../util/scroll-utils";

import ChoiceNoneAbove from "./choice-none-above.new";
import ChoiceTemp from "./choice-option.temp.new";
import Choice from "./choice.new";
import styles from "./multiple-choice.module.css";
import {getChoiceLetter} from "./util";
import {getInstructionsText} from "./utils/string-utils";

import type {APIOptions} from "../../types";

// TODO: What is this and why do we have it? (reference usage in choice-option.temp.new.tsx)
const {captureScratchpadTouchStart} = Util;

// TODO(LEMS-3170): Simplify the ChoiceType by using ChoiceProps directly.
/**
 * Represents a single choice in the MultipleChoiceComponent
 */
export interface ChoiceType {
    checked: boolean;
    content: React.ReactNode;
    rationale: React.ReactNode;
    hasRationale: boolean;
    showRationale: boolean;
    showCorrectness: boolean;
    correct: boolean;
    isNoneOfTheAbove: boolean;
    previouslyAnswered: boolean;
    revealNoneOfTheAbove: boolean;
    disabled: boolean;
}

/**
 * Props for the MultipleChoiceComponent
 */
interface MultipleChoiceComponentProps {
    apiOptions: APIOptions;
    choices: ReadonlyArray<ChoiceType>;
    countChoices: boolean | null | undefined;
    // Edit mode is only ever used in the Content Editor, and will be removed
    // once we stop using BaseRadio in editor.
    // TODO(LEMS-3229): Remove this prop once we stop using BaseRadio in editor
    editMode?: boolean;
    isLastUsedWidget?: boolean;
    labelWrap: boolean;
    multipleSelect?: boolean;
    numCorrect: number;
    onChoiceChange: (choiceIndex: number, newCheckedState: boolean) => void;
    // Review mode is used when the user has successfully answered the question
    // and is now reviewing their answer.
    reviewMode: boolean;
    reviewModeRubric?: PerseusRadioWidgetOptions | null;
}

/**
 * The MultipleChoiceComponent renders the UI for multiple choice questions.
 *
 * This component handles the presentation of choices, user interactions,
 * and accessibility features, while the MultipleChoiceWidget manages the
 * underlying logic and state.
 *
 * Supports both radio button (single select) and checkbox (multiple select) modes.
 *
 * Created as part of the Radio Revitalization Project (LEMS-2933).
 */
const MultipleChoiceComponent = ({
    apiOptions,
    reviewModeRubric,
    reviewMode,
    editMode = false,
    multipleSelect = false,
    labelWrap,
    countChoices,
    numCorrect,
    isLastUsedWidget,
    choices,
    onChoiceChange,
}: MultipleChoiceComponentProps): React.ReactElement => {
    const {strings} = usePerseusI18n();

    const choiceRefs = useRef<Array<React.RefObject<HTMLButtonElement>>>([]);
    // Keep track of the previous review mode rubric to avoid unnecessary
    // scrolling when switching between review mode and edit mode.
    const prevReviewModeRubric = useRef<
        PerseusRadioWidgetOptions | undefined | null
    >();

    useEffect(() => {
        // TODO: Investigate if this is still an issue.

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

                if (ref.current) {
                    scrollElementIntoView(ref.current);
                }
            }
        }

        prevReviewModeRubric.current = reviewModeRubric;
    }, [apiOptions, isLastUsedWidget, reviewModeRubric, choices]);

    const choiceListClassName = classNames(
        "perseus-widget-radio",
        // TODO(LEMS-3229): Remove this line after we stop using BaseRadio in editor
        !editMode && "perseus-rendered-radio", // Styles to be applied when not in the editor
        styles.choiceList, // Main class for the choice list
    );

    const instructions = getInstructionsText({
        multipleSelect,
        countChoices,
        numCorrect,
        strings,
    });

    return (
        <fieldset
            className={styles.container}
            data-feature-flag="feature flag is ON"
        >
            <legend className={styles.instructions}>{instructions}</legend>
            <ScrollableView overflowX="auto">
                <ul className={choiceListClassName}>
                    {choices.map((choice, i) => {
                        let Element = ChoiceTemp;
                        const ref = React.createRef<any>();

                        choiceRefs.current[i] = ref;

                        const elementProps = {
                            apiOptions: apiOptions,
                            multipleSelect: multipleSelect,
                            checked: choice.checked,
                            previouslyAnswered: choice.previouslyAnswered,
                            reviewMode,
                            correct: choice.correct,
                            rationale: choice.rationale,
                            content: choice.content,
                            disabled: apiOptions.readOnly || choice.disabled,
                            showCorrectness:
                                reviewMode || !!choice.showCorrectness,
                            showRationale:
                                choice.hasRationale &&
                                (reviewMode || choice.showRationale),
                            pos: i,
                            onChange: (newValues) => {
                                // editMode selection is handled in clickHandler
                                if (editMode) {
                                    return;
                                }

                                onChoiceChange(i, newValues.checked);
                            },
                        } as const;

                        if (choice.isNoneOfTheAbove) {
                            Element = ChoiceNoneAbove;
                            _.extend(elementProps, {
                                showContent: choice.revealNoneOfTheAbove,
                            });
                        }

                        const updateChecked = (isChecked: boolean) => {
                            onChoiceChange(i, isChecked);
                        };
                        const choiceLetter = getChoiceLetter(i, strings);
                        const showCorrectness =
                            reviewMode === true
                                ? choice.correct
                                    ? "correct"
                                    : "wrong"
                                : undefined;
                        // TODO: Use choice ID as key once it's available
                        return (
                            <Choice
                                key={i}
                                checked={choice.checked}
                                indicatorContent={choiceLetter}
                                isMultiSelect={multipleSelect}
                                showCorrectness={showCorrectness}
                                updateChecked={updateChecked}
                            >
                                {choice.content}
                            </Choice>
                        );
                    })}
                </ul>
            </ScrollableView>
        </fieldset>
    );
};

export default MultipleChoiceComponent;
