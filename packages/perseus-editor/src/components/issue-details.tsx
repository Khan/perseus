// WidgetIssueDetails.tsx
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import IssueCta from "./issue-cta";
import PerseusEditorAccordion from "./perseus-editor-accordion";
import ShowMe from "./show-me-issue";

import type {Issue} from "./issues-panel";

const impactStringMap = {
    high: "Error",
    medium: "Warning",
    low: "Guideline",
};

type IssueProps = {
    issue: Issue;
};

const IssueDetails = ({issue}: IssueProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const toggleVisibility = () => setExpanded(!expanded);

    const accordionColor =
        issue.impact === "high"
            ? semanticColor.feedback.critical.subtle.background
            : semanticColor.feedback.warning.subtle.background;
    const messageStyling = {
        // Allow newlines in the message
        whiteSpace: "pre-line",
        color: semanticColor.core.foreground.critical.default,
    };

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
            containerStyle={{backgroundColor: accordionColor}}
            panelStyle={{backgroundColor: "white"}}
            header={
                <LabelLarge
                    style={{
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {`${impactStringMap[issue.impact]}: ${issue.id}`}
                </LabelLarge>
            }
        >
            <LabelSmall style={{fontWeight: "bold"}}>Description:</LabelSmall>
            <span>{issue.description}</span>
            <a href={issue.helpUrl} target="_blank" rel="noreferrer">
                {issue.help}
            </a>
            <LabelSmall style={{marginTop: "1em", fontWeight: "bold"}}>
                Impact:
            </LabelSmall>
            <span style={{fontWeight: "initial"}}> {issue.impact}</span>
            <LabelSmall style={{marginTop: "1em", fontWeight: "bold"}}>
                Issue:
            </LabelSmall>
            <span style={messageStyling}>{issue.message}</span>
            <ShowMe elements={issue.elements} />
            <IssueCta issue={issue} />
        </PerseusEditorAccordion>
    );
};

export default IssueDetails;
