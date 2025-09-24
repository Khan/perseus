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
    onChoiceChange: (choiceId: string, newCheckedState: boolean) => void;
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
 * NOTE: This widget does not implement standard radio button or checkbox elements.
 *       The key difference is that the single-select (aka radio button) should
 *           allow the user to deselect a choice, whereas regular radio buttons
 *           can only be deselected by selecting another choice.
 *       Another difference is that keyboard navigation with single-select is
 *           done with the tab key, whereas regular radio buttons use the arrow keys,
 *           and the radio buttons are automatically selected when navigating to them.
 *       Since interactions with the single-select version of this widget don't
 *           follow the standard radio button behavior, we decided to use toggle
 *           button semantics for both versions of the widget,
 *           and implement additional ARIA attributes where needed.
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
    const legendId = useId();

    const instructions = getInstructionsText({
        multipleSelect,
        countChoices,
        numCorrect,
        strings,
    });

    const choiceListClasses = reviewMode
        ? `${styles.choiceList} ${styles.reviewAnswers}`
        : styles.choiceList;

    const scrollId = useId() + "-scroll";

    return (
        <>
            <fieldset
                className={styles.container}
                data-feature-flag="feature flag is ON"
            >
                <legend
                    id={legendId}
                    aria-hidden="true"
                    className={styles.instructions}
                >
                    {instructions}
                </legend>
                <ScrollableView id={scrollId} overflowX="auto">
                    <ul
                        aria-labelledby={legendId}
                        className={choiceListClasses}
                    >
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
            <ScrollableView.Controls target={scrollId} />
        </>
    );
};

/**
 * Props for the ChoiceList
 */
interface ChoiceListItemsProps {
    choices: ReadonlyArray<ChoiceType>;
    i18nStrings: PerseusStrings;
    multipleSelect: boolean;
    onChoiceChange: (choiceId: string, newCheckedState: boolean) => void;
    reviewMode: boolean;
}

const ChoiceListItems = (props: ChoiceListItemsProps): React.ReactElement => {
    const {choices, i18nStrings, multipleSelect, onChoiceChange, reviewMode} =
        props;
    const listId = useId();

    const items = choices.map((choice, i) => {
        const updateChecked = (isChecked: boolean) => {
            onChoiceChange(choice.id, isChecked);
        };
        const contentId = `${listId}-choice-${i + 1}`;
        const choiceLetter = getChoiceLetter(i, i18nStrings);
        const srContent =
            reviewMode && choice.correct
                ? i18nStrings.choiceCorrect
                : i18nStrings.choice;
        const indicatorContent: IndicatorContent = {
            visible: choiceLetter,
            screenReader: srContent({letter: choiceLetter}),
            labelledBy: contentId,
        };
        const showCorrectness = reviewMode
            ? choice.correct
                ? "correct"
                : "wrong"
            : undefined;
        const content = choice.isNoneOfTheAbove
            ? i18nStrings.noneOfTheAbove
            : choice.content;
        let rationale: React.ReactElement | undefined;
        if (reviewMode && choice.hasRationale) {
            const rationaleId = `${contentId}-rationale`;
            indicatorContent.describedBy = rationaleId;
            const rationaleClasses =
                showCorrectness === "correct"
                    ? `${styles.rationale} ${styles.isCorrect}`
                    : styles.rationale;
            rationale = (
                <div id={rationaleId} className={rationaleClasses}>
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
