import Switch from "@khanacademy/wonder-blocks-switch";
import {useTimeout} from "@khanacademy/wonder-blocks-timing";
import React, {useEffect, useId, useRef, useState} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import ScrollableView from "../../components/scrollable-view";
import a11yStyles from "../../styles/a11y.module.css";
import {getBackgroundColor} from "../../util/colors";

import Choice from "./choice";
import styles from "./radio-component.module.css";
import {getChoiceLetter} from "./util";
import {getInstructionsText} from "./utils/string-utils";

import type {IndicatorContent} from "./choice-indicator";
import type {ChoiceType} from "./radio-widget";
import type {PerseusStrings} from "../../strings";

/**
 * The cross-out tool's state and handlers, owned by the RadioWidget.
 */
export interface RadioCrossOutProps {
    /** Whether the "Cross out answers" toggle is on. */
    toggleOn: boolean;
    /** Whether the toggle and the cross-out buttons are disabled (after Check). */
    disabled: boolean;
    onToggleChange: (toggleOn: boolean) => void;
    /** The IDs of the choices the learner crossed out. */
    crossedOutIds: ReadonlyArray<string>;
    onCrossOutChange: (choiceId: string, crossedOut: boolean) => void;
}

/**
 * Props for the RadioComponent
 */
export interface RadioComponentProps {
    choices: ReadonlyArray<ChoiceType>;
    countChoices: boolean | null | undefined;
    multipleSelect?: boolean;
    numCorrect: number;
    onChoiceChange: (choiceId: string, newCheckedState: boolean) => void;
    // Review mode is used when the user has successfully answered the question
    // and is now reviewing their answer.
    reviewMode: boolean;
    isRequired?: boolean;
    /**
     * The cross-out tool. Leave it out to render neither the "Cross out
     * answers" toggle nor any cross-out button.
     */
    crossOut?: RadioCrossOutProps;
}

/**
 * The RadioComponent renders the UI for multiple choice questions.
 *
 * This component handles the presentation of choices, user interactions,
 * and accessibility features, while the RadioWidget manages the
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
 * NOTE: Redundant ARIA roles for <ul> element
 *      Different screen readers handle <fieldset> and <legend> elements inconsistently,
 *          causing unpredictable announcement behavior:
 *              - NVDA + Chrome: Announces the legend when entering the fieldset,
 *                  providing context for the choices
 *              - VoiceOver + Safari: Often fails to announce the legend when users
 *                  navigate directly to form controls, especially with certain
 *                  navigation methods (arrow keys) or on mobile
 *      This inconsistency means some users hear the critical instructions
 *          ("Choose 1 answer", "Choose 3 answers", etc.) while others miss them
 *          entirely, depending on their assistive technology and navigation method.
 *          Redundant roles were added to address this issue.`role="list"` attribute
 *          preserves list semantics, as some screen readers may remove the implicit
 *          list role when `list-style: none` is applied via CSS.
 *
 * Created as part of the Radio Revitalization Project (LEMS-2933).
 */
const RadioComponent = ({
    choices,
    countChoices,
    multipleSelect = false,
    numCorrect,
    onChoiceChange,
    reviewMode,
    isRequired = false,
    crossOut,
}: RadioComponentProps): React.ReactElement => {
    const {strings} = usePerseusI18n();
    const legendId = useId();
    const crossOutSwitchId = `${legendId}-cross-out-switch`;
    const crossOutDescriptionId = `${legendId}-cross-out-description`;
    const containerRef = useRef<HTMLFieldSetElement>(null);
    const [backgroundColor, setBackgroundColor] = useState("transparent");

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setBackgroundColor(getBackgroundColor(container));
        }
    }, []);

    useTimeout(() => {
        // This is a duplicate of the useEffect function to handle the strangeness in the editor preview.
        // There is a slight delay in how styling is applied to some containers,
        //     like the Graded Group Set.
        // This only happens in the editor preview,
        //     so this should only be a redundant setting in learner-facing pages.
        const container = containerRef.current;
        if (container) {
            setBackgroundColor(getBackgroundColor(container));
        }
    }, 100);

    const instructions = getInstructionsText({
        multipleSelect,
        countChoices,
        numCorrect,
        strings,
    });

    const choiceListClasses = reviewMode
        ? `${styles.choiceList} ${styles.reviewAnswers}`
        : styles.choiceList;
    const cssVariableDeclaration: React.CSSProperties | undefined =
        backgroundColor !== "transparent"
            ? {
                  // @ts-expect-error TS2353: Object literal may only specify known properties
                  "--perseus-widget-background-color": backgroundColor,
              }
            : undefined;

    const scrollId = useId() + "-scroll";

    const containerClasses = crossOut
        ? `${styles.container} ${styles.hasCrossOut}`
        : styles.container;

    return (
        <>
            <fieldset
                className={containerClasses}
                ref={containerRef}
                style={cssVariableDeclaration}
            >
                <legend
                    id={legendId}
                    aria-hidden="true"
                    className={styles.instructions}
                >
                    {instructions}
                    {isRequired && (
                        <span className={a11yStyles.srOnly}>
                            {` ${strings.required}`}
                        </span>
                    )}
                </legend>
                {/* The toggle sits on the instructions line, but outside the
                    <legend>: the legend is aria-hidden, so a control inside it
                    couldn't be reached by screen readers. It comes before the
                    choices in the DOM, so Tab goes from the toggle straight
                    into the choices. */}
                {crossOut && (
                    <div className={styles.crossOutToggle}>
                        <label
                            className={styles.crossOutLabel}
                            htmlFor={crossOutSwitchId}
                        >
                            {strings.crossOutAnswers}
                        </label>
                        <Switch
                            aria-describedby={crossOutDescriptionId}
                            checked={crossOut.toggleOn}
                            disabled={crossOut.disabled}
                            id={crossOutSwitchId}
                            onChange={crossOut.onToggleChange}
                        />
                        <span
                            className={a11yStyles.srOnly}
                            id={crossOutDescriptionId}
                        >
                            {strings.crossOutAnswersDescription}
                        </span>
                    </div>
                )}
                <ScrollableView
                    className={crossOut ? styles.clearFloats : undefined}
                    id={scrollId}
                    overflowX="auto"
                >
                    {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                    <ul
                        data-widget="radio"
                        aria-labelledby={legendId}
                        className={choiceListClasses}
                        role="list"
                    >
                        <ChoiceListItems
                            choices={choices}
                            i18nStrings={strings}
                            onChoiceChange={onChoiceChange}
                            reviewMode={reviewMode}
                            multipleSelect={multipleSelect}
                            crossOut={crossOut}
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
    crossOut?: RadioCrossOutProps;
}

const ChoiceListItems = (props: ChoiceListItemsProps): React.ReactElement => {
    const {
        choices,
        crossOut,
        i18nStrings,
        multipleSelect,
        onChoiceChange,
        reviewMode,
    } = props;
    const listId = useId();

    const items = choices.map((choice, i) => {
        const updateChecked = (isChecked: boolean) => {
            onChoiceChange(choice.id, isChecked);
        };
        const contentId = `${listId}-choice-${i + 1}`;
        const choiceLetter = getChoiceLetter(i, i18nStrings);
        const crossedOut = !!crossOut?.crossedOutIds.includes(choice.id);
        const srContent =
            reviewMode && choice.correct
                ? i18nStrings.choiceCorrect
                : crossedOut
                  ? i18nStrings.choiceCrossedOut
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
                crossOut={
                    crossOut && {
                        crossedOut,
                        disabled: crossOut.disabled,
                        hidden: !crossOut.toggleOn,
                        label: i18nStrings.crossOutChoice({
                            letter: choiceLetter,
                        }),
                        onChange: (isCrossedOut: boolean) =>
                            crossOut.onCrossOutChange(choice.id, isCrossedOut),
                    }
                }
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

export default RadioComponent;
