import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import * as constants from "../styles/constants";

import InlineIcon from "./inline-icon";

const exclamationIcon = {
    path: "M6 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1z",
    height: 12,
    width: 12,
} as const;

enum Severity {
    Error = 1,
    Warning = 2,
    Recommendation = 3,
    OfflineReportingOnly = 4,
}

type Props = {
    /** The children are the linty content we're highlighting */
    children: React.ReactNode;
    /** Inline lint is highlighted differently than block lint. */
    inline?: boolean;
    /** This is the text that appears in the tooltip */
    message: string;
    /** This is used as the fragment id (hash) in the URL of the link */
    ruleName: string;
    /** Lint warnings inside tables are handled specially */
    insideTable: boolean;
    /**
     * Should lint highlighting be rendered as a block to the left of
     * the lint instead of on the right gutter?
     */
    blockHighlight?: boolean;
    /**
     * How important this lint message is for the editor. Severity goes
     * from 1 (indicating an error) to 4 (offline reporting only)
     */
    severity?: Severity;
};

type State = {
    tooltipAbove: boolean;
};

/**
 * This component renders "lint" nodes in a markdown parse tree. Lint nodes
 * are inserted into the tree by the Perseus linter (see
 * perseus-linter/src/index).
 *
 * This component serves multiple purposes
 *
 * 1) It renders a small circle in the right margin to indicate that there
 * is lint on (or near) that line.
 *
 * 2) The area around the circle is hoverable: when the mouse moves over it
 * the linty content is highlighted and a tooltip is displayed that explains
 * what the problem is.
 *
 * 3) The hoverable area is also an HTML <a> tag. Clicking on it opens
 * a new tab and links to additional details about the specific lint rule.
 *
 * The CSS required to position the circles in the right margin is tricky
 * and it does not always work perfectly. When lint occurs on a block element
 * that has a right margin (like anything blockquoted) the circle will appear
 * to the left of where it belongs.  And if there is more
 **/
class Lint extends React.Component<Props, State> {
    _positionTimeout: number | undefined;

    state: State = {
        tooltipAbove: true,
    };

    componentDidMount() {
        // TODO(somewhatabstract): Use WB timing
        // eslint-disable-next-line no-restricted-syntax
        this._positionTimeout = window.setTimeout(this.getPosition);
    }

    componentWillUnmount() {
        // TODO(somewhatabstract): Use WB timing
        // eslint-disable-next-line no-restricted-syntax
        window.clearTimeout(this._positionTimeout);
    }

    // We can't call setState in componentDidMount without risking a render
    // thrash, and we can't call getBoundingClientRect in render, so we
    // borrow a timeout approach from learnstorm-dashboard.jsx and set our
    // state once the component has mounted and we can get what we need.
    getPosition: () => void = () => {
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'getBoundingClientRect' does not exist on type 'Element | Text'.
        const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        // NOTE(scottgrant): This is a magic number! We don't know the size
        // of the tooltip at this point, so we're arbitrarily choosing a
        // point at which to flip the tooltip's position.
        this.setState({tooltipAbove: rect.top > 100});
    };

    // Render the <a> element that holds the indicator icon and the tooltip
    // We pass different styles for the inline and block cases
    renderLink: (arg1: any) => React.ReactElement = (style) => {
        const tooltipAbove = this.state.tooltipAbove;

        let severityStyle;
        let warningText;
        let warningTextStyle;
        if (this.props.severity === Severity.Error) {
            severityStyle = styles.indicatorError;
            warningText = "Error";
            warningTextStyle = styles.publishBlockingError;
        } else if (this.props.severity === Severity.Warning) {
            severityStyle = styles.indicatorWarning;
            warningText = "Warning";
            warningTextStyle = styles.warning;
        } else {
            severityStyle = styles.indicatorGuideline;
            warningText = "Recommendation";
            warningTextStyle = styles.warning;
        }

        return (
            <a
                href={`https://khanacademy.org/r/linter-rules#${this.props.ruleName}`}
                target="lint-help-window"
                className={css(style)}
            >
                <span className={css(styles.indicator, severityStyle)}>
                    {this.props.severity === 1 && (
                        <InlineIcon {...exclamationIcon} />
                    )}
                </span>
                <div
                    className={css(
                        styles.tooltip,
                        tooltipAbove && styles.tooltipAbove,
                    )}
                >
                    {this.props.message.split("\n\n").map((m, i) => (
                        <p key={i} className={css(styles.tooltipParagraph)}>
                            <span className={css(warningTextStyle)}>
                                {warningText}:{" "}
                            </span>
                            {m}
                        </p>
                    ))}
                    <div
                        className={css(
                            styles.tail,
                            tooltipAbove && styles.tailAbove,
                        )}
                    />
                </div>
            </a>
        );
    };

    // The main render method surrounds linty content with a block or
    // inline container and the link element that displays the indicator
    // and holds the tooltip.
    render(): React.ReactNode {
        const {children, inline, blockHighlight, insideTable} = this.props;

        if (insideTable) {
            // If we're inside a table, then linty nodes just get
            // a simple wrapper that allows them to be highlighted
            if (inline) {
                return <span data-lint-inside-table="true">{children}</span>;
            }
            return <div data-lint-inside-table="true">{children}</div>;
        }
        if (blockHighlight) {
            return (
                <span
                    className={css(
                        styles.lintContainer,
                        styles.lintContainerBlock,
                    )}
                >
                    {this.renderLink(styles.radioWidgetHoverTarget)}
                    <span>{children}</span>
                </span>
            );
        }
        if (inline) {
            return (
                <span className={css(styles.lintContainer)}>
                    {this.renderLink(styles.inlineHoverTarget)}
                    <span>{children}</span>
                </span>
            );
        }
        return (
            <div className={css(styles.lintContainer)}>
                {this.renderLink(styles.hoverTarget)}
                <div>{children}</div>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    // This is the class of the outermost element.
    // We use relative positioning so that the lint indicator can be
    // positioned absolutely relative to the position of the linty container.
    lintContainer: {
        position: "relative",
    },

    // Some elements that might be inline with bad parent styling are treated
    // as block elements so they render and are visible.
    lintContainerBlock: {
        display: "block",
    },

    // This is the main class for block lint. It is applied to the link element
    // that is also the hover target.
    hoverTarget: {
        // Absolute positioning relative to the lintContainer element
        position: "absolute",
        // Top of the hover target is aligned with the top of the linty block
        top: 0,

        // We want the hover target in the right margin. It is 24px wide, but
        // we have to offset it another 16px because of margins in the
        // Perseus content. I'm not sure where the 16px margin is set
        // so if that changes, this number will also have to be changed.
        // This is the part of the CSS that doesn't work right when
        // applied to things like blockquotes that have different right
        // margins.
        right: -40,

        // The hover target is a 24x24 block element.
        display: "block",
        width: 24,
        height: 24,

        // The indicator is in a span inside the hover target.
        // This style changes its color on hover
        ":hover > span": {
            backgroundColor: constants.warningColorHover,
        },

        // The tooltip is in a div element inside the hover target.
        // This style displays it on hover
        ":hover div": {
            display: "block",
        },

        // The linty content is in a <div> sibling that follows the
        // hover target. This style highlights it on hover. We do an outline
        // rather than a border so we don't affect the layout. We could also
        // set the background color, but we don't because we can't reliably
        // set the text color of this block element. We could use
        // filter: invert(100%) if we want more visual change on hover here.
        ":hover ~ div": {
            outline: "1px solid " + constants.warningColor,
        },

        // If the div sibling is a table, then we may be displaying
        // lint warnings about errors inside that table. In that case
        // we want to highlight any linty descendants of the table
        ":hover ~ div div[data-lint-inside-table]": {
            outline: "1px solid " + constants.warningColor,
        },

        ":hover ~ div span[data-lint-inside-table]": {
            backgroundColor: constants.warningColor,
            color: constants.white,
        },
    },

    // This is how we position the hover target for inline lint.
    inlineHoverTarget: {
        // For inline lint we position the hover target with a float:right
        // We can't use absolute positioning as we do in the block case
        // because the horizontal position is not predictable in the
        // inline case.
        float: "right",

        // We still have to make the hover target relative so that the
        // tooltip can be positioned relative to it.
        position: "relative",

        // See the comment above about the extra 16px of offset needed here.
        marginRight: -40,

        // The hover target is a 24x24 block. Same as the block case
        display: "block",
        width: 24,
        height: 24,

        // The indicator is in a span inside the hover target.
        // This style changes its color on hover.
        // This is the same as the block case.
        ":hover > span": {
            backgroundColor: constants.warningColorHover,
        },

        // The tooltip is in a div element inside the hover target.
        // This style displays it on hover. This is the same as the block case.
        ":hover div": {
            display: "block",
        },

        // The linty content is in a <span> sibling that follows the
        // hover target. This style highlights it on hover. In this case
        // we can just set the foreground and background color to really
        // draw attention to the linty content.
        ":hover ~ span": {
            backgroundColor: constants.warningColor,
            color: constants.white,
        },
    },

    radioWidgetHoverTarget: {
        // These lint targets appear in radio checkboxes, and are not able to
        // position a lint icon in the right-most gutter thanks to a parent
        // overflow rule. We position these icons to the left of the block
        // where there is some room.
        position: "absolute",
        left: -40,

        // The hover target is a 24x24 block. Same as the block case
        display: "block",
        width: 24,
        height: 24,

        // By specifying a fixed minimum width, the tooltip will hover in a
        // readable position above and to the right.
        minWidth: 264,

        // The indicator is in a span inside the hover target.
        // This style changes its color on hover.
        // This is the same as the block case.
        ":hover > span": {
            backgroundColor: constants.warningColorHover,
        },

        // The tooltip is in a div element inside the hover target.
        // This style displays it on hover. This is the same as the block case.
        // We specify a fixed-width because of some parent styling.
        ":hover > div": {
            display: "block",
            padding: 8,
            width: 280,
        },

        // Move the tooltip tail to an appropriate position relative to the
        // tooltip.
        ":hover > div > div": {
            left: 8,
        },

        // The linty content is in a <span> sibling that follows the
        // hover target. This style highlights it on hover. In this case
        // we can just set the foreground and background color to really
        // draw attention to the linty content.
        ":hover ~ span": {
            backgroundColor: constants.warningColor,
            color: constants.white,
        },
    },

    // This is the class for the lint indicator in the margin.
    indicator: {
        alignItems: "center",
        borderRadius: 4,
        color: "white",
        display: "flex",
        fontSize: 12,
        height: 8,
        justifyContent: "center",
        margin: 8,
        width: 8,
    },
    indicatorError: {
        backgroundColor: "#be2612",
        borderRadius: 8,
        height: 16,
        width: 16,
    },
    indicatorWarning: {
        backgroundColor: "#f86700",
    },
    indicatorGuideline: {
        backgroundColor: "#ffbe26",
    },

    // These are the styles for the tooltip
    tooltip: {
        // Absolute positioning relative to the lint indicator circle.
        position: "absolute",
        right: -12,

        // The tooltip is hidden by default; only displayed on hover
        display: "none",

        // When it is displayed, it goes on top!
        zIndex: 1000,

        // These styles control what the tooltip looks like
        color: constants.white,
        backgroundColor: constants.gray17,
        opacity: 0.9,
        fontFamily: constants.baseFontFamily,
        fontSize: "12px",
        lineHeight: "15px",
        width: "320px",
        borderRadius: "4px",
    },
    // If we're going to render the tooltip above the warning circle, we use
    // the previous rules in tooltip, but change the position slightly.
    tooltipAbove: {
        bottom: 32,
    },

    // We give the tooltip a little triangular "tail" that points down at
    // the lint indicator circle. This is inside the tooltip and positioned
    // relative to it. It also shares the opacity of the tooltip. We're using
    // the standard CSS trick for drawing triangles with a thick border.
    tail: {
        position: "absolute",
        top: -12,
        right: 16,
        width: 0,
        height: 0,

        // This is the CSS triangle trick
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderBottom: "12px solid " + constants.gray17,
    },
    tailAbove: {
        bottom: -12,
        borderBottom: "none",
        borderTop: "12px solid " + constants.gray17,
        top: "auto",
    },

    // Each warning in the tooltip is its own <p>. They are 12 pixels from
    // the edges of the tooltip and 12 pixels from each other.
    tooltipParagraph: {
        margin: 12,
    },

    // The text "Warning" inside the tooltip is highlighted like this
    warning: {
        color: constants.warningColor,
        fontFamily: constants.boldFontFamily,
    },

    // The text "Publish-blocking error" instide the tooltip is highlighted
    // like this
    publishBlockingError: {
        color: constants.publishBlockingErrorColor,
    },
});

export default Lint;
