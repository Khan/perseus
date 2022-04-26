/* eslint-disable react/sort-comp */
// @flow
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";
import _ from "underscore";

import * as Changeable from "../mixins/changeable.jsx";
import WidgetJsonifyDeprecated from "../mixins/widget-jsonify-deprecated.jsx";
import PerseusMarkdown from "../perseus-markdown.jsx";

import type {PerseusPassageRefWidgetOptions} from "../perseus-types.js";
import type {
    ChangeFn,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types.js";

const EN_DASH = "\u2013";

type UserInput = $FlowFixMe;

type RenderProps = {|
    passageNumber: PerseusPassageRefWidgetOptions["passageNumber"],
    referenceNumber: PerseusPassageRefWidgetOptions["referenceNumber"],
    summaryText: PerseusPassageRefWidgetOptions["summaryText"],
|};

type Rubric = PerseusPassageRefWidgetOptions;

type Props = WidgetProps<RenderProps, Rubric>;

type DefaultProps = {|
    passageNumber: Props["passageNumber"],
    referenceNumber: Props["referenceNumber"],
    summaryText: Props["summaryText"],
|};

type State = {|
    lineRange: ?[number, number],
    content: ?string,
|};

class PassageRef extends React.Component<Props, State> {
    displayName: string = "PassageRef";
    _isMounted: boolean;
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

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return (
            !_.isEqual(this.props, nextProps) ||
            !_.isEqual(this.state, nextState)
        );
    }

    getUserInput: () => UserInput = () => {
        return WidgetJsonifyDeprecated.getUserInput.call(this);
    };

    render(): React.Node {
        const lineRange = this.state.lineRange;
        let lineRangeOutput;
        if (!lineRange) {
            lineRangeOutput = i18n.$_("lines %(lineRange)s", {
                lineRange: `?${EN_DASH}?`,
            });
        } else if (lineRange[0] === lineRange[1]) {
            lineRangeOutput = i18n.$_("line %(lineNumber)s", {
                lineNumber: lineRange[0],
            });
        } else {
            lineRangeOutput = i18n.$_("lines %(lineRange)s", {
                lineRange: lineRange[0] + EN_DASH + lineRange[1],
            });
        }

        let summaryOutput;
        if (this.props.summaryText) {
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

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this._deferredUpdateRange();

        this._throttledUpdateRange = _.throttle(this._deferredUpdateRange, 500);
        window.addEventListener("resize", this._throttledUpdateRange);
    }

    componentDidUpdate() {
        this._deferredUpdateRange();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._throttledUpdateRange);

        this._isMounted = false;
    }

    _deferredUpdateRange: () => void = () => {
        _.defer(this._updateRange);
    };

    _updateRange: () => void = () => {
        const passage = this.props.findWidgets(
            "passage " + this.props.passageNumber,
        )[0];

        let refInfo = null;
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

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return PassageRef.validate(this.getUserInput(), rubric);
    };

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }
}

export default ({
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
}: WidgetExports<typeof PassageRef>);
