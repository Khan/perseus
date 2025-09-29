import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";
import Util from "../../util";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import PassageRef from "../passage-ref/passage-ref";

import BaseRadio from "./base-radio";

import type {FocusFunction, ChoiceType} from "./base-radio";
import type {
    WidgetProps,
    ChoiceState,
    Widget,
    ChangeHandler,
} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import type {
    PerseusRadioChoice,
    ShowSolutions,
    PerseusRadioRubric,
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions,
} from "@khanacademy/perseus-core";

export type RadioProps = PerseusRadioWidgetOptions & {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: RadioChoiceWithMetadata[];
    showSolutions?: ShowSolutions;
    choiceStates?: ChoiceState[];
    // TODO: https://khanacademy.atlassian.net/browse/LEMS-3542
    // remove onChange from Radio
    onChange: ChangeHandler;
};

export type Props = WidgetProps<
    RadioProps,
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

export type RadioChoiceWithMetadata = PerseusRadioChoice & {
    originalIndex: number;
    correct?: boolean;
};

class Radio extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // @ts-expect-error - TS2564 - Property 'focusFunction' has no initializer and is not definitely assigned in the constructor.
    focusFunction: FocusFunction;

    static defaultProps: DefaultProps = {
        choices: [],
        multipleSelect: false,
        countChoices: false,
        deselectEnabled: false,
        linterContext: linterContextDefault,
        showSolutions: "none",
    };

    _renderRenderer: (content?: string) => React.ReactElement = (
        content = "",
    ) => {
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

        // alwaysUpdate={true} so that passage-refs findWidgets
        // get called when the outer passage updates the renderer
        // TODO(aria): This is really hacky
        // We pass in a key here so that we avoid a semi-spurious
        // react warning when the ChoiceNoneAbove renders a
        // different renderer in the same place. Note this destroys
        // state, but since all we're doing is outputting
        // "None of the above", that is okay.
        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <Renderer
                key="choiceContentRenderer"
                content={modContent}
                widgets={widgets}
                findExternalWidgets={this.props.findWidgets}
                alwaysUpdate={true}
                linterContext={{
                    ...this.props.linterContext,
                    // @ts-expect-error - TS2322 - Type '{ blockHighlight: true; contentType: string; highlightLint: boolean; paths: readonly string[]; stack: readonly string[]; }' is not assignable to type 'LinterContextProps'.
                    blockHighlight: true,
                }}
                strings={this.context.strings}
            />
        );
    };

    // TODO(LP-10672): I think this might be unused right now. I can't find anywhere
    // that we pass a value to `.focus()` and it seems to have been used for
    // adding hints when editing.
    // See: https://github.com/Khan/perseus/blame/e18582b4b69959270b90e237ef1813899711ddfa/src/widgets/radio.js#L169
    focus(choiceIndex?: number | null): boolean {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this.focusFunction) {
            return this.focusFunction(choiceIndex);
        }

        return false;
    }

    // lets BaseRadio register a focus callback so widget
    // can focus an individual choice
    registerFocusFunction(fun: FocusFunction): void {
        this.focusFunction = fun;
    }

    // When `BaseRadio`'s `onChange` handler is called, indicating a change in
    // our choices' state, we need to call our `onChange` handler in order to
    // persist those changes in the item's Perseus state.
    //
    // So, given the new values for each choice, construct the new
    // `choiceStates` objects, and pass them to `this.props.onChange`.
    //
    // NOTE(mdr): This method expects to be auto-bound. If this component is
    //     converted to an ES6 class, take care to auto-bind this method!
    updateChoices: (checkedChoiceIds: ReadonlyArray<string>) => void = (
        checkedChoiceIds,
    ) => {
        const {choiceStates, choices} = this.props;

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

        // Mutate the new `choiceState` objects, according to the checkedChoiceIds.
        newChoiceStates.forEach((choiceState: ChoiceState, i) => {
            const choiceId = choices[i].id;
            choiceState.selected = checkedChoiceIds.includes(choiceId);
        });

        this.props.onChange({choiceStates: newChoiceStates});
        this.props.trackInteraction();
    };

    getPromptJSON(): RadioPromptJSON {
        return _getPromptJSON(this.props, this.props.userInput);
    }

    render(): React.ReactNode {
        const {choices} = this.props;
        const {strings} = this.context;
        let choiceStates: ReadonlyArray<ChoiceState>;
        if (this.props.static) {
            choiceStates = choices.map((choice) => ({
                selected: !!choice.correct,
                crossedOut: false,
                readOnly: true,
                highlighted: false,
                rationaleShown: true,
                correctnessShown: true,
                previouslyAnswered: false,
            }));
        } else if (this.props.showSolutions === "all") {
            choiceStates = choices.map(({correct}) => ({
                selected: !!correct, // to draw the eye to the correct answer
                crossedOut: false,
                readOnly: true,
                highlighted: false, // has no effect in this mode
                rationaleShown: true,
                correctnessShown: true,
                previouslyAnswered: false,
            }));
        } else if (this.props.choiceStates) {
            choiceStates = this.props.choiceStates;
        } else {
            choiceStates = choices.map(() => ({
                selected: false,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                previouslyAnswered: false,
            }));
        }

        const choicesProp: ReadonlyArray<ChoiceType> = choices.map(
            (choice, i) => {
                const content =
                    choice.isNoneOfTheAbove && !choice.content
                        ? strings.noneOfTheAbove
                        : choice.content;

                const {
                    selected,
                    rationaleShown,
                    correctnessShown,
                    readOnly,
                    highlighted,
                    previouslyAnswered,
                } = choiceStates[i];

                return {
                    id: choice.id,
                    content: this._renderRenderer(content),
                    checked: selected,
                    correct: !!choice.correct,
                    disabled: readOnly,
                    hasRationale: !!choice.rationale,
                    rationale: this._renderRenderer(choice.rationale),
                    showRationale: rationaleShown,
                    showCorrectness: correctnessShown,
                    isNoneOfTheAbove: !!choice.isNoneOfTheAbove,
                    revealNoneOfTheAbove: !!(
                        this.props.questionCompleted && selected
                    ),
                    highlighted,
                    previouslyAnswered: previouslyAnswered,
                };
            },
        );

        return (
            <BaseRadio
                labelWrap={true}
                multipleSelect={this.props.multipleSelect}
                countChoices={this.props.countChoices}
                numCorrect={this.props.numCorrect}
                choices={choicesProp}
                onChange={this.updateChoices}
                reviewMode={this.props.reviewMode}
                deselectEnabled={this.props.deselectEnabled}
                apiOptions={this.props.apiOptions}
                isLastUsedWidget={this.props.isLastUsedWidget}
                registerFocusFunction={(i) => this.registerFocusFunction(i)}
            />
        );
    }
}

export default Radio;
