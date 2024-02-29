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
import * as styleConstants from "../styles/constants";
import mediaQueries from "../styles/media-queries";

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

type PromptProps = {
    contentId: string;
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
        const {isArticle, isMobile} = this.props.apiOptions;

        const promptText = this.state.expanded
            ? this.props.hidePrompt
            : this.props.showPrompt;

        let promptContainer: (props: PromptProps) => React.ReactNode;

        // TODO(diedra): This isn't a valid href;
        // change this to a button that looks like a link.
        const href = "javascript:void(0)";
        const onClick = this._onClick;

        if (isMobile) {
            promptContainer = ({contentId}) => (
                <div className={css(styles.linkContainer)}>
                    <a
                        className={css(styles.mobileExplanationLink)}
                        href={href}
                        onClick={onClick}
                        role="button"
                        aria-expanded={this.state.expanded}
                        aria-controls={contentId}
                    >
                        {promptText}
                    </a>
                    {this.state.expanded && (
                        <svg className={css(styles.disclosureArrow)}>
                            <polygon
                                style={{fill: backgroundColor}}
                                points={
                                    `0,${arrowHeight} ` +
                                    `${arrowWidth},${arrowHeight} ` +
                                    `${arrowWidth / 2},0`
                                }
                            />
                        </svg>
                    )}
                </div>
            );
        } else {
            // const viewStyling = isArticle
            //     ? [styles.explanationLink, styles.articleLink]
            //     : [styles.explanationLink, styles.exerciseLink];
            const caretIcon = this.state.expanded ? caretUp : caretDown;
            promptContainer = ({contentId}) => (
                <Button
                    aria-expanded={this.state.expanded}
                    aria-controls={contentId}
                    endIcon={caretIcon}
                    kind="tertiary"
                    onClick={onClick}
                    size="medium"
                >
                    {promptText}
                </Button>
            );
        }

        const expandedStyle = isMobile
            ? styles.contentExpandedMobile
            : styles.contentExpanded;

        return (
            <UniqueIDProvider
                mockOnFirstRender={false}
                scope="explanation-widget"
            >
                {(ids) => (
                    <div className={css(styles.container)}>
                        {promptContainer({contentId: ids.get("content")})}
                        <div
                            className={css(
                                styles.content,
                                isMobile && styles.contentMobile,
                                this.state.expanded && expandedStyle,
                            )}
                            aria-hidden={!this.state.expanded}
                        >
                            <div
                                id={ids.get("content")}
                                className={css(styles.explanationContent)}
                            >
                                <Renderer
                                    apiOptions={this.props.apiOptions}
                                    content={this.props.explanation}
                                    widgets={this.props.widgets}
                                    linterContext={this.props.linterContext}
                                />
                            </div>
                        </div>
                    </div>
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

const arrowWidth = 30;
const arrowHeight = 14;
const backgroundColor = styleConstants.gray95;

const styles = StyleSheet.create({
    container: {
        display: "inline",
        position: "relative",
    },

    linkContainer: {
        display: "inline-block",
    },

    explanationLink: {
        fontStyle: "italic",
        color: "#007d96",
    },

    articleLink: {
        // Copied from .body-text in articles.less
        fontSize: 20,
        lineHeight: "30px",
    },

    exerciseLink: {
        // Copied from .legacy-typography in util.less
        fontSize: 14,
        lineHeight: "19.6px",
    },

    mobileExplanationLink: {
        color: styleConstants.kaGreen,
        borderBottom: `dashed 1px ${styleConstants.kaGreen}`,
        textDecoration: "none",

        // TODO(benkomalo): these should be pulled in from common typography
        // shared files so we have a single place where the type hierarchy is
        // defined; one off font sizes for individual components should be
        // avoided.
        [mediaQueries.xl]: {
            fontSize: 22,
            lineHeight: 1.4,
        },
        [mediaQueries.lgOrSmaller]: {
            fontSize: 20,
            lineHeight: 1.5,
        },
        [mediaQueries.smOrSmaller]: {
            fontSize: 18,
            lineHeight: 1.2,
        },
    },

    content: {
        borderLeft: "0px solid #ccc",
        display: "inline-grid",
        gridTemplateColumns: "0fr",
        gridTemplateRows: "0fr",
        marginBottom: 0,
        marginTop: 0,
        minWidth: "0",
        paddingBottom: 0,
        position: "relative",
        transition:
            "all 0.25s step-end, grid-template-rows 0.25s, margin-top 0.25s, margin-bottom 0.25s, padding-bottom 0.25s",
        ":first-child": {
            overflow: "hidden",
        },
    },

    contentExpanded: {
        borderLeftWidth: "5px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        marginLeft: -leftBorderSpacing,
        minWidth: "100%",
        paddingLeft: leftBorderSpacing,
        paddingBottom: verticalContentPadding,
        transition:
            "grid-template-rows 0.5s, margin-top 0.5s, margin-bottom 0.5s, padding-bottom 0.5s",

        // Note: we still use arrow height as the vertical margin, even on
        // desktop when there is no arrow, but it's good enough.
        marginBottom: arrowHeight,
        marginTop: arrowHeight,
    },

    contentExpandedMobile: {
        boxSizing: "content-box",
        paddingTop: 32,
        paddingBottom: 32,
        marginTop: arrowHeight,
    },

    contentMobile: {
        background: backgroundColor,

        // TODO(benkomalo): this is to "full bleed" the background.
        // The actual content padding differs depending on the host
        // container, so this needs to be fixed eventually.
        marginLeft: styleConstants.negativePhoneMargin,
        marginRight: styleConstants.negativePhoneMargin,
        paddingLeft: styleConstants.phoneMargin,
        paddingRight: styleConstants.phoneMargin,
    },

    disclosureArrow: {
        // HACK - positioning at "bottom: 0", doesn't actually position it to
        // the real bottom, because the container is `inline-block`, and it
        // seems to position it to the baseline? We put in a generous
        // fudge factor to position it down to be flush with the content box
        // below it.
        bottom: -(arrowHeight + 5),
        height: arrowHeight,
        left: "50%",
        marginLeft: -(arrowWidth / 2),
        position: "absolute",
        width: arrowWidth,
    },

    explanationContent: {
        overflow: "hidden",
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
