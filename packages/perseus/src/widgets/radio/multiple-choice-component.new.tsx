import React, {useId} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import ScrollableView from "../../components/scrollable-view";

import Choice from "./choice.new";
import styles from "./multiple-choice.module.css";
import {getChoiceLetter} from "./util";
import {getInstructionsText} from "./utils/string-utils";

import type {IndicatorContent} from "./choice-indicator.new";
import type {ChoiceType} from "./multiple-choice-widget.new";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

/**
 * Props for the MultipleChoiceComponent
 */
export interface MultipleChoiceComponentProps {
    choices: ReadonlyArray<ChoiceType>;
    countChoices: boolean | null | undefined;
    multipleSelect?: boolean;
    numCorrect: number;
    onChoiceChange: (choiceIndex: number, newCheckedState: boolean) => void;
    // Review mode is used when the user has successfully answered the question
    // and is now reviewing their answer.
    reviewMode: boolean;
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
    choices,
    countChoices,
    multipleSelect = false,
    numCorrect,
    onChoiceChange,
    reviewMode,
}: MultipleChoiceComponentProps): React.ReactElement => {
    const {strings} = usePerseusI18n();

    const instructions = getInstructionsText({
        multipleSelect,
        countChoices,
        numCorrect,
        strings,
    });

    const choiceListClasses = reviewMode
        ? `${styles.choiceList} ${styles.reviewAnswers}`
        : styles.choiceList;

    return (
        <fieldset
            className={styles.container}
            data-feature-flag="feature flag is ON"
        >
            <legend className={styles.instructions}>{instructions}</legend>
            <ScrollableView overflowX="auto">
                <ul className={choiceListClasses}>
                    <ChoiceListItems
                        choices={choices}
                        i18nStrings={strings}
                        onChoiceChange={onChoiceChange}
                        reviewMode={reviewMode}
                        multipleSelect={multipleSelect}
                    />
                </ul>
            </ScrollableView>
        </fieldset>
    );
};

/**
 * Props for the ChoiceList
 */
interface ChoiceListItemsProps {
    choices: ReadonlyArray<ChoiceType>;
    i18nStrings: PerseusStrings;
    multipleSelect: boolean;
    onChoiceChange: (choiceIndex: number, newCheckedState: boolean) => void;
    reviewMode: boolean;
}

const ChoiceListItems = (props: ChoiceListItemsProps): React.ReactElement => {
    const {choices, i18nStrings, multipleSelect, onChoiceChange, reviewMode} =
        props;
    const listId = useId();

    const items = choices.map((choice, i) => {
        const updateChecked = (isChecked: boolean) => {
            onChoiceChange(i, isChecked);
        };
        const contentId = `${listId}-choice-${i + 1}`;
        const choiceLetter = getChoiceLetter(i, i18nStrings);
        const srContent =
            reviewMode === true
                ? choice.correct
                    ? i18nStrings.choiceCorrect
                    : i18nStrings.choiceIncorrect
                : i18nStrings.choice;
        const indicatorContent: IndicatorContent = {
            visible: choiceLetter,
            screenReader: srContent({letter: choiceLetter}),
            labelledBy: contentId,
        };
        const showCorrectness =
            reviewMode === true
                ? choice.correct
                    ? "correct"
                    : "wrong"
                : undefined;
        const content = choice.isNoneOfTheAbove
            ? i18nStrings.noneOfTheAbove
            : choice.content;
        let rationale: React.ReactElement | undefined;
        if (reviewMode && choice.hasRationale) {
            const rationaleId = `${contentId}-rationale-${i + 1}`;
            indicatorContent.describedBy = rationaleId;
            const rationaleClasses =
                showCorrectness === "correct"
                    ? `${styles.rationale} ${styles.isCorrect}`
                    : styles.rationale;
            rationale = (
                <div id={rationaleId} className={rationaleClasses}>
                    {/* Any prefix here needs to be translated */}
                    <span className="perseus-sr-only">Here's why:</span>
                    {choice.rationale}
                </div>
            );
        }

        return (
            <Choice
                key={choice.id}
                checked={choice.checked}
                indicatorContent={indicatorContent}
                isMultiSelect={multipleSelect}
                showCorrectness={showCorrectness}
                updateChecked={updateChecked}
            >
                <div className={styles.content}>
                    <div id={contentId}>{content}</div>
                    {rationale}
                </div>
            </Choice>
        );
    });

    return <>{items}</>;
};

export default MultipleChoiceComponent;
