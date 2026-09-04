import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import dotOutlineIcon from "@phosphor-icons/core/fill/dot-outline-fill.svg";
import warningCircleIcon from "@phosphor-icons/core/fill/warning-circle-fill.svg";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {CSSProperties} from "aphrodite";

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
        let severityLabel;
        let severityLabelStyle;
        if (severity === Severity.Error) {
            severityLabel = "Error";
            severityLabelStyle = styles.publishBlockingError;
        } else if (severity === Severity.Warning) {
            severityLabel = "Warning";
            severityLabelStyle = styles.warning;
        } else {
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
                <IconButton
                    size="small"
                    kind="tertiary"
                    actionType="destructive"
                    aria-label={`${severityLabel}: ${ruleName}`}
                    href={`https://khanacademy.org/r/linter-rules#${ruleName}`}
                    icon={
                        severity === Severity.Error
                            ? warningCircleIcon
                            : dotOutlineIcon
                    }
                    style={style}
                />
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

const highlightBlockContent: CSSProperties = {
    // The linty content is in a <div> sibling that follows the
    // hover target. This style highlights it on hover. We do an outline
    // rather than a border so we don't affect the layout. We could also
    // set the background color, but we don't because we can't reliably
    // set the text color of this block element. We could use
    // filter: invert(100%) if we want more visual change on hover here.
    ":hover ~ div": {
        outline: `1px solid ${semanticColor.status.warning.foreground}`,
    },

    // If the div sibling is a table, then we may be displaying
    // lint warnings about errors inside that table. In that case
    // we want to highlight any linty descendants of the table
    ":hover ~ div div[data-lint-inside-table]": {
        outline: `1px solid ${semanticColor.status.warning.foreground}`,
    },
    ":hover ~ div span[data-lint-inside-table]": {
        backgroundColor: semanticColor.status.warning.background,
        color: semanticColor.status.warning.foreground,
    },
};

const highlightInlineContent: CSSProperties = {
    // The linty content is in a <span> sibling that follows the
    // hover target. This style highlights it on hover. In this case
    // we can just set the foreground and background color to really
    // draw attention to the linty content.
    ":hover ~ span": {
        backgroundColor: semanticColor.status.warning.background,
        color: semanticColor.status.warning.foreground,
    },
};

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

        // We want the hover target in the right margin. It is 24px wide, but
        // we have to offset it another 16px because of margins in the
        // Perseus content. I'm not sure where the 16px margin is set
        // so if that changes, this number will also have to be changed.
        // This is the part of the CSS that doesn't work right when
        // applied to things like blockquotes that have different right
        // margins.
        insetInlineEnd: -60,

        ...highlightBlockContent,
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
        marginInlineEnd: -60,

        ...highlightInlineContent,
    },

    radioWidgetHoverTarget: {
        // These lint targets appear in radio checkboxes, and are not able to
        // position a lint icon in the right-most gutter thanks to a parent
        // overflow rule. We position these icons to the left of the block
        // where there is some room.
        position: "absolute",
        insetInlineStart: -60,
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
