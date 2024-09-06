/* eslint-disable no-console */
import {KeypadType} from "@khanacademy/math-input";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {checkStep} from "@math-blocks/tutor";
import correctIcon from "@phosphor-icons/core/bold/check-bold.svg";
import incorrectIcon from "@phosphor-icons/core/bold/x-bold.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import * as Changeable from "../mixins/changeable";

import expression from "./expression";
import {parse} from "./show-your-work/parser";

type PhosphorBold = string & {weight: "PhosphorBold"};

import type {
    PerseusShowYourWorkWidgetOptions,
    PerseusExpressionWidgetOptions,
} from "../perseus-types";
import type {
    PerseusScore,
    WidgetExports,
    WidgetProps,
    FilterCriterion,
    APIOptionsWithDefaults,
} from "../types";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type RenderProps = PerseusShowYourWorkWidgetOptions; // transform = _.identity

type Rubric = PerseusShowYourWorkWidgetOptions;

type UserInput = Empty;

const ExpressionWidget = expression.widget;

type StepStatus = "correct" | "incorrect" | "waiting";

type Step = {
    value: string;
    status: StepStatus;
};

type StepProps = {
    apiOptions: APIOptionsWithDefaults;
    rubric: PerseusExpressionWidgetOptions;
    linterContext: LinterContextProps;

    step: Step;
    isLast: boolean;
    disableCheck: boolean;
    onChange: (step: Step) => void;
    onCheckStep: () => void;
    onDeleteStep: () => void;
};

const Step = (props: StepProps) => {
    const {step} = props;

    // TODO: memoize the callbacks
    const expression = (
        <ExpressionWidget
            // common widget props
            widgetId="expression 1"
            alignment={undefined}
            static={true}
            apiOptions={props.apiOptions}
            onFocus={() => {}}
            onBlur={() => {}}
            findWidgets={(arg1: FilterCriterion) => []}
            reviewModeRubric={props.rubric}
            onChange={(arg1, arg2, arg3) =>
                props.onChange({...step, value: arg1.value})
            }
            trackInteraction={(extraData) => {}}
            linterContext={props.linterContext}
            containerSizeClass="large"
            isLastUsedWidget={false}
            problemNum={1}
            // render props
            times={false}
            buttonSets={["basic"]}
            functions={[]}
            disabled={!props.isLast}
            visibleLabel=""
            ariaLabel=""
            keypadConfiguration={{keypadType: KeypadType.EXPRESSION}}
            value={step.value}
            // extension
            noWrapper={true}
            dontSimplifyFractions={true}
        />
    );

    let icon: PhosphorBold | null = null;
    if (step.status === "correct") {
        icon = correctIcon;
    } else if (step.status === "incorrect") {
        icon = incorrectIcon;
    }

    return (
        <View style={styles.stepContainer}>
            {expression}
            {icon && <PhosphorIcon icon={icon} style={styles.icon} />}
            {props.isLast && (
                <>
                    <Strut size={16} />
                    <Button
                        size="small"
                        onClick={props.onCheckStep}
                        disabled={props.disableCheck}
                    >
                        Check Step
                    </Button>
                    <Strut size={8} />
                    <Button
                        size="small"
                        kind="secondary"
                        onClick={props.onDeleteStep}
                    >
                        Delete
                    </Button>
                </>
            )}
        </View>
    );
};

type Props = WidgetProps<RenderProps, PerseusShowYourWorkWidgetOptions>;

type DefaultProps = {
    linterContext: Props["linterContext"];
};

type State = {
    steps: Array<Step>;
};

class ShowYourWork extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    state: State = {
        steps: [
            {value: "2x+5=10", status: "correct"},
            {value: "2x+5=10", status: "waiting"},
        ],
    };
    _mounted: boolean = false;

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
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

    getUserInput: () => Empty = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return ShowYourWork.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        const widgetOptions: PerseusExpressionWidgetOptions = {
            answerForms: [],
            times: false,
            buttonSets: ["basic"],
            functions: [],
            buttonsVisible: "always",
        };
        const rubric = widgetOptions;
        const {steps} = this.state;

        return (
            <View style={styles.contentWrapper}>
                {steps.map((step, i) => {
                    const isLast = i === steps.length - 1;
                    const disableCheck =
                        isLast &&
                        (steps[steps.length - 2].value ===
                            steps[steps.length - 1].value ||
                            steps[steps.length - 1].status === "incorrect");

                    // TODO: if the current step is exactly the same as the previous step
                    // we need to disable the "Check" button
                    return (
                        <Step
                            key={i}
                            apiOptions={this.props.apiOptions}
                            linterContext={this.props.linterContext}
                            rubric={rubric}
                            step={step}
                            onChange={(step) => {
                                if (isLast) {
                                    const newSteps = [...steps];
                                    newSteps[newSteps.length - 1] = {
                                        value: step.value,
                                        status: "waiting",
                                    };
                                    this.setState({
                                        steps: newSteps,
                                    });
                                }
                            }}
                            disableCheck={disableCheck}
                            onCheckStep={() => {
                                if (isLast) {
                                    // Replace the current step
                                    const newSteps = [...steps];
                                    newSteps[newSteps.length - 1].status =
                                        "waiting";

                                    const prev = parse(
                                        newSteps[newSteps.length - 2].value,
                                    );
                                    const next = parse(
                                        newSteps[newSteps.length - 1].value,
                                    );

                                    const {result, mistakes: _} = checkStep(
                                        prev,
                                        next,
                                    );

                                    if (result) {
                                        newSteps[newSteps.length - 1].status =
                                            "correct";
                                        newSteps.push({
                                            value: newSteps[newSteps.length - 1]
                                                .value,
                                            status: "waiting",
                                        });
                                    } else {
                                        // It's possible for a student to make a correct step
                                        // where we aren't able to find to from their previous
                                        // step.
                                        //
                                        // In that case, we need to ask the solver for help to
                                        // see if solving their next step results in the same
                                        // solution as solving their previous step.
                                        //
                                        // If those results don't match, then the student has
                                        // made a mistake.
                                        //
                                        // For now we're going to assume that this case is
                                        // incorrect even though we need to do some more work
                                        // verify that that is indeed the case.
                                        newSteps[newSteps.length - 1].status =
                                            "incorrect";
                                    }

                                    this.setState({steps: newSteps});
                                }
                            }}
                            onDeleteStep={() => console.log(`onDeleteStep`)}
                            isLast={isLast}
                        />
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentWrapper: {},
    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
    },
    icon: {
        marginLeft: 8,
        padding: 4,
    },
});

export default {
    name: "show-your-work",
    displayName: "ShowYourWork",
    accessible: true,
    defaultAlignment: "inline",
    widget: ShowYourWork,
    transform: _.identity,
    isLintable: true,
} as WidgetExports<typeof ShowYourWork>;
