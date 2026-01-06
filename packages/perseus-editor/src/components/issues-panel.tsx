import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconWarning from "@phosphor-icons/core/fill/warning-fill.svg";
import iconAlert from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import * as React from "react";
import {useState} from "react";

import IssueDetails from "./issue-details";
import LabeledSwitch from "./labeled-switch";
import ToggleableCaret from "./toggleable-caret";

import type {APIOptions} from "@khanacademy/perseus";

export type IssueImpact = "low" | "medium" | "high";
export type Issue = {
    id: string;
    description: string;
    elements?: Element[];
    helpUrl: string;
    help: string;
    impact: IssueImpact;
    message: string;
};

type IssuesPanelProps = {
    // TODO(LEMS-3520): Remove the `apiOptions` prop once the
    // "image-widget-upgrade" feature flag is has been fully rolled out.
    apiOptions?: APIOptions;
    issues?: Issue[];
    a11yCheck?: {
        callback: () => void;
        isChecked: boolean;
    };
};

const IssuesPanel = (props: IssuesPanelProps) => {
    const {apiOptions, issues = []} = props;
    const a11yCheck = props.a11yCheck || {
        callback: () => {},
        isChecked: false,
    };
    const [showPanel, setShowPanel] = useState(false);

    const hasWarnings = issues.length > 0;
    const hasErrors = issues.some((issue) => issue.impact === "high");
    const issuesCount = `${issues.length} issue${
        issues.length === 1 ? "" : "s"
    }`;

    const icon = hasErrors ? iconAlert : hasWarnings ? iconWarning : iconPass;
    const iconColor = hasErrors
        ? semanticColor.feedback.critical.strong.icon
        : hasWarnings
          ? semanticColor.feedback.warning.strong.icon
          : semanticColor.feedback.success.strong.icon;

    const impactOrder = {high: 3, medium: 2, low: 1};
    const sortedIssues = issues.sort((a, b) => {
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
                        onClick={() => setShowPanel(!showPanel)}
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
                        {issues.length === 0 && <div>No issues found</div>}
                        <LabeledSwitch
                            label="Include axe-core scan"
                            checked={a11yCheck.isChecked}
                            onChange={() => {
                                a11yCheck.callback();
                            }}
                            style={{marginBlockStart: "1rem"}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssuesPanel;
