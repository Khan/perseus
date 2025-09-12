import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

import MultipleChoiceComponent from "./multiple-choice-component.new";
import {getChoiceStates, parseNestedWidgets} from "./utils/general-utils";

import type {WidgetProps, ChoiceState, Widget} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import type {
    PerseusRadioChoice,
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

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

export type RadioProps = {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    choiceStates?: ReadonlyArray<ChoiceState>;
    editMode?: boolean;
    labelWrap?: boolean;
};

/**
 * RadioChoiceWithMetadata is used for server-side scoring
 */
export interface RadioChoiceWithMetadata extends PerseusRadioChoice {
    originalIndex: number;
    correct?: boolean;
}

type Props = WidgetProps<RadioProps, PerseusRadioUserInput, PerseusRadioRubric>;

/**
 * MultipleChoiceWidget implements the Widget interface for multiple choice questions.
 *
 * It handles Perseus-specific logic and user state management while delegating
 * UI rendering to the MultipleChoiceComponent.
 *
 * This component is exported as "Radio" for backwards compatibility with existing content,
 * though it supports both radio-button (single select) and checkbox (multiple select) modes.
 * Eventually, when Content Backfills are set up, we will officially rename the Radio Widget to MultipleChoiceWidget.
 *
 * Created as part of the Radio Revitalization Project (LEMS-2933).
 */
const MultipleChoiceWidget = forwardRef<Widget, Props>(
    function MultipleChoiceWidget(props, ref) {
        const {
            choices = [],
            multipleSelect = false,
            countChoices = false,
            showSolutions = "none",
            choiceStates,
            reviewModeRubric,
            questionCompleted,
            static: isStatic,
            apiOptions,
            onChange,
            trackInteraction,
            findWidgets,
            reviewMode,
        } = props;

        const {strings} = usePerseusI18n();

        // Perseus Widget API methods
        // TODO(LEMS-2994): When we remove the old Radio files, we may need to move some
        // of the methods from radio.ff.tsx into here, such as getSerializedState, etc.
        useImperativeHandle(
            ref,
            () => ({
                /**
                 * Gets the JSON representation of the User Input for AI assistance.
                 *
                 * This function is used to provide structured data about the widget's state
                 * to AI systems that can help users with answering questions.
                 *
                 * @returns A structured JSON object representing the widget's prompt
                 */
                getPromptJSON: (): RadioPromptJSON => {
                    return _getPromptJSON(props, props.userInput);
                },
            }),
            [props],
        );

        /**
         * Renders content that may contain nested widgets (currently only passage-refs).
         * Parses the content, extracts any widgets, and returns a Renderer component
         * configured with the appropriate context.
         *
         * @param content - The content to render (defaults to empty string)
         * @returns A React element with the rendered content
         */
        const renderContent = (content = ""): React.ReactNode => {
            const {parsedContent, extractedWidgets} =
                parseNestedWidgets(content);

            // This has been called out as a hack in the past.
            // We pass in a key here so that we avoid a semi-spurious
            // react warning when the ChoiceNoneAbove renders a
            // different renderer in the same place. Note this destroys
            // state, but since all we're doing is outputting
            // "None of the above", that is okay. Widgets inside this Renderer
            // are not discoverable through the parent Renderer's `findWidgets` function.
            // alwaysUpdate={true} so that passage-refs findWidgets
            // get called when the outer passage updates the renderer
            const linterContext: LinterContextProps = {
                contentType: "radio",
                highlightLint: false,
                paths: [],
                stack: [],
            };

            return (
                <Renderer
                    key="choiceContentRenderer"
                    content={parsedContent}
                    widgets={extractedWidgets}
                    findExternalWidgets={findWidgets}
                    alwaysUpdate={true}
                    linterContext={linterContext}
                    strings={strings}
                />
            );
        };

        /**
         * Handles a user's selection of a choice.
         *
         * Updates choice states based on the selection, handles single/multiple
         * selection logic, and notifies Perseus of the interaction.
         *
         * @param choiceIndex - The index of the choice that changed
         * @param newCheckedState - Whether the choice is now selected
         */
        const handleChoiceChange = (
            choiceId: string,
            newCheckedState: boolean,
        ): void => {
            const checkedChoiceIds: string[] = [];

            if (newCheckedState && !multipleSelect) {
                checkedChoiceIds.push(choiceId);
            } else if (newCheckedState && multipleSelect) {
                // Multi-select mode + checking: add to existing
                const currentSelectedIds = choiceStates
                    ? choiceStates
                          .map((state, i) => ({
                              selected: state.selected,
                              id: choices[i].id,
                          }))
                          .filter((choice) => choice.selected)
                          .map((choice) => choice.id)
                    : [];
                checkedChoiceIds.push(...currentSelectedIds, choiceId);
            } else {
                // Unchecking: remove this choice from checked list
                const currentSelectedIds = choiceStates
                    ? choiceStates
                          .map((state, i) => ({
                              selected: state.selected,
                              id: choices[i].id,
                          }))
                          .filter(
                              (choice) =>
                                  choice.selected && choice.id !== choiceId,
                          )
                          .map((choice) => choice.id)
                    : [];
                checkedChoiceIds.push(...currentSelectedIds);
            }

            // Construct the baseline `choiceStates` objects. If this is the user's
            // first interaction with the widget, we'll need to initialize them to
            // new objects with all fields set to the default values. Otherwise, we
            // should clone the old `choiceStates` objects, in preparation to
            // mutate them.
            const newChoiceStates = choiceStates
                ? choiceStates.map((state) => ({...state}))
                : choices.map(() => ({
                      selected: false,
                      // TODO(third): Remove this field when we remove the old Radio files (LEMS-2994)
                      highlighted: false,
                      rationaleShown: false,
                      correctnessShown: false,
                      previouslyAnswered: false,
                      readOnly: false,
                  }));

            // Mutate the new `choiceState` objects, according to the checkedChoiceIds.
            newChoiceStates.forEach((choiceState: ChoiceState, i) => {
                const choiceId = choices[i].id;
                choiceState.selected = checkedChoiceIds.includes(choiceId);
            });

            onChange({choiceStates: newChoiceStates});
            trackInteraction();
        };

        /**
         * Transforms choice states into component-ready props for the MultipleChoiceComponent.
         *
         * This function:
         * 1. Processes each choice's content
         * 2. Maps state properties (selected, rationaleShown, etc.) to component props
         * 3. Renders content and rationales with nested widget support
         * 4. Determines correctness display based on choice data or review rubric
         *
         * @param choiceStates - The current state of each choice
         * @returns An array of formatted choice props ready for the MultipleChoiceComponent
         */
        const buildChoiceProps = (
            choiceStates: ReadonlyArray<ChoiceState>,
        ): ReadonlyArray<ChoiceType> => {
            return choices.map((choice, i) => {
                // Get the content for the choice, which is either the content of the choice
                // or the string "None of the above" if the choice is none of the above.
                const content =
                    choice.isNoneOfTheAbove && !choice.content
                        ? strings.noneOfTheAbove
                        : choice.content;

                // Extract the choice state for the choice.
                const {
                    selected,
                    rationaleShown,
                    correctnessShown,
                    readOnly,
                    previouslyAnswered,
                } = choiceStates[i];

                // Get the reviewChoice from the rubric, if it exists.
                const reviewChoice = reviewModeRubric?.choices[i];

                return {
                    id: choice.id,
                    content: renderContent(content),
                    checked: selected,
                    correct:
                        choice.correct === undefined
                            ? !!reviewChoice && !!reviewChoice.correct
                            : choice.correct,
                    disabled: readOnly,
                    hasRationale: !!choice.rationale,
                    rationale: renderContent(choice.rationale),
                    showRationale: rationaleShown,
                    showCorrectness: correctnessShown,
                    isNoneOfTheAbove: !!choice.isNoneOfTheAbove,
                    revealNoneOfTheAbove: !!(questionCompleted && selected),
                    previouslyAnswered,
                };
            });
        };

        /**
         * Prepares the choice props for rendering in the MultipleChoiceComponent.
         *
         * This function:
         * 1. Uses getChoiceStates() to determine the appropriate state for each choice
         *    based on widget mode (review/static) and user selections
         * 2. Transforms these states into component props via buildChoiceProps(),
         *    including rendered content, correctness indicators, and rationales
         *
         * @returns An array of choice props ready for the component
         */
        const prepareChoicesProps = () => {
            // Get the updated choice states based on the current props
            const processedChoiceStates = getChoiceStates({
                choices,
                isStatic,
                showSolutions,
                choiceStates,
            });

            // Build the choice props from the updated choice states
            return buildChoiceProps(processedChoiceStates);
        };

        const choicesProps = prepareChoicesProps();
        const numCorrect = props.numCorrect;

        // This is strange, but currently we're showing the same view for both
        // reviewMode, isStatic, and showSolutions === "all". We may wish to
        // differentiate between the two in the future, depending on the outcomes
        // of the Perseus GUTC project.
        const isReviewMode = reviewMode || isStatic || showSolutions === "all";

        const onChoiceChange =
            apiOptions.readOnly || isReviewMode ? () => {} : handleChoiceChange;

        return (
            <MultipleChoiceComponent
                reviewMode={isReviewMode}
                multipleSelect={multipleSelect}
                countChoices={countChoices}
                numCorrect={numCorrect}
                choices={choicesProps}
                onChoiceChange={onChoiceChange}
            />
        );
    },
);

// Export as Radio for backwards compatibility until we can
// perform Content Backfills to officially rename the Radio Widget
const Radio = MultipleChoiceWidget;
export default Radio;
