import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import dotOutlineIcon from "@phosphor-icons/core/fill/dot-outline-fill.svg";
import warningCircleIcon from "@phosphor-icons/core/fill/warning-circle-fill.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {CSSProperties} from "aphrodite";

/**
 * How important a lint message is for the editor. These values
 * mirror `Rule.Severity` in perseus-linter, which is where the severities
 * on lint nodes originate.
 *
 * perseus-linter Severity also includes Recommendation = 3 and
 * OfflineReportingOnly = 4, but those are not used here.
 */
export enum Severity {
    Error = 1,
    Warning = 2,
}

type Props = {
    /** This is the text that appears in the tooltip */
    message: string;
    /** This is used as the fragment id (hash) in the URL of the link */
    ruleName: string;
    /**
     * Determines the icon and the label at the top of the tooltip. Anything
     * less severe than a warning is presented as a recommendation.
     */
    severity?: Severity;
    /** Positioning styles, supplied by the caller. */
    style: CSSProperties;
};

/**
 * The indicator for a single lint message: a small icon button that links to
 * the documentation for the rule that fired, wrapped in a Wonder Blocks
 * tooltip that names the severity and explains the problem.
 **/
export default function LinterLink({
    message,
    ruleName,
    severity,
    style,
}: Props): React.ReactElement {
    // Render the <a> element that holds the indicator icon, wrapped in the
    // tooltip that describes the lint. We pass different styles for the
    // inline and block cases.

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
}

const styles = StyleSheet.create({
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
