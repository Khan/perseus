import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";
import {useContext, useEffect} from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";
import Util from "../../util";
import PassageRef from "../passage-ref/passage-ref";

import BaseRadio from "./base-radio";

import type {ChoiceType} from "./base-radio";
import type {WidgetProps, ChoiceState} from "../../types";
import type {
    PerseusRadioChoice,
    ShowSolutions,
    PerseusRadioRubric,
} from "@khanacademy/perseus-core";

// RenderProps is the return type for radio.jsx#transform
export type RenderProps = {
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
};

type Props = WidgetProps<RenderProps, PerseusRadioRubric>;

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

export type RadioChoiceWithMetadata = PerseusRadioChoice & {
    originalIndex: number;
    correct?: boolean;
};

// Default props that were previously static
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
const RadioComponent = (props: Props) => {
    const {
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
    } = props;

    const context = useContext(PerseusI18nContext);
    const {strings} = context;

    useEffect(() => {
        // This is temporary to confirm that we're using the new radio component.
        // TODO(LEMS-2994): Remove this console.log
        // eslint-disable-next-line no-console
        console.log("New Radio Component");
    }, []);

    // The renderer function for content rendering, which currently
    // only supports passage-ref subwidgets.
    // TODO THIRD: This should probably be a util function
    const renderRenderer = (content = ""): React.ReactElement => {
        let nextPassageRefId = 1;
        const widgets: Record<string, any> = {};

        const modContent = content.replace(
            /\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,
            (
                match: string,
                passageNum: string,
                refNum: string,
                summaryText: string,
            ) => {
                const widgetId = "passage-ref " + nextPassageRefId;
                nextPassageRefId++;

                widgets[widgetId] = {
                    type: "passage-ref",
                    graded: false,
                    options: {
                        passageNumber: parseInt(passageNum),
                        referenceNumber: parseInt(refNum),
                        summaryText: summaryText,
                    },
                    version: PassageRef.version,
                };

                return "[[" + Util.snowman + " " + widgetId + "]]";
            },
        );

        return (
            <Renderer
                key="choiceContentRenderer"
                content={modContent}
                widgets={widgets}
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
            crossedOut: ReadonlyArray<boolean>;
        }>,
    ) => {
        const {choiceStates} = props;

        // Construct the baseline `choiceStates` objects. If this is the user's
        // first interaction with the widget, we'll need to initialize them to
        // new objects with all fields set to the default values. Otherwise, we
        // should clone the old `choiceStates` objects, in preparation to
        // mutate them.
        const newChoiceStates = choiceStates
            ? choiceStates.map((state: ChoiceState) => ({...state}))
            : choices.map(() => ({
                  selected: false,
                  crossedOut: false,
                  highlighted: false,
                  rationaleShown: false,
                  correctnessShown: false,
                  previouslyAnswered: false,
                  readOnly: false,
              }));

        // Mutate the new `choiceState` objects, according to the new `checked`
        // and `crossedOut` values provided in `newValueLists`.
        newChoiceStates.forEach((choiceState: ChoiceState, i) => {
            choiceState.selected = newValueLists.checked[i];
            choiceState.crossedOut = newValueLists.crossedOut[i];
        });

        // Call the onChange function to pass the new choice states to the renderer.
        onChange({choiceStates: newChoiceStates});

        // Track the interaction.
        trackInteraction();
    };

    const getChoiceStates = (): ReadonlyArray<ChoiceState> => {
        // The default state for a choice state object.
        const defaultState: ChoiceState = {
            selected: false,
            crossedOut: false,
            readOnly: false,
            highlighted: false,
            rationaleShown: false,
            correctnessShown: false,
            previouslyAnswered: false,
        };

        // Case 1: The widget is in either static or showSolutions mode.
        // Both cases show the correct answers and prevent user interaction.
        if (isStatic || showSolutions === "all") {
            return choices.map((choice) => ({
                ...defaultState,
                selected: !!choice.correct,
                readOnly: true,
                rationaleShown: true,
                correctnessShown: true,
            }));
        }

        // Case 2: The widget has been interacted with, but the user hasn't submitted their answer yet
        // — so we're showing the user's current choice states.
        if (props.choiceStates) {
            return props.choiceStates;
        }

        // Case 3: The widget uses the legacy values property, and the user has interacted with the widget
        // but hasn't submitted their answer yet — so we're showing the user's current choice states.
        if (props.values) {
            /* c8 ignore next - props.values is deprecated */
            return props.values.map((val) => ({
                ...defaultState,
                selected: val,
            }));
        }

        // Case 4: The widget hasn't been interacted with yet, so we're showing
        // the default choice states.
        return choices.map(() => ({...defaultState}));
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
                crossedOut,
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
                hasRationale: !!choice.clue,
                // Render the rationale for the choice, as it may contain subwidgets as well.
                rationale: renderRenderer(choice.clue),
                showRationale: rationaleShown,
                showCorrectness: correctnessShown,
                isNoneOfTheAbove: !!choice.isNoneOfTheAbove,
                revealNoneOfTheAbove: !!(questionCompleted && selected),
                crossedOut,
                highlighted,
                previouslyAnswered: previouslyAnswered,
            };
        });
    };

    const choiceStates: ReadonlyArray<ChoiceState> = getChoiceStates();
    const choicesProp = buildChoiceProps(choices, choiceStates);

    return (
        <BaseRadio
            labelWrap={true}
            multipleSelect={multipleSelect}
            countChoices={countChoices}
            numCorrect={numCorrect}
            choices={choicesProp}
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
