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

/**
 * A problem to show the author, from the editor-side linter or the preview's
 * axe-core scanner.
 */
export interface Issue {
    /**
     * The problem identifier (name). This `id` is _not_ guaranteed to be
     * unique and is often the name of the rule that generated this issue (for
     * example, this may be the axe-core rule id or a linter rule name). Shown
     * to the author and used when a fix is offered, so several issues can
     * share one — nine images missing alt text are nine `image-alt`s.
     */
    id: string;

    /**
     * The unique issue identifier. Distinguishes this issue from every other
     * issue in the same list. Optional because some issue sources may not have
     * one naturally; prefer `getIssueKey` over reading it directly.
     */
    instanceId?: string;

    /**
     * Where this issue came from. Usually unset — used only when the origin
     * (source) tells you the issue can do something the others can't. See
     * {@link A11yIssue}.
     */
    source?: "a11y";

    description: string;
    helpUrl: string;
    help: string;
    impact: IssueImpact;
    message: string;
}

/**
 * An issue the preview's axe-core scanner found, and can therefore highlight —
 * it always has the `instanceId` the element map is keyed by.
 */
export type A11yIssue = Issue & {source: "a11y"; instanceId: string};

/**
 * A unique identifier for an issue, suitable for use as a React key or a
 * Record key. Falls back to `id`, which names the rule rather than the
 * occurrence, for issues that arrive without an `instanceId`.
 */
export function getIssueKey(issue: Issue): string {
    return issue.instanceId ?? issue.id;
}

interface IssuesPanelProps {
    issues?: Issue[];
}

const IssuesPanel = (props: IssuesPanelProps) => {
    const {issues = []} = props;
    const context = useContext(A11yContext);
    const [showPanel, setShowPanel] = useState(false);

    const axeCoreIssues = context?.a11yScanningEnabled
        ? context.axeCoreIssues
        : [];
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
                    style={{marginInlineEnd: "0.25em"}}
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
                            checked={context?.a11yScanningEnabled ?? false}
                            onChange={(enabled) => {
                                context?.setA11yScanningEnabled(enabled);
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
