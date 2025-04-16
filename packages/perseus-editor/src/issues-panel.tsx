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

type Issue = {
    id: string;
    help: string;
    helpUrl: string;
    impact: string;
    message: string;
};

type IssuesPanelProps = {
    warnings?: Issue[];
};

const IssuesPanel = ({warnings = []}: IssuesPanelProps) => {
    const [showPanel, setShowPanel] = useState(false);
    const toggleIcon = showPanel ? caretDown : caretRight;
    const togglePanel = () => setShowPanel(!showPanel);

    const icon = warnings.length > 0 ? iconWarning : iconPass;

    const iconColor = warnings.length > 0 ? wbColor.gold : wbColor.green;

    const issuesCount = `${warnings.length} issue${
        warnings.length === 1 ? "" : "s"
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
                    <span>Issues Panel</span>
                </div>
                {issuesCount}
                <PhosphorIcon
                    icon={icon}
                    size="medium"
                    color={iconColor}
                    data-icon-type={icon}
                />
            </div>
            {showPanel && (
                <div className="perseus-widget-editor-panel">
                    <div className="perseus-widget-editor-content">
                        {warnings.map((issue, index) => (
                            <IssueDetails key={issue.id} issue={issue} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssuesPanel;
