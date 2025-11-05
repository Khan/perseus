import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconWarning from "@phosphor-icons/core/fill/warning-fill.svg";
import iconAlert from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import * as React from "react";
import {useState} from "react";

import IssueDetails from "./issue-details";
import ToggleableCaret from "./toggleable-caret";

import type {APIOptions} from "@khanacademy/perseus";

export type IssueImpact = "low" | "medium" | "high";
export type IssueType = "Warning" | "Alert";
export type Issue = {
    id: string;
    description: string;
    helpUrl: string;
    help: string;
    impact: IssueImpact;
    message: string;
    type: IssueType;
};

type IssuesPanelProps = {
    // TODO(LEMS-3520): Remove the `apiOptions` prop once the
    // "image-widget-upgrade" feature flag is has been fully rolled out.
    apiOptions?: APIOptions;
    issues?: Issue[];
};

const IssuesPanel = ({apiOptions, issues = []}: IssuesPanelProps) => {
    const [showPanel, setShowPanel] = useState(false);

    const hasWarnings = issues.length > 0;
    const hasAlerts = issues.some((issue) => issue.type === "Alert");
    const issuesCount = `${issues.length} issue${
        issues.length === 1 ? "" : "s"
    }`;

    const icon = hasAlerts ? iconAlert : hasWarnings ? iconWarning : iconPass;
    const iconColor = hasAlerts
        ? semanticColor.status.critical.foreground
        : hasWarnings
          ? semanticColor.status.warning.foreground
          : semanticColor.status.success.foreground;

    const togglePanel = () => {
        if (hasWarnings) {
            setShowPanel(!showPanel);
        }
    };

    const impactOrder = {high: 3, medium: 2, low: 1};
    const sortedIssues = issues.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === "Alert" ? -1 : 1;
        }
        if (impactOrder[b.impact] !== impactOrder[a.impact]) {
            return impactOrder[b.impact] - impactOrder[a.impact];
        }
        return a.id.localeCompare(b.id);
    });

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
                        {sortedIssues.map((issue) => (
                            <IssueDetails
                                apiOptions={apiOptions}
                                key={issue.id}
                                issue={issue}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssuesPanel;
