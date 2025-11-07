import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {Id, View} from "@khanacademy/wonder-blocks-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import RendererWithAPIOptions from "../../renderer-with-api-options";
import UserInputManager from "../../user-input-manager";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/explanation/explanation-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {ExplanationPromptJSON} from "../../widget-ai-utils/explanation/explanation-ai-utils";
import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusExplanationWidgetOptions>;

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
            fontSize: font.heading.size.medium,
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
            <Id>
                {(contentId) => (
                    <>
                        <Button
                            aria-expanded={this.state.expanded}
                            aria-controls={contentId}
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
                            id={contentId}
                            style={contentStyling}
                            aria-hidden={!this.state.expanded}
                            testId="content-container"
                        >
                            <View style={styles.contentWrapper}>
                                <UserInputManager
                                    widgets={this.props.widgets}
                                    problemNum={0}
                                >
                                    {({
                                        userInput,
                                        handleUserInput,
                                        initializeUserInput,
                                    }) => {
                                        return (
                                            <RendererWithAPIOptions
                                                content={this.props.explanation}
                                                widgets={this.props.widgets}
                                                linterContext={
                                                    this.props.linterContext
                                                }
                                                strings={this.context.strings}
                                                userInput={userInput}
                                                handleUserInput={
                                                    handleUserInput
                                                }
                                                initializeUserInput={
                                                    initializeUserInput
                                                }
                                            />
                                        );
                                    }}
                                </UserInputManager>
                            </View>
                        </View>
                    </>
                )}
            </Id>
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
    widget: Explanation,
    isLintable: true,
} satisfies WidgetExports<typeof Explanation>;
