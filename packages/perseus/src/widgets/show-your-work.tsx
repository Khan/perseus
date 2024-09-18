/* eslint-disable no-console */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {checkStep} from "@math-blocks/tutor";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import * as Changeable from "../mixins/changeable";

import {assertUnreachable} from "./show-your-work/assert-unreachable";
import {parse} from "./show-your-work/parser";
import {ShowYourWork} from "./show-your-work/show-your-work";

import type {State, Action} from "./show-your-work/reducer";
import type {PerseusShowYourWorkWidgetOptions} from "../perseus-types";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types";

type RenderProps = PerseusShowYourWorkWidgetOptions; // transform = _.identity

type Rubric = PerseusShowYourWorkWidgetOptions;

type Props = WidgetProps<RenderProps, PerseusShowYourWorkWidgetOptions>;

type DefaultProps = {
    linterContext: Props["linterContext"];
};

class ShowYourWorkWidget extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    _mounted: boolean = false;
    _stateRef = React.createRef<[State, React.Dispatch<Action>]>();

    static validate(
        userInput: [State, React.Dispatch<Action>] | null,
        rubric: Rubric,
    ): PerseusScore {
        // TODO: handle the case where the user submits their steps without
        // getting to the answer.

        if (userInput == null) {
            throw new Error("This should never happen");
        }

        const [state, dispatch] = userInput;

        dispatch({kind: "Checkall"}); // updates the UI

        switch (state.mode) {
            case "Assessment": {
                const {steps} = state;

                let correct = 0;
                let total = 0;

                for (let i = 0; i < steps.length - 1; i++) {
                    const prev = parse(steps[i].value);
                    const next = parse(steps[i + 1].value);
                    const {result, mistakes: _} = checkStep(prev, next);
                    total = total + 1;
                    if (result) {
                        correct = correct + 1;
                        console.log("right");
                    } else {
                        // TODO: perform fallback check to handle cases where
                        // the user submitted a correct step that we just aren't
                        // able to recognize yet.
                        console.log("wrong");
                    }
                }

                // NOTE: This can be gamed by adding a buch of trivial steps that
                // are correct.
                return {
                    type: "points",
                    earned: correct,
                    total: total,
                    message: null,
                };
            }
            case "Practice": {
                console.log(
                    "TODO: determine how much Khanmigo helped the student",
                );

                return {
                    type: "points",
                    earned: 0,
                    total: 0,
                    message: null,
                };
            }
            default: {
                assertUnreachable(state.mode);
            }
        }
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getUserInput: () => [State, React.Dispatch<Action>] | null = () => {
        return this._stateRef.current;
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return ShowYourWorkWidget.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        return (
            <ShowYourWork problem={this.props.problem} ref={this._stateRef} />
        );
    }
}

export default {
    name: "show-your-work",
    displayName: "ShowYourWork",
    accessible: true,
    defaultAlignment: "inline",
    widget: ShowYourWorkWidget,
    transform: _.identity,
    isLintable: true,
} as WidgetExports<typeof ShowYourWorkWidget>;
