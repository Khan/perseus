import {type PerseusRadioWidgetOptions} from "@khanacademy/perseus-core";
import classNames from "classnames";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import ScrollableView from "../../components/scrollable-view";

import Choice from "./choice.new";
import styles from "./multiple-choice.module.css";
import {getChoiceLetter} from "./util";
import {getInstructionsText} from "./utils/string-utils";

import type {APIOptions} from "../../types";

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
                    <ChoiceListItems
                        choices={choices}
                        onChoiceChange={onChoiceChange}
                        reviewMode={reviewMode}
                        multipleSelect={multipleSelect}
                    />
                </ul>
            </ScrollableView>
        </fieldset>
    );
};

const ChoiceListItems = (props: MultipleChoiceComponentProps): React.ReactElement => {
    const {choices, onChoiceChange, reviewMode, multipleSelect = false} = props;
    const {strings} = usePerseusI18n();

    const items = choices.map((choice, i) => {
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
        const content = choice.isNoneOfTheAbove
            ? strings.noneOfTheAbove
            : choice.content;
        const rationaleClasses = [styles.rationale]
            .concat(showCorrectness ? [styles["is-" + showCorrectness]] : [])
            .join(" ");
        const rationale =
            (reviewMode || choice.showRationale) && choice.hasRationale ? (
                <div className={rationaleClasses}>{choice.rationale}</div>
            ) : undefined;
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
                <div className={classNames(styles.content)}>
                    {content}
                    {rationale}
                </div>
            </Choice>
        );
    });

    return <>{items}</>;
};

export default MultipleChoiceComponent;
