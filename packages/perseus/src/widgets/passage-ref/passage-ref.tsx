import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import * as Changeable from "../../mixins/changeable";
import {removeDenylistProps} from "../../mixins/widget-prop-denylist";
import PerseusMarkdown from "../../perseus-markdown";

import type {PerseusPassageRefWidgetOptions} from "../../perseus-types";
import type {
    ChangeFn,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {Passage, Reference} from "../passage";
import type {LinterContextProps} from "@khanacademy/perseus-linter";

const EN_DASH = "\u2013";

type UserInput = RenderProps & {
    static: boolean | null | undefined;
    reviewModeRubric: Rubric;
    linterContext: LinterContextProps;
    isLastUsedWidget: boolean;
    alignment: string | null | undefined;
};

type RenderProps = {
    passageNumber: PerseusPassageRefWidgetOptions["passageNumber"];
    referenceNumber: PerseusPassageRefWidgetOptions["referenceNumber"];
    summaryText: PerseusPassageRefWidgetOptions["summaryText"];
};

type Rubric = PerseusPassageRefWidgetOptions;

type Props = WidgetProps<RenderProps, Rubric>;

type DefaultProps = {
    passageNumber: Props["passageNumber"];
    referenceNumber: Props["referenceNumber"];
    summaryText: Props["summaryText"];
};

type State = {
    lineRange: [number, number] | null | undefined;
    content: string | null | undefined;
};

class PassageRef extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    displayName = "PassageRef";
    // @ts-expect-error - TS2564 - Property '_isMounted' has no initializer and is not definitely assigned in the constructor.
    _isMounted: boolean;
    // @ts-expect-error - TS2564 - Property '_throttledUpdateRange' has no initializer and is not definitely assigned in the constructor.
    _throttledUpdateRange: () => void;

    static defaultProps: DefaultProps = {
        passageNumber: 1,
        referenceNumber: 1,
        summaryText: "",
    };

    state: State = {
        lineRange: null,
        content: null,
    };

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this._deferredUpdateRange();

        this._throttledUpdateRange = _.throttle(this._deferredUpdateRange, 500);
        window.addEventListener("resize", this._throttledUpdateRange);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return (
            !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState)
        );
    }

    componentDidUpdate() {
        this._deferredUpdateRange();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._throttledUpdateRange);

        this._isMounted = false;
    }

    // TODO(tamarab): getUserInput needs to be updated to only return
    // props input by the user. Currently returns all the widget's props.
    getUserInput: () => UserInput = () => {
        return removeDenylistProps(this.props);
    };

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    _deferredUpdateRange: () => void = () => {
        _.defer(this._updateRange);
    };

    _updateRange: () => void = () => {
        // Note(TB): findWidgets runs findInternal and findExternal;
        // findExternal runs findInternal for the renderers involved;
        // findInternal returns type $ReadOnlyArray<?Widget>
        const passage: Passage | null | undefined = this.props.findWidgets(
            "passage " + this.props.passageNumber,
        )[0];

        let refInfo: Reference | null | undefined = null;
        if (passage) {
            refInfo = passage.getReference(this.props.referenceNumber);
        }

        if (this._isMounted) {
            if (refInfo) {
                this.setState({
                    lineRange: [refInfo.startLine, refInfo.endLine],
                    content: refInfo.content,
                });
            } else {
                this.setState({
                    lineRange: null,
                    content: null,
                });
            }
        }
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return PassageRef.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        const {strings} = this.context;
        const lineRange = this.state.lineRange;
        let lineRangeOutput;
        if (!lineRange) {
            lineRangeOutput = strings.lineRange({
                lineRange: `?${EN_DASH}?`,
            });
        } else if (lineRange[0] === lineRange[1]) {
            lineRangeOutput = strings.lineNumber({
                lineNumber: String(lineRange[0]),
            });
        } else {
            lineRangeOutput = strings.lineRange({
                lineRange: lineRange[0] + EN_DASH + lineRange[1],
            });
        }

        let summaryOutput;
        if (this.props.summaryText) {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const summaryTree = PerseusMarkdown.parseInline(
                this.props.summaryText,
            );
            summaryOutput = (
                <span aria-hidden={true}>
                    {" "}
                    {/* curly quotes */}
                    (&ldquo;
                    {PerseusMarkdown.basicOutput(summaryTree)}
                    &rdquo;)
                </span>
            );
        } else {
            summaryOutput = null;
        }

        return (
            <span>
                {lineRangeOutput}
                {summaryOutput}
                {lineRange && (
                    <div className="perseus-sr-only">{this.state.content}</div>
                )}
            </span>
        );
    }
}

export default {
    name: "passage-ref",
    displayName: "PassageRef (SAT only)",
    defaultAlignment: "inline",
    widget: PassageRef,
    transform: (
        widgetOptions: PerseusPassageRefWidgetOptions,
    ): RenderProps => ({
        passageNumber: widgetOptions.passageNumber,
        referenceNumber: widgetOptions.referenceNumber,
        summaryText: widgetOptions.summaryText,
    }),
    version: {major: 0, minor: 1},
} as WidgetExports<typeof PassageRef>;
