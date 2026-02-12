import {
    type PerseusRadioRubric,
    type PerseusRadioUserInput,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";

import RadioNew from "./multiple-choice-widget";
import {choiceTransform} from "./util";

import type {RadioProps, RadioWidgetHandle} from "./multiple-choice-widget";
import type {ChoiceState, Widget, WidgetProps} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

// TODO: this should be using PerseusRadioWidgetOptions instead of RadioProps
// but the component inheritance makes this hard to change right now
type Props = WidgetProps<RadioProps, PerseusRadioUserInput, PerseusRadioRubric>;

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
 * TODO(LEMS-2994): Clean up this file. State, initChoiceStates, the
 * constructor, and UNSAFE_componentWillUpdate are all now only providing
 * static defaults that never update on user interaction.
 */
class Radio extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    radioRef = React.createRef<RadioWidgetHandle>();

    state: State = {
        choiceStates: [],
    };

    constructor(props: Props) {
        super(props);

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
            hasNoneOfTheAbove: rest.hasNoneOfTheAbove ?? false,
        };
    }

    getPromptJSON(): RadioPromptJSON {
        if (!this.radioRef.current) {
            throw new Error(
                "Radio widget is not mounted; getPromptJSON is unavailable.",
            );
        }
        return this.radioRef.current.getPromptJSON();
    }

    _mergePropsAndState(): Props & {
        numCorrect: number;
    } {
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
            numCorrect: this.props.numCorrect ?? 0,
            choices,
            choiceStates: this.state.choiceStates?.map((choiceState, index) => {
                const choice = choices[index];
                // Guard against undefined when choiceStates length exceeds choices length
                // TODO(LEMS-3861): Investigate if this code path is used and fix root cause
                const selected =
                    this.props.userInput?.selectedChoiceIds.includes(
                        choice?.id,
                    ) ?? false;
                return {
                    ...choiceState,
                    selected,
                };
            }),
        };
    }

    render(): React.ReactNode {
        const props = this._mergePropsAndState();
        return <RadioNew ref={this.radioRef} {...props} />;
    }
}

export default Radio;
