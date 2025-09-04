import {
    deepClone,
    type PerseusRadioRubric,
    type PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import RadioNew from "./multiple-choice-widget.new";
import RadioOld from "./radio-component";
import {choiceTransform, getUserInputFromSerializedState} from "./util";

import type {RenderProps} from "./radio-component";
import type {ChoiceState, WidgetProps} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

type Props = WidgetProps<
    RenderProps,
    PerseusRadioUserInput,
    PerseusRadioRubric
>;

type ChoiceStateWithoutSelected = Omit<ChoiceState, "selected">;

type State = {
    choiceStates: ChoiceStateWithoutSelected[];
};

function initChoiceStates(choices: Props["choices"]) {
    return choices.map(() => ({
        highlighted: false,
        rationaleShown: false,
        correctnessShown: false,
        previouslyAnswered: false,
        readOnly: false,
    }));
}

/**
 * This is a wrapper around the old radio widget that allows us to
 * conditionally render the new radio widget when the feature flag is on.
 *
 * This is necessary to ensure that we do not interrupt the assessment studies
 * that are currently running.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
class Radio extends RadioOld {
    ffIsOn = false;
    radioRef = React.createRef<RadioOld>();

    state: State = {
        choiceStates: [],
    };

    constructor(props: Props) {
        super(props);
        this.ffIsOn = props.apiOptions.flags?.["new-radio-widget"] ?? false;

        this.state = {
            choiceStates: initChoiceStates(props.choices),
        };
    }

    // HACK: this really should be componentDidUpdate,
    // but for some reason it's not getting called
    // and this fixes a bug in prod
    UNSAFE_componentWillUpdate(nextProps: Props) {
        if (!_.isEqual(nextProps.choices, this.props.choices)) {
            this.setState({
                choiceStates: initChoiceStates(nextProps.choices),
            });
        }
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState() {
        const {
            userInput: _,
            randomize: __,
            ...rest
        } = this._mergePropsAndState();
        return {
            ...rest,
        };
    }

    getPromptJSON(): RadioPromptJSON {
        return this.radioRef.current!.getPromptJSON();
    }

    _handleChange(arg: {choiceStates?: ChoiceState[]}) {
        const newChoiceStates = arg.choiceStates;
        if (newChoiceStates) {
            /**
             * Inside the Radio component(s) we use ChoiceState
             * which includes both UI state and UserInput state.
             * After LEMS-3208, we'd like to keep user input state in a
             * "ready to score" format and ideally we'd like to internalize
             * UI state (so Renderer doesn't manage state it doesn't need to;
             * see LEMS-3245). At the time of writing, Radio is in the middle
             * of a major refactor and SSS needs to move forward with LEMS-3208.
             *
             * This code maintains the original Radio props (ChoiceState)
             * while allowing Renderer to have UserInput in the shape it needs
             * and for this component to take over managing UI state
             * (ChoiceStateWithoutSelected). To do that we convert ChoiceState
             * into those two chunks of data.
             */
            this.setState(
                {
                    choiceStates: newChoiceStates.map((choiceState) => {
                        const {selected: _, ...rest} = choiceState;
                        return {
                            ...rest,
                        };
                    }),
                },
                () => {
                    // Restructure the data in a format that
                    // getUserInputFromSerializedState will understand
                    const props = this._mergePropsAndState();

                    // creating a shallow copy of props and cloning choiceStates
                    // to minimize the chance of mutating choiceStates
                    const mergedProps = {
                        ...props,
                        choiceStates: deepClone(props.choiceStates || []).map(
                            (choiceState, index) => {
                                return {
                                    ...choiceState,
                                    selected: newChoiceStates[index].selected,
                                };
                            },
                        ),
                    };
                    // Use getUserInputFromSerializedState to get
                    // unshuffled user input so that we can score with it
                    const unshuffledUserInput =
                        getUserInputFromSerializedState(mergedProps);
                    this.props.handleUserInput(unshuffledUserInput);
                },
            );
        } else {
            throw new Error("unhandled onChange call in Radio!");
        }
    }

    _mergePropsAndState(): Props {
        /**
         * Inside the Radio component(s) we use ChoiceState
         * which includes both UI state and UserInput state.
         * After LEMS-3208, we'd like to keep user input state in a
         * "ready to score" format and ideally we'd like to internalize
         * UI state (so Renderer doesn't manage state it doesn't need to;
         * see LEMS-3245). At the time of writing, Radio is in the middle
         * of a major refactor and SSS needs to move forward with LEMS-3208.
         *
         * This code maintains merges the multiple data sources
         * (WidgetProps, UserInput, and UI state) into a format our
         * legacy code will understand.
         */

        // randomSeed is problemNum (which changes how we shuffle between exercises)
        // and widgetIndex (which changes how we shuffle between widgets)
        const randomSeed =
            (this.props.problemNum ?? 0) + (this.props.widgetIndex ?? 0);
        const choices = [
            ...choiceTransform(
                this.props.choices,
                this.props.randomize,
                this.context.strings,
                randomSeed,
            ),
        ];

        return {
            ...this.props,
            choices,
            choiceStates: this.state.choiceStates?.map((choiceState, index) => {
                const choice = choices[index];
                const selected =
                    this.props.userInput?.selectedChoiceIds.includes(
                        choice.id,
                    ) ?? false;
                return {
                    ...choiceState,
                    selected,
                };
            }),
            onChange: (arg: any) => this._handleChange(arg),
        };
    }

    // This is a legacy method that we need to support for the old radio widget.
    // It is not present in the new radio widget.
    focus(choiceIndex?: number | null): boolean {
        if (this.radioRef.current?.focus) {
            return this.radioRef.current.focus(choiceIndex);
        }
        return false;
    }

    render(): React.ReactNode {
        const props = this._mergePropsAndState();

        // Only return the new radio widget if the feature flag is on.
        // Otherwise, return the old radio widget and pass the ref to
        // it for handling legacy focus methods.
        return this.ffIsOn ? (
            <RadioNew {...props} />
        ) : (
            <RadioOld ref={this.radioRef} {...props} />
        );
    }
}

export default Radio;
