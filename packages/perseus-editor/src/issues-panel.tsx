import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {color as wbColor} from "@khanacademy/wonder-blocks-tokens";
import iconPass from "@phosphor-icons/core/fill/check-circle-fill.svg";
import iconCaution from "@phosphor-icons/core/fill/warning-fill.svg";
import iconViolations from "@phosphor-icons/core/fill/warning-octagon-fill.svg";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretRight from "@phosphor-icons/core/regular/caret-right.svg";
import * as React from "react";
import {useState} from "react";

import IssueDetails from "./issue-details";

type Issue = {
    id: string;
    help: string;
    helpUrl: string;
    impact: string;
    message: string;
};

type IssuesPanelProps = {
    violations: Issue[];
    incompletes: Issue[];
};

const IssuesPanel = ({violations = [], incompletes = []}: IssuesPanelProps) => {
    const [showPanel, setShowPanel] = useState(false);
    const toggleIcon = showPanel ? caretDown : caretRight;
    const togglePanel = () => setShowPanel(!showPanel);

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
                        {violations.map((issue, index) => (
                            <IssueDetails
                                key={issue.id}
                                issue={issue}
                                issueType="violation"
                            />
                        ))}
                        {incompletes.map((issue, index) => (
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

export default IssuesPanel;
