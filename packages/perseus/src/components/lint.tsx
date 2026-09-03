import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import * as constants from "../styles/constants";

import InlineIcon from "./inline-icon";

import type {CSSProperties} from "aphrodite";

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
 * the linty content is highlighted and a Wonder Blocks tooltip is displayed
 * that explains what the problem is.
 *
 * 3) The hoverable area is also an HTML <a> tag. Clicking on it opens
 * a new tab and links to additional details about the specific lint rule.
 *
 * The CSS required to position the circles in the right margin is tricky
 * and it does not always work perfectly. When lint occurs on a block element
 * that has a right margin (like anything blockquoted) the circle will appear
 * to the left of where it belongs.  And if there is more
 **/
function Lint({
    children,
    inline,
    message,
    ruleName,
    insideTable,
    blockHighlight,
    severity,
}: Props): React.ReactElement {
    // Render the <a> element that holds the indicator icon, wrapped in the
    // tooltip that describes the lint. We pass different styles for the
    // inline and block cases.
    const renderLink = (style: CSSProperties): React.ReactElement => {
        let indicatorSeverityStyle;
        let severityLabel;
        let severityLabelStyle;
        if (severity === Severity.Error) {
            indicatorSeverityStyle = styles.indicatorError;
            severityLabel = "Error";
            severityLabelStyle = styles.publishBlockingError;
        } else if (severity === Severity.Warning) {
            indicatorSeverityStyle = styles.indicatorWarning;
            severityLabel = "Warning";
            severityLabelStyle = styles.warning;
        } else {
            indicatorSeverityStyle = styles.indicatorGuideline;
            severityLabel = "Recommendation";
            severityLabelStyle = styles.warning;
        }

        return (
            <Tooltip
                // The anchor is an <a href>, which is already keyboard
                // focusable, so the tooltip doesn't need to add a tabindex.
                forceAnchorFocusivity={false}
                variant="strong"
                content={
                    <TooltipContent
                        title={
                            <BodyText weight="bold" style={severityLabelStyle}>
                                {severityLabel}
                            </BodyText>
                        }
                    >
                        {message.split("\n\n").map((paragraph, i) => (
                            <BodyText key={i} style={styles.tooltipParagraph}>
                                {paragraph}
                            </BodyText>
                        ))}
                    </TooltipContent>
                }
            >
                <a
                    href={`https://khanacademy.org/r/linter-rules#${ruleName}`}
                    target="lint-help-window"
                    aria-label={`${severityLabel}: ${ruleName}`}
                    className={css(style)}
                >
                    <span
                        className={css(
                            styles.indicator,
                            indicatorSeverityStyle,
                        )}
                    >
                        {severity === Severity.Error && (
                            <InlineIcon {...exclamationIcon} />
                        )}
                    </span>
                </a>
            </Tooltip>
        );
    };

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
                className={css(styles.lintContainer, styles.lintContainerBlock)}
            >
                {renderLink(styles.radioWidgetHoverTarget)}
                <span>{children}</span>
            </span>
        );
    }
    if (inline) {
        return (
            <span className={css(styles.lintContainer)}>
                {renderLink(styles.inlineHoverTarget)}
                <span>{children}</span>
            </span>
        );
    }
    return (
        <div className={css(styles.lintContainer)}>
            {renderLink(styles.hoverTarget)}
            <div>{children}</div>
        </div>
    );
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
        insetBlockStart: 0,

        // We want the hover target in the right margin. It is 24px wide, but
        // we have to offset it another 16px because of margins in the
        // Perseus content. I'm not sure where the 16px margin is set
        // so if that changes, this number will also have to be changed.
        // This is the part of the CSS that doesn't work right when
        // applied to things like blockquotes that have different right
        // margins.
        insetInlineEnd: -40,

        // The hover target is a 24x24 block element.
        display: "block",
        width: 24,
        height: 24,

        // The indicator is in a span inside the hover target.
        // This style changes its color on hover
        ":hover > span": {
            backgroundColor: constants.warningColorHover,
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
        float: "inline-end",

        // We still have to make the hover target relative so that the
        // tooltip can be positioned relative to it.
        position: "relative",

        // See the comment above about the extra 16px of offset needed here.
        marginInlineEnd: -40,

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
        insetInlineStart: -40,

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
        backgroundColor: semanticColor.core.foreground.critical.default,
        borderRadius: 8,
        height: 16,
        width: 16,
    },
    indicatorWarning: {
        backgroundColor: semanticColor.core.foreground.warning.strong,
    },
    indicatorGuideline: {
        backgroundColor: semanticColor.core.foreground.warning.default,
    },

    // A lint message can contain several paragraphs. Wonder Blocks resets the
    // margins on BodyText, so we space them out ourselves.
    tooltipParagraph: {
        ":not(:first-child)": {
            marginBlockStart: sizing.size_080,
        },
    },

    // The text "Warning" or "Recommendation" in the tooltip title
    warning: {
        color: semanticColor.status.warning.foreground,
    },

    // The text "Error" in the tooltip title, for publish-blocking lint
    publishBlockingError: {
        color: semanticColor.status.critical.foreground,
    },
});

export default Lint;
