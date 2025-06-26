import {
    passageRefLogic,
    type PerseusPassageRefWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import PerseusMarkdown from "../../perseus-markdown";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/passage-ref/passage-ref-ai-utils";
import {isPassageWidget} from "../passage/utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {PassageRefPromptJSON} from "../../widget-ai-utils/passage-ref/passage-ref-ai-utils";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const EN_DASH = "\u2013";

type RenderProps = {
    passageNumber: PerseusPassageRefWidgetOptions["passageNumber"];
    referenceNumber: PerseusPassageRefWidgetOptions["referenceNumber"];
    summaryText: string;
};

type Props = WidgetProps<RenderProps>;

type DefaultProps = {
    passageNumber: Props["passageNumber"];
    referenceNumber: Props["referenceNumber"];
    summaryText: string;
};

type State = {
    lineRange: [number, number] | null | undefined;
    content: string | null | undefined;
};

0 as any as WidgetProps<PerseusPassageRefWidgetOptions> satisfies PropsFor<
    typeof PassageRef
>;

class PassageRef extends React.Component<Props, State> implements Widget {
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

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state: State = {
        lineRange: null,
        content: null,
    };

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

    getPromptJSON(): PassageRefPromptJSON {
        return _getPromptJSON(this.props);
    }

    _deferredUpdateRange: () => void = () => {
        _.defer(this._updateRange);
    };

    _updateRange: () => void = () => {
        const passage = this.props
            .findWidgets("passage " + this.props.passageNumber)
            .filter(isPassageWidget)[0];

        const refInfo = passage?.getReference(this.props.referenceNumber);

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
    hidden: true,
    widget: PassageRef,
    transform: (widgetOptions: PerseusPassageRefWidgetOptions) => ({
        passageNumber: widgetOptions.passageNumber,
        referenceNumber: widgetOptions.referenceNumber,
        summaryText: widgetOptions.summaryText,
    }),
    version: passageRefLogic.version,
} satisfies WidgetExports<typeof PassageRef>;
