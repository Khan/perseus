import {components, iconChevronDown} from "@khanacademy/perseus";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconWarning from "@phosphor-icons/core/fill/warning-fill.svg";
import * as React from "react";
import {useState} from "react";

import IssueDetails from "./issue-details";
import {iconChevronRight} from "./styles/icon-paths";

const {InlineIcon} = components;

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

    const editorClasses = `perseus-widget-editor${showPanel ? " perseus-widget-editor-open" : ""}`;

    const togglePanel = () => {
        if (hasWarnings) {
            setShowPanel(!showPanel);
        }
    };

    return (
        <div className={editorClasses}>
            <div className="perseus-widget-editor-title">
                <div className="perseus-widget-editor-title-id">
                    <button
                        onClick={togglePanel}
                        disabled={!hasWarnings}
                        style={{
                            marginInlineEnd: 0,
                            flexGrow: 0,
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: hasWarnings ? "pointer" : "not-allowed",
                        }}
                    >
                        {showPanel ? (
                            <InlineIcon {...iconChevronDown} />
                        ) : (
                            <InlineIcon {...iconChevronRight} />
                        )}
                    </button>
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
