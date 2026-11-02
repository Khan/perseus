import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {forwardRef, useImperativeHandle, useMemo, useState} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {useDependencies} from "../../dependencies";
import MathRenderingContext from "../../math-rendering-context";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

import RadioComponent from "./radio-component";
import {choiceTransform, getChoiceLetter} from "./util";
import {getChoiceStates} from "./utils/general-utils";

import type {RadioCrossOutProps} from "./radio-component";
import type {WidgetProps, ChoiceState, Widget} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

/**
 * Represents a single choice in the RadioComponent
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
    randomize?: boolean;
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

type Props = WidgetProps<
    RadioProps,
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions
>;

/**
 * RadioWidget implements the Widget interface for multiple choice questions.
 *
 * It handles Perseus-specific logic and user state management while delegating
 * UI rendering to the RadioComponent.
 *
 * This component is exported as "Radio" for backwards compatibility with existing content,
 * though it supports both radio-button (single select) and checkbox (multiple select) modes.
 * Eventually, when Content Backfills are set up, we will officially rename the Radio Widget to RadioWidget.
 *
 * Created as part of the Radio Revitalization Project (LEMS-2933).
 */
const RadioWidget = forwardRef<RadioWidgetHandle, Props>(
    function RadioWidget(props, ref) {
        const {options} = props;
        const {multipleSelect = false, countChoices = false} = options;
        const {
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

        // This is strange, but currently we're showing the same view for both
        // reviewMode, and showSolutions === "all". We may wish to
        // differentiate between the two in the future, depending on the outcomes
        // of the Perseus GUTC project.
        const isReviewMode = reviewMode || showSolutions === "all";

        // Cross-out state is display-only. It's kept here, never in userInput,
        // so it's never part of the answer that gets scored.
        const crossOutOptions = apiOptions.crossOut;
        const crossOutEnabled = crossOutOptions?.enabled ?? false;
        const [localToggleOn, setLocalToggleOn] = useState(false);
        const crossOutToggleOn = crossOutOptions?.toggleOn ?? localToggleOn;
        const [crossedOutIds, setCrossedOutIds] = useState<
            ReadonlyArray<string>
        >([]);

        // Clear cross-outs when the host changes the reset key (on each
        // Check) and when review mode turns on. Done while rendering, rather
        // than in an effect, so a stale cross-out is never painted.
        const resetKey = crossOutOptions?.resetKey;
        const [prevResetKey, setPrevResetKey] = useState(resetKey);
        if (resetKey !== prevResetKey) {
            setPrevResetKey(resetKey);
            setCrossedOutIds([]);
        } else if (isReviewMode && crossedOutIds.length > 0) {
            setCrossedOutIds([]);
        }

        const randomSeed = (props.problemNum ?? 0) + (props.widgetIndex ?? 0);
        const choices = useMemo(() => {
            return [
                ...choiceTransform(
                    options.choices,
                    options.randomize,
                    strings,
                    randomSeed,
                ),
            ];
        }, [options.choices, options.randomize, strings, randomSeed]);

        const getLetterForChoice = (choiceId: string): string =>
            getChoiceLetter(
                choices.findIndex((choice) => choice.id === choiceId),
                strings,
            );

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
                    return _getPromptJSON(
                        {...props, options: {...props.options, choices}},
                        props.userInput,
                    );
                },
                /**
                 * @deprecated and likely very broken API
                 * [LEMS-3185] do not trust serializedState
                 */
                getSerializedState() {
                    const {
                        userInput,
                        static: _1,
                        options,
                        ...otherProps
                    } = props;
                    const {randomize, ...otherOptions} = options;
                    return {
                        ...otherOptions,
                        ...otherProps,
                        numCorrect: options.numCorrect ?? 0,
                        choices,
                        hasNoneOfTheAbove: options.hasNoneOfTheAbove ?? false,
                        choiceStates: choices.map((choice) => {
                            // TODO(LEMS-3861): Investigate if this code path is used and fix root cause
                            const selected =
                                props.userInput?.selectedChoiceIds.includes(
                                    choice?.id,
                                ) ?? false;
                            return {
                                selected,
                                // TODO (LEMS-3185): REMOVE THESE FIELDS
                                highlighted: false,
                                readOnly: false,
                                rationaleShown: false,
                                correctnessShown: false,
                                previouslyAnswered: false,
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
                        apiOptions={apiOptions}
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
            // Selecting a crossed-out choice restores it.
            const restoredChoice =
                newCheckedState && crossedOutIds.includes(choiceId);
            if (restoredChoice) {
                setCrossedOutIds(crossedOutIds.filter((id) => id !== choiceId));
            }
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
            if (restoredChoice) {
                // One message covers both changes, so nothing is announced
                // twice.
                announceMessage({
                    message: strings.choiceRestoredAndSelected({
                        letter: getLetterForChoice(choiceId),
                    }),
                });
            } else {
                announceChoiceChange(checkedChoiceIds.length);
            }
        };

        /**
         * Handles a learner crossing out a choice or restoring it.
         *
         * Crossing out a selected choice also unselects it.
         *
         * @param choiceId - The ID of the choice that changed
         * @param crossedOut - Whether the choice is now crossed out
         */
        const handleCrossOutChange = (
            choiceId: string,
            crossedOut: boolean,
        ): void => {
            const newCrossedOutIds = crossedOut
                ? [...crossedOutIds, choiceId]
                : crossedOutIds.filter((id) => id !== choiceId);
            setCrossedOutIds(newCrossedOutIds);

            const selectedChoiceIds = props.userInput?.selectedChoiceIds ?? [];
            const unselected =
                crossedOut && selectedChoiceIds.includes(choiceId);
            if (unselected) {
                handleUserInput({
                    selectedChoiceIds: selectedChoiceIds.filter(
                        (id) => id !== choiceId,
                    ),
                });
                trackInteraction();
            }

            const messageArgs = {
                letter: getLetterForChoice(choiceId),
                num: choices.length - newCrossedOutIds.length,
            };
            // One message covers the cross-out and the unselect, so nothing
            // is announced twice.
            const message = unselected
                ? strings.choiceCrossedOutAndUnselectedRemaining(messageArgs)
                : crossedOut
                  ? strings.choiceCrossedOutRemaining(messageArgs)
                  : strings.choiceRestoredRemaining(messageArgs);
            announceMessage({message});
        };

        const handleCrossOutToggleChange = (toggleOn: boolean): void => {
            setLocalToggleOn(toggleOn);
            crossOutOptions?.onToggleChange?.(toggleOn);
        };

        const announceChoiceChange = (newCheckedCount: number) => {
            let screenReaderMessage = "";

            if (!multipleSelect) {
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
            // Temporary setup to enable proper reading of multiple-select announcements
            // Waiting on WB Announcer fix (WB-2240 - https://khanacademy.atlassian.net/browse/WB-2240)
            if (multipleSelect) {
                setTimeout(() => {
                    announceMessage({message: ""});
                }, 300);
            }
        };

        /**
         * Transforms choice states into component-ready props for the RadioComponent.
         *
         * This function:
         * 1. Processes each choice's content
         * 2. Maps state properties (selected, rationaleShown, etc.) to component props
         * 3. Renders content and rationales with nested widget support
         * 4. Determines correctness display based on choice data or review rubric
         *
         * @param choiceStates - The current state of each choice
         * @returns An array of formatted choice props ready for the RadioComponent
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
         * Prepares the choice props for rendering in the RadioComponent.
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
        const numCorrect = options.numCorrect;

        const onChoiceChange =
            apiOptions.readOnly || isReviewMode ? () => {} : handleChoiceChange;

        const isRequired =
            props.isScorable &&
            !isReviewMode &&
            !props.static &&
            !apiOptions.readOnly;

        // Cross-out is hidden in review mode, and can't be changed after Check.
        const crossOut: RadioCrossOutProps | undefined =
            crossOutEnabled && !isReviewMode && !props.static
                ? {
                      toggleOn: crossOutToggleOn,
                      disabled: !!apiOptions.readOnly,
                      onToggleChange: handleCrossOutToggleChange,
                      crossedOutIds,
                      onCrossOutChange: handleCrossOutChange,
                  }
                : undefined;

        return (
            <RadioComponent
                reviewMode={isReviewMode}
                isRequired={isRequired}
                multipleSelect={multipleSelect}
                countChoices={countChoices}
                numCorrect={numCorrect}
                choices={choicesProps}
                onChoiceChange={onChoiceChange}
                crossOut={crossOut}
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
        return <RadioWidget ref={this.radioRef} {...this.props} />;
    }
}

export default Radio;
