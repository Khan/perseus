/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {
    type PerseusRadioWidgetOptions,
    generateChoiceId,
} from "@khanacademy/perseus-core";
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
import Choice from "./choice.new";
import styles from "./multiple-choice.module.css";
import {getInstructionsText} from "./utils/string-utils";

import type {APIOptions} from "../../types";

const {captureScratchpadTouchStart} = Util;

// TODO(LEMS-3170): Simplify the ChoiceType by using ChoiceProps directly.
/**
 * Represents a single choice in the MultipleChoiceComponent
 */
export interface ChoiceType {
    id: string;
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

    const instructionsClassName = classNames(styles.instructions);
    const instructions = getInstructionsText({
        multipleSelect,
        countChoices,
        numCorrect,
        strings,
    });

    const fieldset = (
        <fieldset
            className={`perseus-widget-radio-fieldset ${styles.responsiveFieldset}`}
            data-feature-flag="feature flag is ON"
        >
            <legend className="perseus-sr-only">{instructions}</legend>
            <div className={instructionsClassName} aria-hidden="true">
                {instructions}
            </div>
            <ScrollableView overflowX="auto">
                <ul className={choiceListClassName}>
                    {choices.map((choice, i) => {
                        let Element = Choice;
                        const ref = React.createRef<any>();

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

                        const itemClassName = classNames(
                            styles.item,
                            styles.responsiveItem,
                            choice.checked && styles.selectedItem,
                        );

                        let correctnessClass;
                        // reviewMode is only true if there's a rubric
                        // but TypeScript doesn't understand that
                        if (reviewMode && reviewModeRubric) {
                            correctnessClass = reviewModeRubric.choices[i]
                                .correct
                                ? ApiClassNames.CORRECT
                                : ApiClassNames.INCORRECT;
                        }
                        const className = classNames(
                            itemClassName,
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
                                    if (
                                        elem.getAttribute("data-is-radio-icon")
                                    ) {
                                        onChoiceChange(i, !choice.checked);
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

                        // Generate a stable key for React reconciliation
                        const choiceKey =
                            choice.id ||
                            generateChoiceId(
                                choice.content?.toString() || "",
                                i,
                            );

                        return (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- TODO(LEMS-2871): Address a11y error
                            <li
                                key={choiceKey}
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
            </ScrollableView>
        </fieldset>
    );

    // Allow for horizontal scrolling if content is too wide, which may be
    // an issue especially on phones.
    return <div className={styles.responsiveContainer}>{fieldset}</div>;
};

export default MultipleChoiceComponent;
