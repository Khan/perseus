import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

import MultipleChoiceComponent from "./multiple-choice-component.new";
import {getChoiceStates, parseNestedWidgets} from "./utils/general-utils";

import type {ChoiceType} from "./multiple-choice-component.new";
import type {PerseusStrings} from "../../strings";
import type {WidgetProps, ChoiceState, Widget} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import type {
    PerseusRadioChoice,
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

// RenderProps is the return type for radio.jsx#transform
export type RenderProps = {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    selectedChoices: ReadonlyArray<PerseusRadioChoice["correct"]>;
    choiceStates?: ReadonlyArray<ChoiceState>;
    // Depreciated; support for legacy way of handling changes
    // Adds proptype for prop that is used but was lacking type
    values?: ReadonlyArray<boolean>;
    strings?: PerseusStrings;
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

type Props = WidgetProps<
    RenderProps,
    PerseusRadioUserInput,
    PerseusRadioRubric
>;

type DefaultProps = Required<
    Pick<
        Props,
        | "choices"
        | "multipleSelect"
        | "countChoices"
        | "deselectEnabled"
        | "linterContext"
        | "showSolutions"
    >
>;

/**
 * MultipleChoiceWidget implements the Widget interface for multiple choice questions.
 *
 * It handles Perseus-specific logic and state management while delegating
 * UI rendering to the MultipleChoiceComponent.
 *
 * This class is exported as "Radio" for backwards compatibility with existing content,
 * though it supports both radio-button (single select) and checkbox (multiple select) modes.
 * Eventually, when Content Backfills are set up, we will officially rename the Radio Widget to MultipleChoiceWidget.
 *
 * Created as part of the Radio Revitalization Project (LEMS-2933).
 */
class MultipleChoiceWidget extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        choices: [],
        multipleSelect: false,
        countChoices: false,
        deselectEnabled: false,
        linterContext: linterContextDefault,
        showSolutions: "none",
    };

    /**
     * Extracts the user input from the widget props.
     *
     * This method converts the widget's current state (either choiceStates or values)
     * into the standardized user input format expected by Perseus.
     *
     * @param props - The current props of the widget
     * @param unshuffle - Whether to unshuffle the choices (default: true)
     * @returns The user's input in the form {choicesSelected: [boolean]}
     */
    static getUserInputFromProps(
        props: Props,
        unshuffle: boolean = true,
    ): PerseusRadioUserInput {
        // Return checked inputs in the form {choicesSelected: [bool]}. (Dear
        // future timeline implementers: this used to be {value: i} before
        // multiple select was added)
        if (props.choiceStates) {
            const choiceStates = props.choiceStates;
            const choicesSelected = choiceStates.map(() => false);

            for (let i = 0; i < choicesSelected.length; i++) {
                const index = unshuffle ? props.choices[i].originalIndex : i;

                choicesSelected[index] = choiceStates[i].selected;
            }

            return {
                choicesSelected,
            };
        }

        // Support legacy choiceState implementation
        const {values} = props;
        if (values) {
            const choicesSelected = [...values];
            const valuesLength = values.length;

            for (let i = 0; i < valuesLength; i++) {
                const index = unshuffle ? props.choices[i].originalIndex : i;
                choicesSelected[index] = values[i];
            }
            return {
                choicesSelected,
            };
        }

        // Nothing checked
        return {
            choicesSelected: props.choices.map(() => false),
        };
    }

    /**
     * Gets the current user input from this widget.
     *
     * Implements the required Widget interface method that Perseus uses
     * to retrieve the user's current selections.
     *
     * @returns The user's selections as {choicesSelected: [boolean]}
     */
    getUserInput(): PerseusRadioUserInput {
        return MultipleChoiceWidget.getUserInputFromProps(this.props);
    }

    /**
     * Gets the JSON representation of the User Input for AI assistance.
     *
     * This method is used to provide structured data about the widget's state
     * to AI systems that can help users with answering questions.
     *
     * @returns A structured JSON object representing the widget's prompt
     */
    getPromptJSON(): RadioPromptJSON {
        const userInput = MultipleChoiceWidget.getUserInputFromProps(
            this.props,
            false,
        );
        return _getPromptJSON(this.props, userInput);
    }

    /**
     * Renders content that may contain nested widgets (currently only passage-refs).
     * Parses the content, extracts any widgets, and returns a Renderer component
     * configured with the appropriate context.
     *
     * @param content - The content to render (defaults to empty string)
     * @returns A React element with the rendered content
     */
    renderContent = (content = ""): React.ReactNode => {
        const {parsedContent, extractedWidgets} = parseNestedWidgets(content);
        const {strings = mockStrings, findWidgets} = this.props;

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
    handleChoiceChange = (
        choiceIndex: number,
        newCheckedState: boolean,
    ): void => {
        const {
            choices,
            choiceStates,
            multipleSelect = false,
            onChange,
            trackInteraction,
        } = this.props;

        // Get the baseline `checked` values from choiceStates
        // If we're checking a new answer and multiple-select is not on,
        // we should clear all choices to be unchecked.
        // Otherwise, we should copy the old checked values.
        let newCheckedList;
        if (newCheckedState && !multipleSelect) {
            newCheckedList = choices.map(() => false);
        } else {
            newCheckedList = choiceStates
                ? choiceStates.map((state) => state.selected)
                : choices.map(() => false);
        }

        // Update this choice's `checked` values.
        newCheckedList[choiceIndex] = newCheckedState;

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

        // Mutate the new `choiceState` objects, according to the new checked values
        newChoiceStates.forEach((choiceState, i) => {
            choiceState.selected = newCheckedList[i];
        });

        onChange({choiceStates: newChoiceStates});
        trackInteraction();
    };

    /**
     * Transforms choice states into component-ready props for the MultipleChoiceComponent.
     *
     * This method:
     * 1. Processes each choice's content
     * 2. Maps state properties (selected, rationaleShown, etc.) to component props
     * 3. Renders content and rationales with nested widget support
     * 4. Determines correctness display based on choice data or review rubric
     *
     * @param choiceStates - The current state of each choice
     * @returns An array of formatted choice props ready for the MultipleChoiceComponent
     */
    buildChoiceProps = (
        choiceStates: ReadonlyArray<ChoiceState>,
    ): ReadonlyArray<ChoiceType> => {
        const {
            choices,
            reviewModeRubric,
            questionCompleted,
            strings = mockStrings,
        } = this.props;

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
                content: this.renderContent(content),
                checked: selected,
                correct:
                    choice.correct === undefined
                        ? !!reviewChoice && !!reviewChoice.correct
                        : choice.correct,
                disabled: readOnly,
                hasRationale: !!choice.rationale,
                rationale: this.renderContent(choice.rationale),
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
     * This method:
     * 1. Uses getChoiceStates() to determine the appropriate state for each choice
     *    based on widget mode (review/static) and user selections
     * 2. Transforms these states into component props via buildChoiceProps(),
     *    including rendered content, correctness indicators, and rationales
     *
     * @returns An array of choice props ready for the component
     */
    prepareChoicesProps = () => {
        const {choices, showSolutions, choiceStates, values} = this.props;

        // Get the updated choice states based on the current props
        const processedChoiceStates = getChoiceStates({
            choices,
            isStatic: this.props.static,
            showSolutions,
            choiceStates,
            values,
        });

        // Build the choice props from the updated choice states
        const choicesProps = this.buildChoiceProps(processedChoiceStates);

        return choicesProps;
    };

    /**
     * Renders the MultipleChoiceComponent with the current props.
     *
     * @returns The rendered React component
     */
    render(): React.ReactNode {
        const choicesProps = this.prepareChoicesProps();

        // Extract props that need to be passed to the component
        const {
            apiOptions,
            reviewModeRubric,
            reviewMode,
            editMode = false,
            multipleSelect,
            labelWrap = true,
            countChoices,
            numCorrect,
            isLastUsedWidget,
        } = this.props;

        return (
            <MultipleChoiceComponent
                apiOptions={apiOptions}
                reviewModeRubric={reviewModeRubric}
                reviewMode={reviewMode}
                editMode={editMode}
                multipleSelect={multipleSelect}
                labelWrap={labelWrap}
                countChoices={countChoices}
                numCorrect={numCorrect}
                isLastUsedWidget={isLastUsedWidget}
                choices={choicesProps}
                onChoiceChange={this.handleChoiceChange}
            />
        );
    }
}

// Export as Radio for backwards compatibility until we can
// perform Content Backfills to officially rename the Radio Widget
const Radio = MultipleChoiceWidget;
export default Radio;
