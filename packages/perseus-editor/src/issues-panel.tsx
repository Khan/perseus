import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconCaution from "@phosphor-icons/core/fill/warning-fill.svg";
import iconViolations from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";
import {useState} from "react";

import PerseusEditorAccordion from "./components/perseus-editor-accordion";

const IssuesPanel = () => {
    const hardCodedViolations = [
        {
            id: "violation-1",
            helpUrl: "https://example.com/help/violation-1",
            help: "This is a violation help message.",
            impact: "High",
            message: "This is a violation message.",
        },
        {
            id: "violation-2",
            helpUrl: "https://example.com/help/violation-2",
            help: "This is another violation help message.",
            impact: "Low",
            message: "This is another violation message.",
        },
    ];

    const hardCodedIncompletes = [
        {
            id: "incomplete-1",
            helpUrl: "https://example.com/help/incomplete-1",
            help: "This is an incomplete help message.",
            impact: "Medium",
            message: "This is an incomplete message.",
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [violations, setViolations] = useState(hardCodedViolations); // Update type based on new approach
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [incompletes, setIncompletes] = useState(hardCodedIncompletes); // Update type based on new approach

    const [showPanel, setShowPanel] = useState(false);
    const toggleIcon = showPanel ? caretDown : caretRight;
    const togglePanel = () => setShowPanel((prev) => !prev);

    const icon =
        violations.length > 0
            ? iconViolations
            : incompletes.length > 0
              ? iconCaution
              : iconPass;

    const iconColor =
        violations.length > 0
            ? wbColor.red
            : incompletes.length > 0
              ? wbColor.gold
              : wbColor.green;

    const issuesCount = `${violations.length + incompletes.length} issue${
        violations.length + incompletes.length === 1 ? "" : "s"
    }`;

    const editorClasses = `perseus-widget-editor${showPanel ? " perseus-widget-editor-open" : ""}`;

    return (
        <div className={editorClasses}>
            <div className="perseus-widget-editor-title">
                <div className="perseus-widget-editor-title-id">
                    <IconButton
                        icon={toggleIcon}
                        kind="secondary"
                        size="small"
                        onClick={togglePanel}
                        style={{marginRight: 0, flexGrow: 0}}
                    />
                    <span>Issues</span>
                </div>
                {issuesCount}
                <PhosphorIcon icon={icon} size="medium" color={iconColor} />
            </div>
            {showPanel && (
                <div className="perseus-widget-editor-panel">
                    <div className="perseus-widget-editor-content">
                        {hardCodedViolations.map((issue, index) => (
                            <IssueDetails
                                key={issue.id}
                                issue={issue}
                                issueType="violation"
                            />
                        ))}
                        {hardCodedIncompletes.map((issue, index) => (
                            <IssueDetails
                                key={issue.id}
                                issue={issue}
                                issueType="incomplete"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

type IssueProps = {
    issueType: "violation" | "incomplete";
    issue: any; // Update type based on new approach
};

const IssueDetails = (props: IssueProps) => {
    const {issue, issueType} = props;
    const [expanded, setExpanded] = useState(false);
    const toggleVisibility = () => setExpanded(!expanded);
    const title = issueType === "violation" ? "Violation" : "Investigate";

    return (
        <PerseusEditorAccordion
            animated={true}
            expanded={expanded}
            onToggle={toggleVisibility}
            panelStyle={{backgroundColor: "white"}}
            header={
                <LabelLarge
                    style={{
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >{`${title}: ${issue.id}`}</LabelLarge>
            }
        >
            <LabelSmall style={{fontWeight: "bold"}}>Description:</LabelSmall>
            <a href={issue.helpUrl} target="_blank" rel="noreferrer">
                {issue.help}
            </a>
            <LabelSmall style={{marginTop: "1em", fontWeight: "bold"}}>
                Impact:
            </LabelSmall>
            <span style={{fontWeight: "initial"}}> {issue.impact}</span>
            <LabelSmall style={{fontWeight: "bold"}}>Issue:</LabelSmall>
            <span>{issue.message}</span>
        </PerseusEditorAccordion>
    );
};

export default IssuesPanel;
