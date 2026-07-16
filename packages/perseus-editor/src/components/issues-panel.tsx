import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconWarning from "@phosphor-icons/core/fill/warning-fill.svg";
import iconAlert from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import * as React from "react";
import {useContext, useState} from "react";

import {A11yContext} from "./a11y-context";
import IssueDetails from "./issue-details";
import LabeledSwitch from "./labeled-switch";
import ToggleableCaret from "./toggleable-caret";

export type IssueImpact = "low" | "medium" | "high";

/** Fields shared by all issue types. */
type BaseIssue = {
    id: string;
    description: string;
    helpUrl: string;
    help: string;
    impact: IssueImpact;
    message: string;
};

/**
 * An issue surfaced by the axe-core accessibility scanner.
 */
export type A11yIssue = BaseIssue & {
    /**
     * The unique preview-side ID for this issue (for "Show Me" highlighting).
     */
    previewId: string;
};

/**
 * An issue surfaced by the editor-side linter (tex, widget, and content-lint
 * rules).
 */
export type LinterIssue = BaseIssue;

export type Issue = A11yIssue | LinterIssue;

/**
 * A unique identifier for an issue, suitable for use as a React key or a
 * Record key. `A11yIssue.id` is the axe rule id (shared by every violation
 * of that rule) so it's not unique on its own — `previewId` is.
 */
export function getIssueKey(issue: Issue): string {
    return "previewId" in issue ? issue.previewId : issue.id;
}

type IssuesPanelProps = {
    issues?: Issue[];
};

const IssuesPanel = (props: IssuesPanelProps) => {
    const {issues = []} = props;
    const context = useContext(A11yContext);
    const [showPanel, setShowPanel] = useState(false);

    const axeCoreIssues = context?.a11yEnabled ? context.axeCoreIssues : [];
    const allIssues: Issue[] = [...issues, ...axeCoreIssues];

    const hasWarnings = allIssues.length > 0;
    const hasErrors = allIssues.some((issue) => issue.impact === "high");
    const issuesCount = `${allIssues.length} issue${
        allIssues.length === 1 ? "" : "s"
    }`;

    const icon = hasErrors ? iconAlert : hasWarnings ? iconWarning : iconPass;
    const iconColor = hasErrors
        ? semanticColor.feedback.critical.strong.icon
        : hasWarnings
          ? semanticColor.feedback.warning.strong.icon
          : semanticColor.feedback.success.strong.icon;

    const impactOrder = {high: 3, medium: 2, low: 1};
    const sortedIssues = [...allIssues].sort((a, b) => {
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
                                key={getIssueKey(issue)}
                                issue={issue}
                            />
                        ))}
                        {allIssues.length === 0 && <div>No issues found</div>}
                        <LabeledSwitch
                            label="Include axe-core scan"
                            checked={context?.a11yEnabled ?? false}
                            onChange={(enabled) => {
                                context?.setA11yEnabled(enabled);
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
