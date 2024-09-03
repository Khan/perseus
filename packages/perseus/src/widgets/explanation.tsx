import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../components/i18n-context";
import * as Changeable from "../mixins/changeable";
import Renderer from "../renderer";

import type {PerseusExplanationWidgetOptions} from "../perseus-types";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types";

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

function mediaQueryIsMatched(mediaQuery: string): boolean {
    if (typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia(mediaQuery).matches;
}

class Explanation extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    state: State = {
        expanded: false,
    };
    _mounted: boolean = false;

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

    getUserInput: () => Empty = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return Explanation.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        const promptText = this.state.expanded
            ? this.props.hidePrompt
            : this.props.showPrompt;

        const caretIcon = this.state.expanded ? caretUp : caretDown;

        const allowTransition =
            this._mounted &&
            mediaQueryIsMatched("(prefers-reduced-motion: no-preference)");

        // Special styling is needed to fit the button in a block of text without throwing off the line spacing.
        // While the button is not normally included in a block of text, it needs to be able to accommodate such a case.
        const buttonStyleOverrides = {
            height: "auto",
            lineHeight: "inherit",
            marginLeft: "-2px", // transfer space on the left side to the padding
            marginRight: "2px", // adds space between the right border and any text that follows
            paddingLeft: "2px", // adds space between the left border and the button text
        };

        const labelStyle = {
            fontSize: "18px",
            lineHeight: "inherit",
            "text-align": "left",
            // The following property adjusts the large space between the button text and the caret icon.
            // Since we are unable to adjust the styling of the icon (where the extra space exists),
            //      we are adjusting it on the text label by using a negative margin.
            marginRight: "-6px",
            "white-space": "normal",
        };

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
            <UniqueIDProvider
                mockOnFirstRender={true}
                scope="explanation-widget"
            >
                {(ids) => (
                    <>
                        <Button
                            aria-expanded={this.state.expanded}
                            aria-controls={ids.get("content")}
                            endIcon={caretIcon}
                            kind="tertiary"
                            labelStyle={labelStyle}
                            onClick={this._onClick}
                            size="small"
                            style={buttonStyleOverrides}
                        >
                            {promptText}
                        </Button>

                        <View
                            id={ids.get("content")}
                            style={contentStyling}
                            aria-hidden={!this.state.expanded}
                            testId="content-container"
                        >
                            <View style={styles.contentWrapper}>
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
            </UniqueIDProvider>
        );
    }
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
