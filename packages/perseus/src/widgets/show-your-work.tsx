import {linterContextDefault} from "@khanacademy/perseus-linter";
import {KeypadType} from "@khanacademy/math-input";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import * as Changeable from "../mixins/changeable";
import expression from "./expression";

import type {PerseusShowYourWorkWidgetOptions, PerseusExpressionWidgetOptions,} from "../perseus-types";
import type {PerseusScore, WidgetExports, WidgetProps, FilterCriterion, APIOptionsWithDefaults} from "../types";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

type RenderProps = PerseusShowYourWorkWidgetOptions; // transform = _.identity

type Rubric = PerseusShowYourWorkWidgetOptions;

type UserInput = Empty;

type Props = WidgetProps<RenderProps, PerseusShowYourWorkWidgetOptions>;

type DefaultProps = {
    linterContext: Props["linterContext"];
};

type State = {
    steps: Array<string>,
};

const ExpressWidget = expression.widget;

type StepProps = {
    apiOptions: APIOptionsWithDefaults,
    rubric: PerseusExpressionWidgetOptions,
    linterContext: LinterContextProps,

    initialValue: string,
    isLast: boolean,
    onCheckStep: (value: string) => void,
    onDeleteStep: () => void,
};

const Step = (props: StepProps) => {
    const valueRef = React.useRef(props.initialValue);

    // TODO: memoize the callbacks
    const expression = <ExpressWidget
        // common widget props
        widgetId="expression 1"
        alignment={undefined}
        static={undefined}
        apiOptions={props.apiOptions}
        onFocus={() => {}}
        onBlur={() => {}}
        findWidgets={(arg1: FilterCriterion) => []}
        reviewModeRubric={props.rubric}
        onChange={(arg1, arg2, arg3) => {
            valueRef.current = arg1.value;
        }}
        trackInteraction={(extraData) => {}}
        linterContext={props.linterContext}
        containerSizeClass="large"
        isLastUsedWidget={false}
        problemNum={1}

        // render props
        times={false}
        buttonSets={["basic"]}
        functions={[]}
        buttonsVisible={"always"}
        visibleLabel=""
        ariaLabel=""
        keypadConfiguration={{
            keypadType: KeypadType.EXPRESSION,
        }}
        value={props.initialValue}
    />;

    return <View style={styles.stepContainer}>
        {expression}
        {props.isLast &&
            <>
                <Strut size={16} />
                <Button size="small" onClick={() => props.onCheckStep(valueRef.current)}>
                    Check Step
                </Button>
                <Strut size={8} />
                <Button size="small" kind="secondary" onClick={props.onDeleteStep}>
                    Delete
                </Button>
            </>
            }
    </View>
}

class ShowYourWork extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        linterContext: linterContextDefault,
    };

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    state: State = {
        steps: [
            "2x+5=10",
            "2x+5=10",
        ],
    };
    _mounted: boolean = false;

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
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
                    return <Step
                        key={i}
                        apiOptions={this.props.apiOptions}
                        linterContext={this.props.linterContext}
                        rubric={rubric}
                        initialValue={step}
                        onCheckStep={(value) => {
                            if (isLast) {
                                const newSteps = steps.slice(0, -1);
                                newSteps.push(value); // replaces the current step
                                newSteps.push(value); // adds a new step
                                this.setState({steps: newSteps});
                            }
                        }}
                        onDeleteStep={() => console.log(`onDeleteStep`)}
                        isLast={isLast}
                    />;
                })}
            </View>
        );
    }

    getUserInput: () => Empty = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return ShowYourWork.validate(this.getUserInput(), rubric);
    };
}

const styles = StyleSheet.create({
    contentWrapper: {},
    stepContainer: {
        flexDirection: "row",
        alignItems: "end",
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
