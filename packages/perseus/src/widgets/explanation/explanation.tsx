import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {Id, View} from "@khanacademy/wonder-blocks-core";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import * as Changeable from "../../mixins/changeable";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/explanation/explanation-ai-utils";
import scoreNoop from "../__shared__/score-noop";

import styles from "./explanation.module.css";

import type {PerseusExplanationWidgetOptions} from "../../perseus-types";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {ExplanationPromptJSON} from "../../widget-ai-utils/explanation/explanation-ai-utils";
import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";

type RenderProps = PerseusExplanationWidgetOptions; // transform = _.identity

type Props = WidgetProps<RenderProps>;

type DefaultProps = {
    showPrompt: Props["showPrompt"];
    hidePrompt: Props["hidePrompt"];
    explanation: Props["explanation"];
    widgets: Props["widgets"];
    linterContext: Props["linterContext"];
};

type State = {
    expanded: boolean;
};

function mediaQueryIsMatched(mediaQuery: string): boolean {
    if (typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia(mediaQuery).matches;
}

class Explanation extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        showPrompt: "Explain",
        hidePrompt: "Hide explanation",
        explanation: "explanation goes here\n\nmore explanation",
        widgets: {},
        linterContext: linterContextDefault,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state: State = {
        expanded: false,
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

    _onClick: () => void = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
        this.props.trackInteraction();
    };

    getPromptJSON(): ExplanationPromptJSON {
        return _getPromptJSON(this.props);
    }

    render(): React.ReactNode {
        const promptText = this.state.expanded
            ? this.props.hidePrompt
            : this.props.showPrompt;

        const caretIcon = this.state.expanded ? caretUp : caretDown;

        const allowTransition =
            this._mounted &&
            mediaQueryIsMatched("(prefers-reduced-motion: no-preference)");

        const contentStyling = [
            styles.content,
            this.state.expanded
                ? styles.contentExpanded
                : styles.contentCollapsed,
            allowTransition &&
                (this.state.expanded
                    ? styles.transitionExpanded
                    : styles.transitionCollapsed),
        ];

        return (
            <Id>
                {(contentId) => (
                    <>
                        <Button
                            aria-expanded={this.state.expanded}
                            aria-controls={contentId}
                            endIcon={caretIcon}
                            kind="tertiary"
                            onClick={this._onClick}
                            size="small"
                            className={styles.buttonStyleOverrides}
                        >
                            {promptText}
                        </Button>

                        <View
                            id={contentId}
                            className={contentStyling.join(" ")}
                            aria-hidden={!this.state.expanded}
                            testId="content-container"
                        >
                            <View className={styles.contentWrapper}>
                                <Renderer
                                    apiOptions={this.props.apiOptions}
                                    content={this.props.explanation}
                                    widgets={this.props.widgets}
                                    linterContext={this.props.linterContext}
                                    strings={this.context.strings}
                                />
                            </View>
                        </View>
                    </>
                )}
            </Id>
        );
    }
}

export default {
    name: "explanation",
    displayName: "Explanation",
    accessible: true,
    defaultAlignment: "inline",
    widget: Explanation,
    transform: _.identity,
    isLintable: true,
    // TODO: things that aren't interactive shouldn't need scoring functions
    scorer: () => scoreNoop(),
} satisfies WidgetExports<typeof Explanation>;
