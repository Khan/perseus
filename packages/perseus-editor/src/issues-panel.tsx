import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconWarning from "@phosphor-icons/core/fill/warning-fill.svg";
import * as React from "react";
import {useState} from "react";

import ToggleableCaret from "./components/toggleable-caret";
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
    const [showPanel, setShowPanel] = useState(false);

    const hasWarnings = issues.length > 0;
    const issuesCount = `${issues.length} issue${
        issues.length === 1 ? "" : "s"
    }`;

    const icon = hasWarnings ? iconWarning : iconPass;
    const iconColor = hasWarnings ? wbColor.gold : wbColor.green;

    const togglePanel = () => {
        if (hasWarnings) {
            setShowPanel(!showPanel);
        }
    };

    return (
        <div className="perseus-widget-editor">
            <div className="perseus-widget-editor-title">
                <div className="perseus-widget-editor-title-id">
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.25em",
                        }}
                        onClick={togglePanel}
                    >
                        <ToggleableCaret isExpanded={showPanel} />
                        <span>Issues</span>
                    </View>
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
