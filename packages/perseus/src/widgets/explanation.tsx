/* eslint-disable react/sort-comp */
import {linterContextDefault} from "@khanacademy/perseus-linter";
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
        const {Link} = this.props.apiOptions.baseElements;
        const {isArticle, isMobile} = this.props.apiOptions;

        const linkAnchor = this.state.expanded
            ? this.props.hidePrompt
            : this.props.showPrompt;

        let linkContainer;

        // TODO(diedra): This isn't a valid href;
        // change this to a button that looks like a link.
        const href = "javascript:void(0)";
        const onClick = this._onClick;

        if (isMobile) {
            linkContainer = (
                <div className={css(styles.linkContainer)}>
                    <a
                        className={css(styles.mobileExplanationLink)}
                        href={href}
                        onClick={onClick}
                        role="button"
                        aria-expanded={this.state.expanded}
                    >
                        {linkAnchor}
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
            if (isArticle) {
                // NOTE: For articles, the baseElements `Link` may is either be
                // an anchor tag (if rendered in a modal) or a Wonder Blocks
                // link component in lesson page, see: `article-page.jsx`.
                linkContainer = (
                    <div
                        className={css(
                            styles.linkContainer,
                            styles.articleLink,
                        )}
                    >
                        <Link
                            className={css(styles.explanationLink)}
                            // HACK(michaelpolyak): WB Link doesn't passthrough
                            // class name.
                            style={styles.explanationLink}
                            href={href}
                            onClick={onClick}
                            role="button"
                            aria-expanded={this.state.expanded}
                        >
                            {`[${linkAnchor}]`}
                        </Link>
                    </div>
                );
            } else {
                // NOTE: For exercises, the baseElements `Link` is an
                // anchor tag, see: `perseus-api.jsx`.
                linkContainer = (
                    <div
                        className={css(
                            styles.linkContainer,
                            styles.exerciseLink,
                        )}
                    >
                        <Link
                            className={css(styles.explanationLink)}
                            href={href}
                            onClick={onClick}
                            role="button"
                            aria-expanded={this.state.expanded}
                        >
                            {`[${linkAnchor}]`}
                        </Link>
                    </div>
                );
            }
        }

        const expandedStyle = isMobile
            ? styles.contentExpandedMobile
            : styles.contentExpanded;

        return (
            <div className={css(styles.container)}>
                {linkContainer}
                {this.state.expanded && (
                    <div
                        className={css(
                            styles.content,
                            isMobile && styles.contentMobile,
                            this.state.expanded && expandedStyle,
                        )}
                        // eslint-disable-next-line react/no-string-refs
                        ref="content"
                    >
                        <Renderer
                            apiOptions={this.props.apiOptions}
                            content={this.props.explanation}
                            widgets={this.props.widgets}
                            linterContext={this.props.linterContext}
                        />
                    </div>
                )}
            </div>
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
        position: "relative",
        transition: "margin-top 0.1s",
    },

    contentExpanded: {
        borderLeft: "5px solid #ccc",
        marginLeft: -leftBorderSpacing,
        paddingLeft: leftBorderSpacing,

        paddingBottom: verticalContentPadding,

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
