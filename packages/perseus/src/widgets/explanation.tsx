/* eslint-disable react/sort-comp */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {UniqueIDProvider} from "@khanacademy/wonder-blocks-core";
import caretDown from "@phosphor-icons/core/assets/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/assets/regular/caret-up.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import * as Changeable from "../mixins/changeable";
import Renderer from "../renderer";

import type {PerseusExplanationWidgetOptions} from "../perseus-types";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types";

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
type Empty = Record<never, never>;

type RenderProps = PerseusExplanationWidgetOptions; // transform = _.identity

type Rubric = PerseusExplanationWidgetOptions;

type UserInput = Empty;

type Props = WidgetProps<RenderProps, PerseusExplanationWidgetOptions>;

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

class Explanation extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        showPrompt: "Explain",
        hidePrompt: "Hide explanation",
        explanation: "explanation goes here\n\nmore explanation",
        widgets: {},
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
        expanded: false,
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    _onClick: () => void = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
        this.props.trackInteraction();
    };

    render(): React.ReactNode {
        const promptText = this.state.expanded
            ? this.props.hidePrompt
            : this.props.showPrompt;

        const caretIcon = this.state.expanded ? caretUp : caretDown;

        const allowTransition = window.matchMedia(
            "(prefers-reduced-motion: no-preference)",
        ).matches;

        // Special styling is needed to fit the button in a block of text without throwing off the line spacing.
        // While the button is not normally included in a block of text, it needs to be able to accommodate such a case.
        const buttonStyleOverrides = {
            height: "22px",
            marginLeft: "-2px",
            padding: "0 2px",
        };

        const contentStyling = css(
            styles.content,
            this.state.expanded
                ? styles.contentExpanded
                : styles.contentCollapsed,
            allowTransition &&
                (this.state.expanded
                    ? styles.transitionExpanded
                    : styles.transitionCollapsed),
        );

        const contentTestId =
            process.env.NODE_ENV === "test" ? "content-container" : null;

        return (
            <UniqueIDProvider
                mockOnFirstRender={false}
                scope="explanation-widget"
            >
                {(ids) => (
                    <>
                        <Button
                            aria-expanded={this.state.expanded}
                            aria-controls={ids.get("content")}
                            endIcon={caretIcon}
                            kind="tertiary"
                            onClick={this._onClick}
                            size="large"
                            style={buttonStyleOverrides}
                        >
                            {promptText}
                        </Button>

                        <div
                            id={ids.get("content")}
                            className={contentStyling}
                            aria-hidden={!this.state.expanded}
                            data-test-id={contentTestId}
                        >
                            <div className={css(styles.contentWrapper)}>
                                <Renderer
                                    apiOptions={this.props.apiOptions}
                                    content={this.props.explanation}
                                    widgets={this.props.widgets}
                                    linterContext={this.props.linterContext}
                                />
                            </div>
                        </div>
                    </>
                )}
            </UniqueIDProvider>
        );
    }

    getUserInput: () => Empty = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return Explanation.validate(this.getUserInput(), rubric);
    };
}

const leftBorderSpacing = 23;
const verticalContentPadding = 10;
const arrowHeight = 14;

const styles = StyleSheet.create({
    content: {
        borderLeft: "0px solid #ccc",
        display: "inline-grid",
        position: "relative",
    },

    contentCollapsed: {
        gridTemplateColumns: "0fr",
        gridTemplateRows: "0fr",
        marginBottom: 0,
        marginTop: 0,
        minWidth: "0",
        paddingBottom: 0,
        visibility: "hidden",
    },

    contentExpanded: {
        borderLeftWidth: "5px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        marginLeft: -leftBorderSpacing,
        minWidth: "100%",
        paddingLeft: leftBorderSpacing,
        paddingBottom: verticalContentPadding,
        visibility: "visible",

        // Note: we still use arrow height as the vertical margin, even on
        // desktop when there is no arrow, but it's good enough.
        marginBottom: arrowHeight,
        marginTop: arrowHeight,
    },

    contentWrapper: {
        overflow: "hidden",
    },

    transitionCollapsed: {
        transition:
            "all 0.25s step-end, grid-template-rows 0.25s, margin-top 0.25s, margin-bottom 0.25s, padding-bottom 0.25s",
    },

    transitionExpanded: {
        transition:
            "grid-template-rows 0.5s, margin-top 0.5s, margin-bottom 0.5s, padding-bottom 0.5s",
    },
});

export default {
    name: "explanation",
    displayName: "Explanation",
    accessible: true,
    defaultAlignment: "inline",
    widget: Explanation,
    transform: _.identity,
    isLintable: true,
} as WidgetExports<typeof Explanation>;
