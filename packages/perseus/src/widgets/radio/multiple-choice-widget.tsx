import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {forwardRef, useImperativeHandle, useMemo} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {useDependencies} from "../../dependencies";
import MathRenderingContext from "../../math-rendering-context";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

import MultipleChoiceComponent from "./multiple-choice-component";
import {choiceTransform} from "./util";
import {getChoiceStates} from "./utils/general-utils";

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
    correct: boolean;
    isNoneOfTheAbove: boolean;
}

export type RadioProps = {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: RadioChoiceWithMetadata[];
    choiceStates?: ChoiceState[];
    editMode?: boolean;
    labelWrap?: boolean;
    randomize?: boolean;
    onChoiceChange: (choiceId: string, newCheckedState: boolean) => void;
};

type RadioWidgetHandle = {
    getSerializedState(): any;
    getPromptJSON(): RadioPromptJSON;
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
const MultipleChoiceWidget = forwardRef<RadioWidgetHandle, Props>(
    function MultipleChoiceWidget(props, ref) {
        const {
            multipleSelect = false,
            countChoices = false,
            showSolutions = "none",
            apiOptions,
            handleUserInput,
            trackInteraction,
            findWidgets,
            reviewMode,
            widgetId,
        } = props;

        const {strings} = usePerseusI18n();
        const {analytics} = useDependencies();

        const randomSeed = (props.problemNum ?? 0) + (props.widgetIndex ?? 0);
        const choices = useMemo(() => {
            return [
                ...choiceTransform(
                    props.choices,
                    props.randomize,
                    strings,
                    randomSeed,
                ),
            ];
        }, [props.choices, props.randomize, strings, randomSeed]);

        useOnMountEffect(() => {
            analytics.onAnalyticsEvent({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: multipleSelect
                        ? "multiple-select"
                        : "single-select",
                    widgetType: "radio",
                    widgetId: widgetId,
                },
            });
        });

        // Perseus Widget API methods
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
                    return _getPromptJSON({...props, choices}, props.userInput);
                },
                /**
                 * @deprecated and likely very broken API
                 * [LEMS-3185] do not trust serializedState
                 */
                getSerializedState() {
                    const {
                        userInput: _,
                        randomize: __,
                        static: ___,
                        ...rest
                    } = props;
                    return {
                        ...rest,
                        numCorrect: props.numCorrect ?? 0,
                        choices,
                        hasNoneOfTheAbove: props.hasNoneOfTheAbove ?? false,
                        choiceStates: choices.map((choice) => {
                            // TODO(LEMS-3861): Investigate if this code path is used and fix root cause
                            const selected =
                                props.userInput?.selectedChoiceIds.includes(
                                    choice?.id,
                                ) ?? false;
                            return {
                                selected,
                            };
                        }),
                    };
                },
            }),
            [choices, props],
        );

        /**
         * Renders content for radio choice labels.
         * Returns a Renderer component configured with the appropriate context.
         *
         * @param content - The content to render (defaults to empty string)
         * @returns A React element with the rendered content
         */
        const renderContent = (content = ""): React.ReactNode => {
            // This has been called out as a hack in the past.
            // We pass in a key here so that we avoid a semi-spurious
            // react warning when the ChoiceNoneAbove renders a
            // different renderer in the same place. Note this destroys
            // state, but since all we're doing is outputting
            // "None of the above", that is okay. Widgets inside this Renderer
            // are not discoverable through the parent Renderer's `findWidgets` function.
            const linterContext: LinterContextProps = {
                contentType: "radio",
                highlightLint: false,
                paths: [],
                stack: [],
            };

            return (
                // Using MathRenderingContext.Provider to ensure that any math
                // within the choice content is readable by screen readers (via aria-label).
                // See comments in math-rendering-context.tsx for more details.
                <MathRenderingContext.Provider
                    value={{shouldAddAriaLabels: true}}
                >
                    <Renderer
                        key="choiceContentRenderer"
                        content={content}
                        findExternalWidgets={findWidgets}
                        alwaysUpdate={true}
                        linterContext={linterContext}
                        strings={strings}
                    />
                </MathRenderingContext.Provider>
            );
        };

        /**
         * Handles a user's selection of a choice.
         *
         * Updates choice states based on the selection, handles single/multiple
         * selection logic, and notifies Perseus of the interaction.
         *
         * @param choiceId - The ID of the choice that changed
         * @param newCheckedState - Whether the choice is now selected
         */
        const handleChoiceChange = (
            choiceId: string,
            newCheckedState: boolean,
        ): void => {
            const checkedChoiceIds: string[] = [];
            const choiceStates: (ChoiceState & {id: string})[] = choices.map(
                (choice) => {
                    return {
                        selected:
                            props.userInput?.selectedChoiceIds.includes(
                                choice.id,
                            ) ?? false,
                        id: choice.id,
                    };
                },
            );
            const currentSelectedIds = choiceStates
                .filter((choice) => choice.selected)
                .map((choice) => choice.id);
            if (newCheckedState && !multipleSelect) {
                checkedChoiceIds.push(choiceId);
            } else if (newCheckedState && multipleSelect) {
                // Multi-select mode + checking: add to existing
                checkedChoiceIds.push(...currentSelectedIds, choiceId);
            } else {
                // Unchecking: remove this choice from checked list
                checkedChoiceIds.push(
                    ...currentSelectedIds.filter((id) => id !== choiceId),
                );
            }

            handleUserInput({
                selectedChoiceIds: checkedChoiceIds,
            });

            trackInteraction();
            announceChoiceChange(choiceStates);
        };

        const announceChoiceChange = (
            newCheckedState: ReadonlyArray<ChoiceState>,
        ) => {
            let screenReaderMessage = "";
            const newCheckedCount = newCheckedState.reduce(
                (count, choice) => count + (choice.selected ? 1 : 0),
                0,
            );

            if (!props.multipleSelect) {
                // Single-select choice only announces when it is de-selected
                screenReaderMessage =
                    newCheckedCount === 0 ? strings.notSelected : "";
            } else {
                // Multi-select choices have their count announced
                screenReaderMessage = strings.choicesSelected({
                    num: newCheckedCount,
                });
            }
            announceMessage({message: screenReaderMessage});
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

                // TODO(LEMS-3861): Investigate if this code path is used and fix root cause
                const {selected = false} = choiceStates[i] ?? {};

                return {
                    id: choice.id,
                    content: renderContent(content),
                    checked: selected,
                    correct: !!choice.correct,
                    hasRationale: !!choice.rationale,
                    rationale: renderContent(choice.rationale),
                    isNoneOfTheAbove: !!choice.isNoneOfTheAbove,
                };
            });
        };

        /**
         * Prepares the choice props for rendering in the MultipleChoiceComponent.
         *
         * This function:
         * 1. Uses getChoiceStates() to determine the appropriate state for each choice
         *    based on widget mode (review/showSolutions) and user selections
         * 2. Transforms these states into component props via buildChoiceProps(),
         *    including rendered content, correctness indicators, and rationales
         *
         * @returns An array of choice props ready for the component
         */
        const prepareChoicesProps = () => {
            const choiceStates: ChoiceState[] = choices.map((choice) => {
                return {
                    selected:
                        props.userInput?.selectedChoiceIds.includes(
                            choice.id,
                        ) ?? false,
                };
            });

            // Get the updated choice states based on the current props
            const processedChoiceStates = getChoiceStates({
                choices,
                showSolutions,
                choiceStates,
                reviewMode,
            });

            // Build the choice props from the updated choice states
            return buildChoiceProps(processedChoiceStates);
        };

        const choicesProps = prepareChoicesProps();
        const numCorrect = props.numCorrect;

        // This is strange, but currently we're showing the same view for both
        // reviewMode, and showSolutions === "all". We may wish to
        // differentiate between the two in the future, depending on the outcomes
        // of the Perseus GUTC project.
        const isReviewMode = reviewMode || showSolutions === "all";

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

class Radio extends React.Component<Props> implements Widget {
    radioRef = React.createRef<RadioWidgetHandle>();

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState() {
        if (!this.radioRef.current) {
            throw new Error(
                "Radio widget is not mounted; getSerializedState is unavailable.",
            );
        }
        return this.radioRef.current.getSerializedState();
    }

    getPromptJSON(): RadioPromptJSON {
        if (!this.radioRef.current) {
            throw new Error(
                "Radio widget is not mounted; getPromptJSON is unavailable.",
            );
        }
        return this.radioRef.current.getPromptJSON();
    }

    render(): React.ReactNode {
        return <MultipleChoiceWidget ref={this.radioRef} {...this.props} />;
    }
}

export default Radio;
