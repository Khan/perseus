import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import {useContext, useEffect} from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";

import BaseRadio from "./base-radio.new";
import {getChoiceStates, parseNestedWidgets} from "./utils/general-utils";

import type {ChoiceType} from "./base-radio.new";
import type {WidgetProps, ChoiceState} from "../../types";
import type {
    PerseusRadioChoice,
    ShowSolutions,
    PerseusRadioRubric,
} from "@khanacademy/perseus-core";

export interface RadioChoiceWithMetadata extends PerseusRadioChoice {
    originalIndex: number;
    correct?: boolean;
    id: string;
}

export interface RenderProps {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    selectedChoices: ReadonlyArray<PerseusRadioChoice["correct"]>;
    showSolutions?: ShowSolutions;
    choiceStates?: ReadonlyArray<ChoiceState>;
    // Depreciated; support for legacy way of handling changes
    // Adds proptype for prop that is used but was lacking type
    values?: ReadonlyArray<boolean>;
}

type RadioComponentProps = WidgetProps<RenderProps, PerseusRadioRubric>;

interface DefaultProps {
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    multipleSelect: boolean;
    countChoices: boolean;
    deselectEnabled: boolean;
    linterContext: typeof linterContextDefault;
    showSolutions: ShowSolutions;
}

const defaultProps: DefaultProps = {
    choices: [],
    multipleSelect: false,
    countChoices: false,
    deselectEnabled: false,
    linterContext: linterContextDefault,
    showSolutions: "none",
};

/**
 * This component is a duplicate of the Radio component in radio.tsx
 * for the Radio Revitalization Project. (LEMS-2933)
 * This component has been split up to move the rendering logic to a new functional component.
 * The class methods are now in radio.class.new.tsx.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
const RadioComponent = ({
    choices,
    multipleSelect = defaultProps.multipleSelect,
    countChoices = defaultProps.countChoices,
    deselectEnabled = defaultProps.deselectEnabled,
    linterContext = defaultProps.linterContext,
    showSolutions = defaultProps.showSolutions,
    static: isStatic,
    reviewModeRubric,
    reviewMode,
    apiOptions,
    isLastUsedWidget,
    questionCompleted,
    findWidgets,
    onChange,
    trackInteraction,
    numCorrect,
    choiceStates,
    values,
}: RadioComponentProps): React.ReactElement => {
    const {strings} = useContext(PerseusI18nContext);

    useEffect(() => {
        // This is temporary to confirm that we're using the new radio component.
        // TODO(LEMS-2994): Remove this console.log
        // eslint-disable-next-line no-console
        console.log("New Radio Component");
    }, []);

    // The renderer function for content rendering, which currently
    // only supports passage-ref subwidgets.
    const renderRenderer = (content = ""): React.ReactElement => {
        const {parsedContent, extractedWidgets} = parseNestedWidgets(content);

        // This has been called out as a hack in the past.
        // We pass in a key here so that we avoid a semi-spurious
        // react warning when the ChoiceNoneAbove renders a
        // different renderer in the same place. Note this destroys
        // state, but since all we're doing is outputting
        // "None of the above", that is okay. Widgets inside this Renderer
        // are not discoverable through the parent Renderer's `findWidgets` function.
        // alwaysUpdate={true} so that passage-refs findWidgets
        // get called when the outer passage updates the renderer
        return (
            <Renderer
                key="choiceContentRenderer"
                content={parsedContent}
                widgets={extractedWidgets}
                findExternalWidgets={findWidgets}
                alwaysUpdate={true}
                linterContext={{
                    ...linterContext,
                    // @ts-expect-error - TS2322 - Type '{ blockHighlight: true; contentType: string; highlightLint: boolean; paths: readonly string[]; stack: readonly string[]; }' is not assignable to type 'LinterContextProps'.
                    blockHighlight: true,
                }}
                strings={strings}
            />
        );
    };

    /* Update the choice states for the widget upon user interaction.
    This function is called by the BaseRadio component when the user selects
    or deselects a choice.
    */
    const updateChoices = (
        newValueLists: Readonly<{
            checked: ReadonlyArray<boolean>;
        }>,
    ) => {
        // Construct the baseline `choiceStates` objects. If this is the user's
        // first interaction with the widget, we'll need to initialize them to
        // new objects with all fields set to the default values. Otherwise, we
        // should clone the old `choiceStates` objects, in preparation to
        // mutate them.
        const newChoiceStates = choiceStates
            ? choiceStates.map((state: ChoiceState) => ({...state}))
            : choices.map(() => ({
                  selected: false,
                  highlighted: false,
                  rationaleShown: false,
                  correctnessShown: false,
                  previouslyAnswered: false,
                  readOnly: false,
              }));

        // Mutate the new `choiceState` objects, according to the new `checked`
        // value provided in `newValueLists`.
        newChoiceStates.forEach((choiceState: ChoiceState, i) => {
            choiceState.selected = newValueLists.checked[i];
        });

        // Call the onChange function to pass the new choice states to the renderer.
        onChange({choiceStates: newChoiceStates});

        // Track the interaction.
        trackInteraction();
    };

    const buildChoiceProps = (
        choices: readonly RadioChoiceWithMetadata[],
        choiceStates: ReadonlyArray<ChoiceState>,
    ): ReadonlyArray<ChoiceType> => {
        // Map over the choices and build the choice props.
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
                highlighted,
                previouslyAnswered,
            } = choiceStates[i];

            // Get the reviewChoice from the rubric, if it exists.
            const reviewChoice = reviewModeRubric?.choices[i];

            return {
                // Render the content of the choice, as it may contain subwidgets such as
                // {{passage-ref}}s.
                content: renderRenderer(content),
                checked: selected,
                // If the choice is correct, check if the reviewChoice is correct.
                correct:
                    choice.correct === undefined
                        ? !!reviewChoice && !!reviewChoice.correct
                        : choice.correct,
                disabled: readOnly,
                hasRationale: !!choice.rationale,
                // Render the rationale for the choice, as it may contain subwidgets as well.
                rationale: renderRenderer(choice.rationale),
                showRationale: rationaleShown,
                showCorrectness: correctnessShown,
                isNoneOfTheAbove: !!choice.isNoneOfTheAbove,
                revealNoneOfTheAbove: !!(questionCompleted && selected),
                highlighted,
                previouslyAnswered,
                id: choice.id || `radio-choice-${i + 1}`,
            };
        });
    };

    const updatedChoiceStates: ReadonlyArray<ChoiceState> = getChoiceStates({
        choices,
        isStatic,
        showSolutions,
        choiceStates,
        values,
    });
    const updatedChoicesProp = buildChoiceProps(choices, updatedChoiceStates);

    return (
        <BaseRadio
            labelWrap={true}
            multipleSelect={multipleSelect}
            countChoices={countChoices}
            numCorrect={numCorrect}
            choices={updatedChoicesProp}
            onChange={updateChoices}
            reviewModeRubric={reviewModeRubric}
            reviewMode={reviewMode}
            deselectEnabled={deselectEnabled}
            apiOptions={apiOptions}
            isLastUsedWidget={isLastUsedWidget}
        />
    );
};

export default RadioComponent;
