// WidgetIssueDetails.tsx
import {isFeatureOn} from "@khanacademy/perseus-core";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import IssueCta from "./issue-cta";
import PerseusEditorAccordion from "./perseus-editor-accordion";

import type {Issue} from "./issues-panel";
import type {APIOptions} from "@khanacademy/perseus";

const impactStringMap = {
    high: "Error",
    medium: "Warning",
    low: "Guideline",
};

type IssueProps = {
    apiOptions?: APIOptions;
    issue: Issue;
};

const IssueDetails = ({apiOptions, issue}: IssueProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const toggleVisibility = () => setExpanded(!expanded);

    // TODO(LEMS-3520): Remove this once the "image-widget-upgrade" feature
    // flag is has been fully rolled out. Also remove the `apiOptions` prop.
    const imageUpgradeFF = isFeatureOn({apiOptions}, "image-widget-upgrade");

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
            containerStyle={{
                backgroundColor:
                    issue.impact === "high"
                        ? semanticColor.feedback.critical.subtle.background
                        : semanticColor.feedback.warning.subtle.background,
            }}
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
            <span
                style={{
                    // Allow newlines in the message
                    whiteSpace: "pre-line",
                    color: semanticColor.core.foreground.critical.subtle,
                }}
            >
                {issue.message}
            </span>
            {imageUpgradeFF && <IssueCta issue={issue} />}
        </PerseusEditorAccordion>
    );
};

export default IssueDetails;
