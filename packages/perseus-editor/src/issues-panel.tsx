import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconWarning from "@phosphor-icons/core/fill/warning-fill.svg";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";
import {useState} from "react";

import IssueDetails from "./issue-details";

export type IssueImpact = "low" | "medium" | "high";
export type Issue = {
    id: string;
    description: string;
    helpUrl: string;
    help: string;
    impact: IssueImpact;
    message: string;
};

type IssuesPanelProps = {
    issues?: Issue[];
};

const IssuesPanel = ({issues = []}: IssuesPanelProps) => {
    const hasWarnings = issues.length > 0;
    const [showPanel, setShowPanel] = useState(false);
    const icon = hasWarnings ? iconWarning : iconPass;
    const iconColor = hasWarnings ? wbColor.gold : wbColor.green;
    const issuesCount = `${issues.length} issue${
        issues.length === 1 ? "" : "s"
    }`;

    const toggleIcon = showPanel ? caretDown : caretRight;

    const togglePanel = () => {
        if (hasWarnings) {
            setShowPanel(!showPanel);
        }
    };

    return (
        <div className="perseus-widget-editor">
            <div className="perseus-widget-editor-title">
                <div className="perseus-widget-editor-title-id">
                    <IconButton
                        icon={toggleIcon}
                        kind="tertiary"
                        size="small"
                        onClick={togglePanel}
                        actionType="neutral"
                        style={{marginRight: 0, flexGrow: 0}}
                    />
                    <span>Issues</span>
                </div>
                <PhosphorIcon
                    icon={icon}
                    size="medium"
                    color={iconColor}
                    testId={`issues-icon-${icon}`}
                    style={{marginRight: "0.25em"}}
                />
                {issuesCount}
            </div>
            {showPanel && (
                <div className="perseus-widget-editor-panel">
                    <div className="perseus-widget-editor-content">
                        {issues.map((issue) => (
                            <IssueDetails key={issue.id} issue={issue} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssuesPanel;
